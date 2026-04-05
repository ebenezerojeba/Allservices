import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./controllers/config/mongodb.js";
import connectCloudinary from "./controllers/config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import userRouter from "./routes/userRoute.js";
import chatRouter from "./routes/chatRoute.js";
import artisanRouter from "./routes/artisanRoute.js";
import http from "http";
import SocketManager from "./socket.io/socketManager.js"; // Handles socket events

// Initialize App
const app = express();
const port = process.env.PORT || 4000;

// Connect DB & Cloudinary
connectDB();
connectCloudinary();

// CORS Setup
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'https://skillinkadmin.vercel.app',
  'https://skillink.onrender.com',
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Global Middleware
app.use(express.json());

// API Routes
app.use("/api/admin", adminRouter);
app.use("/api/artisan", artisanRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);

// Default Route
app.get("/", (req, res) => {
  res.send("API working");
});

// Create HTTP Server
const server = http.createServer(app);

// Attach Socket.IO
new SocketManager(server);

// Start Server
server.listen(port, () => {
  console.log(`Server and Socket.IO started on port ${port}`);
});
