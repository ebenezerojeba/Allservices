import chatModel from "../models/chatModel.js";


// chatController.js
const getMessages = async (req, res) => {
    try {
      const { appointmentId } = req.params;
      
      // Fetch messages from your database
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
        message: 'Failed to fetch messages'
      });
    }
  };

const markMessagesAsRead = async (req, res) => {
    try {
        const {appointmentId} = req.params;
        const {userId, userType} = req;

        await chatModel.updateMany({
            appointmentId,
            senderId: {
                $ne: userId
            },
            senderType: userType  === 'user' ? 'doctor' : 'user'
        },
    {read: true});

    res.jsom({success:true});
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export {getMessages,markMessagesAsRead}