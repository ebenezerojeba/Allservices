import { Server } from 'socket.io';
import pkg from 'jsonwebtoken';
import ChatMessage from '../models/chatModel.js';
import appointmentModel from '../models/appointmentModel.js';



const {verifyToken} = pkg;
class SocketManager {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        methods: ['GET', 'POST']
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

      const decoded = verifyToken(token);
      socket.userId = decoded.userId;
      socket.userType = decoded.type;
      next();
    } catch (error) {
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
        return appointment.doctorId.toString() === userId.toString();
      }
    } catch (error) {
      return false;
    }
  }

  setupSocketHandlers() {
    this.io.use(this.authenticateSocket);

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
          const recipientId = userType === 'user' ? appointment.doctorId : appointment.userId;
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