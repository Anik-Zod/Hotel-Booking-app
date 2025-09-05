import express from "express";
import dotenv from "dotenv";
import authsRoute from "./routes/auth.route.js";
import usersRoute from "./routes/users.route.js";
import hotelsRoute from "./routes/hotels.route.js";
import roomsRoute from "./routes/rooms.route.js";
import cookieParser from "cookie-parser";
import connectDB from "./db.js";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());

const allowedOrigins = [
  "https://hotel-booking-app-bcnf-2eaafz6zk-anikdas169-gmailcoms-projects.vercel.app",
  process.env.FRONTEND_URL,
  "http://localhost:5173",
].filter(Boolean); // remove undefined if env is missing

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (e.g., mobile apps, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/auth", authsRoute);
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
