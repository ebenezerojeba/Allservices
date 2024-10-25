import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import Flutterwave from "flutterwave-node-v3";
import dotenv from 'dotenv'
import { encrypt } from "flutterwave-node-v3/lib/security.js";

dotenv.config()
// API to register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }
    // Validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "ENTER A VALID EMAIL" });
    }
    // Validating strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }
    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// API for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "user does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "invalid password" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to crete user profile data

const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update the  user profile
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    // Check for missing required fields
    if (!name || !phone || !gender || !dob) {
      return res.json({ success: false, message: "Data Missing" });
    }

    // Update basic profile info
    const updateData = { name, phone, dob, gender };

    if (address) {
      try {
        updateData.address = JSON.parse(address); // If address is a stringified JSON
      } catch (err) {
        updateData.address = address; // If it's already an object or a simple string
      }
    }

    await userModel.findByIdAndUpdate(userId, updateData);

    // Handle image upload if present
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image", // Ensure correct resource type
      });
      const imageURL = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    // Send success response after profile is updated
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to book appointment

const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    // Validate that all fields are provided
    if (!userId || !docId || !slotDate || !slotTime) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "Artisan not available" });
    }

    let slots_booked = docData.slots_booked;

    // Checking for availabilty
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Remove unnecessary data from docData (e.g., slots_booked)
    const { slots_booked: _, ...docInfo } = docData.toObject();

    // Create the appointment data
    const appointmentData = {
      userId,
      docId,
      userData,
      docData: docInfo,
      amount: docData.fee,
      slotDate,
      slotTime,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // Save new slotsdata in doctos data

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user appointmetns for frontend my-appointments page
const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await appointmentModel.find({ userId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointment

const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    // Verify appointment user
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "You are not authorized" });
    }
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

// const paymentFlutterWave = async (req, res) => {
//   const flw = new Flutterwave(
//     process.env.FLW_PUBLIC_KEY,
//     process.env.FLW_SECRET_KEY
//   );
//   try {
//     const { appointmentId, } = req.body;
//     const appointmentData = await appointmentModel.findById(appointmentId);

//     if (!appointmentData || appointmentData.cancelled) {
//       return res.json({
//         success: false,
//         message: "Appointment Cancelled or not found",
//       });
//     }

//     let amount = Math.round(appointmentData.amount); // Ensure it's an integer

// console.log("Appointment Amount:", amount)
//     // Options for flutterwave payment
//     const payload = {
//       tx_ref: `appointment-${appointmentId}-${Date.now()}`,
//       amount: amount,
//       currency: "NGN",
//       enckey:  process.env.FLW_ENCRYPTION_KEY,
//       customer: {
//         email: appointmentData.userEmail,
//         phonenumber: appointmentData.userPhone,
//         name: appointmentData.userName,
//       },
//       customizations: {
//         title: "Appointment Booking Payment",
//         description: `Payment for appointment on ${appointmentData.date}`,
//         logo: "https://yourwebsite.com/logo.png",
//       },
//     };
//     console.log("Payload to Flutterwave:", payload);


//     const response = await flw.Charge.card(payload);

//     if (response.status === "success") {
//       // Update appointment status to 'pending payment' if needed
//       await appointmentModel.findByIdAndUpdate(appointmentId, {
//         paymentStatus: "pending",
//       });

//       return res.json({
//         success: true,
//         message: "Payment initiated successfully",
//         paymentLink: response.data.link,
//       });
//     } else {
//       return res.json({
//         success: false,
//         message: "Failed to initiate payment",
//         error: response.message,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: error.message });
//   }
// };
const paymentFlutterWave = async (req, res) => {
  const flw = new Flutterwave(
    process.env.FLW_PUBLIC_KEY,
    process.env.FLW_SECRET_KEY
  );
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment Cancelled or not found",
      });
    }

    let amount = Math.round(appointmentData.amount); // Ensure it's an integer

    console.log("Appointment Data:", {
      id: appointmentData._id,
      amount: amount,
      userEmail: appointmentData.userEmail,
      userPhone: appointmentData.userPhone,
      userName: appointmentData.userName,
      date: appointmentData.date
    });

    // Options for flutterwave payment
    const payload = {
      amount: 1000,
      name: 'SDK test Plan', //This is the name of the payment, it will appear on the subscription reminder emails
      interval: 'monthly', //This will determine the frequency of the charges for this plan. Could be monthly, weekly, etc.
    };

    const response = await flw.PaymentPlan.create(payload);

    if (response.status === "success") {
      // Update appointment status to 'pending payment' if needed
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        paymentStatus: "pending",
      });

      return res.json({
        success: true,
        message: "Payment initiated successfully",
        paymentLink: response.
        data.link,
      });
    } else {
      return res.json({
        success: false,
        message: "Failed to initiate payment",
        error: response.message,
      });
    }
  } catch (error) {
    console.error("Error in paymentFlutterWave:", error);
    res.json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentFlutterWave
};
