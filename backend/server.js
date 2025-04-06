// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from './config/mongodb.js'
// import connectCloudinary from './config/cloudinary.js'
// import adminRouter from './routes/adminRoute.js'
// import doctorRouter from './routes/doctorRoute.js'
// import userRouter from './routes/userRoute.js'
// import chatRouter from './routes/chatRoute.js'
// import http from 'http';
// import { Server } from 'socket.io'

// // import SocketManager from './socket.io/socketManager.js'

// // APP CONFIG
// const app = express()
// const port = process.env.PORT || 4000
// connectDB()
// connectCloudinary()
// const server = http.createServer(app);

// // Middlewares
// app.use(cors())
// app.use(express.json())

// // Socket.io
// const io = new Server(server,{
//     cors:{
//         origin: "http://localhost:5173",
//         methods: ["GET", "POST"]
//     }
// })

// io.on("connection", (socket) => {
//     console.log(`User Connected: ${socket.id}`, )
// })

// //API EndPoints
// app.use('/api/admin',adminRouter)
// app.use('/api/doctor',doctorRouter)
// app.use('/api/user',userRouter)
// app.use('/api/chat',chatRouter)

// app.get('/', (req,res)=>{
//     res.send('API working')
// })

// app.listen(port, ()=> console.log("Server started on", port))
// server.listen(4001, ()=> {console.log("User Connected")})



import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./controllers/config/mongodb.js";
import connectCloudinary from "./controllers/config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import userRouter from "./routes/userRoute.js";
import chatRouter from "./routes/chatRoute.js";
import http from "http";
// import cookieParser from "cookie-parser";
import artisanRouter from "./routes/artisanRoute.js";
import SocketManager from "./socket.io/socketManager.js"; // Import your SocketManager

// APP CONFIG
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

const allowedOrigins = ['http://localhost:5173','http://localhost:5174', 
  "https://skillinkadmin.vercel.app",
 "https://skillink.onrender.com/about",
  'http://localhost:5175'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Middlewares
app.use(express.json());
// app.use(cookieParser());

// API Endpoints
app.use("/api/admin", adminRouter);
app.use("/api/artisan", artisanRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket Manager with the server
const socketManager = new SocketManager(server);

// Start the server
server.listen(port, () =>
  console.log(`Server and Socket.IO started on port ${port}`)
);
