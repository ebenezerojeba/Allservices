import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";
import doctorModel from "../models/artisanModel.js";
import appointmentModel from "../models/appointmentModel.js";
import Flutterwave from "flutterwave-node-v3";
import dotenv from "dotenv";
import transporter from "./config/nodemailer.js";
import {
  EMAIL_VERIFY_TEMPLATE,
  PASSWORD_RESET_TEMPLATE,
} from "./config/emailtemplates.js";

dotenv.config();
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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      
    });

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    //   maxAge: 7 * 24 * 60 * 1000,
    // });

    // Sending Welcome Email

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to SkillLink",
      text: `Welcome to SKillLink, Youraccount has been created with email id: ${email}`,
    };

    // await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      token: token,
      message: "Account created successfully!",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Comprehensive input validation
//     if (!name || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // Validate email format
//     if (!validator.isEmail(email)) {
//       return res.status(400).json({
//         success: false,
//         message: "Please enter a valid email address",
//       });
//     }

//     // Password strength validation
//     if (password.length < 8) {
//       return res.status(400).json({
//         success: false,
//         message: "Password must be at least 8 characters long",
//       });
//     }

//     // Check if user already exists
//     const existingUser = await userModel.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({
//         success: false,
//         message: "Email is already registered",
//       });
//     }

//     // Hashing user password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const userData = {
//       name,
//       email,
//       password: hashedPassword,
//     };

//     const newUser = new userModel(userData);
//     const user = await newUser.save();

//     // Generate JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     // Set secure cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
//     });

//     // Send Welcome Email
//     try {
//       const mailOptions = {
//         from: process.env.SENDER_EMAIL,
//         to: email,
//         subject: "Welcome to SkillLink",
//         html: `
//           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//             <h1 style="color: #333;">Welcome to SkillLink!</h1>
//             <p>Hi ${name},</p>
//             <p>Your account has been successfully created with the email: ${email}</p>
//             <p>Start exploring and connecting with new skills!</p>
//             <br>
//             <p>Best regards,<br>SkillLink Team</p>
//           </div>
//         `,
//       };

//       await transporter.sendMail(mailOptions);
//     } catch (emailError) {
//       console.error("Welcome email send failed:", emailError);
//       // Note: We don't stop registration if email fails
//     }

//     return res.status(201).json({
//       success: true,
//       message: "Registration successful",
//     });
//   } catch (error) {
//     console.error("Registration error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error during registration",
//     });
//   }
// };

// API for user login
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await userModel.findOne({ email });

//     if (!user) {
//       return res.json({ success: false, message: "user does not exist" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (isMatch) {
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//         expiresIn: "7d",
//       });

//       // res.json({ success: true, token });
//       res.cookie("token", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "prodcution",
//         sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//         maxAge: 7 * 24 * 60 * 1000,
//       });

//       return res.json({ success: true });
//     } else {
//       res.json({ success: false, message: "invalid password" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// LOGIN API
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
      res.json({
        success: true,
        token: token,
        message: "Welcome Back!",
      });
    } else {
      res.json({ success: false, message: "invalid password" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to logout

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "Logged OUT" });
  } catch (error) {
    return res.json({ successs: false, message: error.message });
  }
};

// API for user's email verification

const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);

    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account Already Verified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification OTP",
      // text: `Your OTP is ${otp}. Verify your account using this otp`,
      html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace(
        "{{email}}",
        user.email
      ),
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "OTP sent successfully!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API for verifying email
const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    return res.json({ success: false, message: "Missing Details" });
  }
  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }
    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();
    return res.json({ success: true, message: "Email Verified Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API for authentication
const isAunthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//  API for password reset
const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, messae: "Email is required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP for resetting your password is ${otp}. Use this OTP to proeed with resetting your password`,
      html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace(
        "{{email}}",
        user.email
      ),
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API for reseting user password
const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.json({
      success: false,
      message: "Email, OTP, and new password are required",
    });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }
    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    await user.save();
    return res.json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
// API to get userData if it's verified or not
const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "USer not found" });
    }
    res.json({
      success: true,
      userData: {
        name: user.name,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
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
      date: appointmentData.date,
    });

    // Options for flutterwave payment
    const payload = {
      amount: 1000,
      name: "SDK test Plan", //This is the name of the payment, it will appear on the subscription reminder emails
      interval: "monthly", //This will determine the frequency of the charges for this plan. Could be monthly, weekly, etc.
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
        paymentLink: response.data.link,
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
  logoutUser,
  verifyEmail,
  sendVerifyOtp,
  isAunthenticated,
  sendResetOtp,
  resetPassword,
  getUserData,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentFlutterWave,
};
