import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fee,
      address,
    } = req.body;
    const imageFile = req.file;

    // === 1. Validate Required Fields ===
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fee ||
      !address
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields",
      });
    }

    // === 2. Validate Email Format ===
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // === 3. Check if Email Already Exists ===
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    // === 4. Validate Password Strength ===
    // Example: At least 8 characters, including uppercase, lowercase, number, and special character
    // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    // if (!passwordRegex.test(password)) {
    //   return res.status(400).json({
    //     success: false,
    //   message:
    //       "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
    //   });
    // }

    if (password.lenght < 8) {
      return res.json({
        success: false,
        message: "Passowrd must be atleast 8 chararcters",
      });
    }

    // === 5. Handle Image Upload (Optional) ===
    let imageUrl = "";
    if (imageFile) {
      // Validate file type (e.g., jpg, png)
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(imageFile.mimetype)) {
        return res.status(400).json({
          success: false,
          message: "Invalid image type. Only JPEG and PNG are allowed.",
        });
      }

      // Upload image to Cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
        folder: "doctors", // Optional: specify folder in Cloudinary
      });
      imageUrl = imageUpload.secure_url;
    } else {
      // Optional: Set a default image or handle absence accordingly
      imageUrl =
        "https://res.cloudinary.com/djjf5jzha/image/upload/v1234567890/default-doctor.png";
    }

    // === 6. Parse Address Safely ===
    let parsedAddress;
    try {
      parsedAddress =
        typeof address === "string" ? JSON.parse(address) : address;
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid address format",
      });
    }

    // === 7. Hash Password ===
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // === 8. Prepare Doctor Data ===
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fee,
      address: parsedAddress,
      date: new Date(),
    };

    // === 9. Save to Database ===
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    // === 10. Send Success Response ===
    return res.status(201).json({
      success: true,
      message: "Doctor added successfully",
    });
  } catch (error) {
    console.error("Error adding doctor:", error);

    // === 11. Handle Cloudinary Errors Specifically ===
    if (error.name === "CloudinaryError") {
      return res.status(500).json({
        success: false,
        message: "Image upload failed. Please try again.",
      });
    }

    // === 12. General Error Response ===
    return res.status(500).json({
      success: false,
      message: "An error occurred while adding the doctor.",
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all doctorsList for admin
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {}
};

// API to get all appoointments list
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for appointment cancellation

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // Releasing doctor's slot
    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API for displaying the dashboard data for admin panel

const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0, 4),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
};
