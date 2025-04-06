import { Server } from 'socket.io';
import jwt from 'jsonwebtoken'; // Import jwt directly, not pkg
import ChatMessage from '../models/chatModel.js';
import appointmentModel from '../models/appointmentModel.js';

class SocketManager {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: [
          "http://localhost:5173",
          "http://localhost:5174",
          "http://localhost:5175",
          "https://skilllinkartisan.vercel.app",
          "https://skillink.onrender.com",
        ],
        methods: ["GET", "POST"],
        credentials: true,
        transports: ['websocket', 'polling'],
        allowEIO3: true,
        path: '/socket.io/'
      }
    });
    
    this.userSockets = new Map();
    this.doctorSockets = new Map();
    this.setupSocketHandlers();
  }

  async authenticateSocket(socket, next) {
    try {
      const token = socket.handshake.query.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }

      // Use jwt.verify directly with the JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id; // Match the property name used in your auth middleware
      socket.userType = decoded.type || 'user';
      next();
    } catch (error) {
      console.error('Socket auth error:', error);
      next(new Error('Authentication error'));
    }
  }

  async validateAppointment(appointmentId, userId, userType) {
    try {
      const appointment = await appointmentModel.findById(appointmentId);
      if (!appointment) return false;

      if (userType === 'user') {
        return appointment.userId.toString() === userId.toString();
      } else {
        return appointment.artisanId.toString() === userId.toString();
      }
    } catch (error) {
      return false;
    }
  }

  setupSocketHandlers() {
    // Bind 'this' to authenticateSocket to preserve context
    this.io.use(this.authenticateSocket.bind(this));

    this.io.on('connection', async (socket) => {
      console.log(`Socket connected: ${socket.id}`);

      const { userId, userType } = socket;
      const appointmentId = socket.handshake.query.appointmentId;

      // Validate appointment access
      const isValid = await this.validateAppointment(appointmentId, userId, userType);
      if (!isValid) {
        socket.disconnect();
        return;
      }

      // Store socket connection
      if (userType === 'user') {
        this.userSockets.set(userId, socket);
      } else {
        this.doctorSockets.set(userId, socket);
      }

      // Join appointment room
      socket.join(`appointment_${appointmentId}`);

      // Handle messages
      socket.on('sendMessage', async (data) => {
        try {
          const message = new ChatMessage({
            appointmentId: data.appointmentId,
            senderId: userId,
            receiverId: data.receiverId,
            senderType: userType,
            content: data.content
          });

          await message.save();

          // Broadcast message to room
          this.io.to(`appointment_${appointmentId}`).emit('message', {
            ...message.toObject(),
            sender: userType
          });

          // Send notification if recipient is offline
          const appointment = await appointmentModel.findById(appointmentId);
          const recipientId = userType === 'user' ? appointment.artisanId : appointment.userId;
          const recipientSocket = userType === 'user' 
            ? this.doctorSockets.get(recipientId.toString())
            : this.userSockets.get(recipientId.toString());

          if (!recipientSocket) {
            // Handle offline notification (you can implement your notification system here)
            console.log(`Recipient ${recipientId} is offline`);
          }
        } catch (error) {
          socket.emit('error', { message: 'Failed to send message' });
        }
      });

      // Handle typing indicators
      socket.on('typing', () => {
        socket.to(`appointment_${appointmentId}`).emit('userTyping', { userId });
      });

      socket.on('stopTyping', () => {
        socket.to(`appointment_${appointmentId}`).emit('userStopTyping', { userId });
      });

      // Typing
      socket.on("typing", (data) => {
        io.in(data.appointmentId).emit("typing", data.userId);
      });
      socket.on("stopTyping", (data) => {
        io.in(data.appointmentId).emit("stopTyping", data.userId);
      });
      

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
        if (userType === 'user') {
          this.userSockets.delete(userId);
        } else {
          this.doctorSockets.delete(userId);
        }
      });
    });
  }
}

export default SocketManager;