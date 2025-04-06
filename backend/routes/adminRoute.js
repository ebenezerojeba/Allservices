import express from "express";

import {
  addArtisan,
  adminDashboard,
  allArtisans,
  appointmentCancel,
  appointmentsAdmin,
  loginAdmin,
} from "../controllers/adminController.js";

import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/artisanController.js";

const adminRouter = express.Router();

adminRouter.post("/add-artisan", upload.single("image"), addArtisan);

adminRouter.post("/login", loginAdmin);
adminRouter.post("/change-availability", authAdmin, changeAvailability);
adminRouter.post("/all-artisans", authAdmin, allArtisans);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel);
adminRouter.get("/dashboard", authAdmin, adminDashboard);

export default adminRouter;
