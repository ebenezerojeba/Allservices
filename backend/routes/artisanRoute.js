import express from "express";

import {
  appointmentCancel,
  appointmentComplete,
  appointmentsArtisan,
  artisanDashboard,
  artisanList,
  artisanProfile,
  loginArtisan,
  registerArtisan,
  updateProfile,
} from "../controllers/artisanController.js";
import authArtisan from "../middlewares/authArtisan.js";
const artisanRouter = express.Router();

artisanRouter.get("/list", artisanList);
artisanRouter.post("/login", loginArtisan);
artisanRouter.post("/register",authArtisan, registerArtisan);
artisanRouter.get("/appointments",  authArtisan, appointmentsArtisan);
artisanRouter.post("/complete-appointment", authArtisan,  appointmentComplete);
artisanRouter.post("/cancel-appointment", authArtisan, appointmentCancel);
artisanRouter.get("/dashboard", authArtisan, artisanDashboard);
artisanRouter.get("/profile", authArtisan, artisanProfile);
artisanRouter.post("/update-profile", authArtisan, updateProfile);

export default artisanRouter;
