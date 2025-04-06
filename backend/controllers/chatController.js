  import chatModel from "../models/chatModel.js";

// chatController.js
// const getMessages = async (req, res) => {
//     try {
//       const { appointmentId:userToChatId } = req.params;

//       const myId = req.userId_id
      
//       // Fetch messages from your database
//       const messages = await chatModel.find({ 
//         appointmentId,
//         $or: [
//           { senderId:myId, receiverId:userToChatId},
//           { senderId:userToChatId, receiverId:myId}

//         ]
//       })
//         .sort({ timestamp: 1 });
      
//       res.json({
//         success: true,
//         messages
//       });
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//       res.status(500).json({
//         success: false,
//         message: 'Failed to fetch messages'
//       });
//     }
//   };


const getMessages = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    
    // Get the user ID from the middleware
    const myId = req.body.userId || req.body.docId;
    
    if (!appointmentId || !myId) {
      return res.status(400).json({
        success: false,
        message: 'Appointment ID is required'
      });
    }
    
    // Fetch messages for this appointment
    const messages = await chatModel.find({ appointmentId })
      .sort({ timestamp: 1 });
    
    res.json({
      success: true,
      messages
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch messages',
      error: error.message
    });
  }
};

const markMessagesAsRead = async (req, res) => {
  try {
      const { appointmentId } = req.params;
      const userId = req.body.userId || req.body.docId;
      const userType = req.body.userId ? 'user' : 'artisan';

      await chatModel.updateMany({
          appointmentId,
          senderId: {
              $ne: userId
          },
          senderType: userType === 'user' ? 'artisan' : 'user'
      },
      { read: true });

      res.json({ success: true }); // Fixed typo: jsom -> json
  } catch (error) {
      res.status(500).json({ success: false, message: error.message })
  }
}


const sendMessage = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { content, receiverId } = req.body;
    
    if (!appointmentId || !content || !receiverId) {
      return res.status(400).json({
        success: false,
        message: 'Appointment ID, content, and receiverId are required'
      });
    }
    
    const senderId = req.body.userId || req.body.docId;
    const senderType = req.body.userId ? 'user' : 'artisan';
    
    const newMessage = new chatModel({
      appointmentId,
      senderId,
      receiverId,
      senderType,
      content,
      timestamp: new Date(),
      read: false
    });
    
    await newMessage.save();
    
    res.json({
      success: true,
      message: newMessage
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message',
      error: error.message
    });
  }
};


export {getMessages,markMessagesAsRead, sendMessage}