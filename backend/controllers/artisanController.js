
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import artisanModel from "../models/artisanModel.js";

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await artisanModel.findById(docId);
    await artisanModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availability changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const artisanList = async (req, res) => {
  try {
    const artisans = await artisanModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, artisans });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

const registerArtisan = async (req, res) => {
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
    const existingDoctor = await artisanModel.findOne({ email });
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
    const artisanData = {
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
    const newArtisan = new artisanModel(artisanData);
    await newArtisan.save();

    // === 10. Send Success Response ===
    return res.status(201).json({
      success: true,
      message: "Artisan added successfully",
    });
  } catch (error) {
    console.error("Error adding Artisan:", error);

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
      message: "An error occurred while adding the artisan.",
    });
  }
};



// API for Artisan Login
const loginArtisan = async (req, res) => {
  try {
    const { email, password } = req.body;
    const artisan = await artisanModel.findOne({ email });

    if (!artisan) {
      return res.json({ success: false, message: "Invalid Credential" });
    }

    const isMatch = await bcrypt.compare(password, artisan.password);

    if (isMatch) {
      const token = jwt.sign({ id: artisan._id }, process.env.JWT_SECRET);

      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Inavlid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for artisan appointment for artisan panel

const appointmentsArtisan = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointment completed for artisan panel

const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });

      return res.json({ success: true, message: "Appointment Cancelled" });
    } else {
      return res.json({ success: false, message: "Cancellation Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to mark appointment completed for doctor panel
const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });

      return res.json({ success: true, message: "Appointment Completed" });
    } else {
      return res.json({ success: false, message: "Marked Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get dashboard data for doctor panel

const artisanDashboard = async (req, res) => {
  try {
    const { docId } = req.body;

    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;

    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let patients = [];

    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };
    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get doctor profile for Doctor Panel

const artisanProfile = async (req, res) => {
  try {
    const { docId } = req.body;
    const profileData = await artisanModel.findById(docId).select("-password");

    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update doctor panel
const updateProfile = async (req, res) => {
  try {
    const { docId, fee, address, available } = req.body;

    await artisanModel.findByIdAndUpdate(docId, { fee, address, available });

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  changeAvailability,
  registerArtisan,
  updateProfile,
  artisanProfile,
  artisanList,
  loginArtisan,
  appointmentsArtisan,
  appointmentCancel,
  appointmentComplete,
  artisanDashboard,
};
