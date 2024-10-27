import mongoose from 'mongoose';


const chatMessageSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Appointment'
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  senderType: {
    type: String,
    enum: ['user', 'doctor'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  read: {
    type: Boolean,
    default: false
  },
  
});
chatMessageSchema.index({ appointmentId: 1, timestamp: 1 });
chatMessageSchema.index({ senderId: 1, read: 1 });

const chatModel = mongoose.models.chat || mongoose.model('chats', chatMessageSchema)

export default chatModel


// import mongoose from 'mongoose';

// const chatMessageSchema = new mongoose.Schema({
//   appointmentId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: 'appointment'  // Ensure the model name here matches exactly
//   },
//   senderId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true
//   },
//   senderType: {
//     type: String,
//     enum: ['user', 'doctor'],
//     required: true
//   },
//   content: {
//     type: String,
//     required: true
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now
//   },
//   read: {
//     type: Boolean,
//     default: false
//   },
// });

// chatMessageSchema.index({ appointmentId: 1, timestamp: 1 });
// chatMessageSchema.index({ senderId: 1, read: 1 });

// const chatModel = mongoose.models.chats || mongoose.model('chats', chatMessageSchema);

// export default chatModel;
