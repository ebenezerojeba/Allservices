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
        path: '/socket.io'
      }
    });
    
    this.userSockets = new Map();
    this.artisanSockets = new Map();

    this.io.use(this.authenticateSocket.bind(this));

    this.setupSocketHandlers();
  }

  async authenticateSocket(socket, next) {
    try {
      const token = socket.handshake.query.token;
      const role = socket.handshake.query.role;
  
      if (!token || !role) {
        return next(new Error('Authentication error'));
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      if (role === 'artisan') {
        socket.docId = decoded.id;
        socket.userType = 'artisan';
      } else {
        socket.userId = decoded.id;
        socket.userType = 'user';
      }
  
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
        // Check both artisanId and docId (if artisanId doesn't exist)
        const artisanId = appointment.artisanId || appointment.docId;
        return artisanId.toString() === userId.toString();
      }
    } catch (error) {
      return false;
    }
  }

  setupSocketHandlers() {
    // Bind 'this' to authenticateSocket to preserve context
    this.io.on('connection', async (socket) => {
      console.log(`Socket connected: ${socket.id}`);
    
      const userType = socket.userType;
      const userId = userType === 'artisan' ? socket.docId : socket.userId;
      const appointmentId = socket.handshake.query.appointmentId;

          
    if (!userType || !userId || !appointmentId) {
      console.log("Missing required socket data", { userType, userId, appointmentId });
      socket.disconnect();
      return;
    }
    
      const isValid = await this.validateAppointment(appointmentId, userId, userType);
      if (!isValid) {
        console.log("Invalid appointment access", { appointmentId, userId, userType });
        socket.disconnect();
        return;
      }
    
      if (userType === 'user') {
        this.userSockets.set(userId, socket);
      } else {
        this.artisanSockets.set(userId, socket); // Consider renaming this
      }
    
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
          console.log(`Emitted message to room appointment_${appointmentId}`, message.toObject());
          // Send notification if recipient is offline
          const appointment = await appointmentModel.findById(appointmentId);
          const recipientId = userType === 'user' ? appointment.artisanId : appointment.userId;
          const recipientSocket = userType === 'user' 
            ? this.artisanSockets.get(recipientId.toString())
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
        this.io.in(data.appointmentId).emit("typing", data.userId);
      });
      socket.on("stopTyping", (data) => {
      this.io.in(data.appointmentId).emit("stopTyping", data.userId);
      });
      

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
        if (userType === 'user') {
          this.userSockets.delete(userId);
        } else {
          this.artisanSockets.delete(userId)

        }
      });
    });
  }
}

export default SocketManager;