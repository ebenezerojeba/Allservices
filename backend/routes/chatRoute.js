import express from 'express';
import {getMessages, markMessagesAsRead} from '../controllers/chatController.js'

import authUser from '../middlewares/authUser.js';
import authDoctor from '../middlewares/authDoctor.js';

const chatRouter = express.Router();

chatRouter.get('/messages/:appointmentId', authUser, getMessages);
chatRouter.get('/messages/doctor/:appointmentId', authDoctor, getMessages);
chatRouter.post('/messages/mark-read/:appointmentId', authUser, markMessagesAsRead);
chatRouter.post('/messages/doctor/mark-read/:appointmentId', authDoctor, markMessagesAsRead);

export default chatRouter;