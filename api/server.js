import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import connectDB from "./db.js";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: [ "http://localhost:5173", process.env.FRONTEND_URL,"http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



// Routes

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/", (req, res) => {
  return res.json({ message: "server is running" });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const port = process.env.PORT || 8800;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

startServer();
