import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import { createError } from "./utils/error.js";
import cookieParser from "cookie-parser";

// Load environment variables
dotenv.config();

const app = express();

// ✅ Corrected Mongoose Connection Setup
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1); // Exit process if DB connection fails
  }
};

// Mongoose Event Listeners
mongoose.connection.on("disconnected", () => console.log("❌ MongoDB Disconnected"));
mongoose.connection.on("connected", () => console.log("✅ MongoDB Connected"));

// ✅ Call `connect()` BEFORE starting the server
connect();

// Middleware
app.use(cookieParser());
app.use(express.json()); // Body parser

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  
  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  });
});

// ✅ Start the server AFTER successful DB connection
const port = process.env.PORT || 8800;
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
