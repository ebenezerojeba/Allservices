import express from "express";
import {
  getMessages,
  markMessagesAsRead,
  sendMessage,
} from "../controllers/chatController.js";

import authUser from "../middlewares/authUser.js";
import authArtisan from "../middlewares/authArtisan.js";

const chatRouter = express.Router();

chatRouter.get("/messages/:appointmentId", authUser, getMessages);
chatRouter.post("/messages/send/:appointmentId", authUser, sendMessage); // Changed from GET to POST
chatRouter.get("/messages/doctor/:appointmentId", authArtisan, getMessages);
chatRouter.post(
  "/messages/mark-read/:appointmentId",
  authUser,
  markMessagesAsRead
);
chatRouter.post(
  "/messages/doctor/mark-read/:appointmentId",
  authArtisan,
  markMessagesAsRead
);

export default chatRouter;
