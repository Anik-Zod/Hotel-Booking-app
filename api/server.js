import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import hotelsRoute from "./routes/hotels.route.js";
import roomsRoute from "./routes/rooms.route.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./utils/auth.js";
import stripeRouter from "./routes/payment.route.js"

dotenv.config();
const app = express();

// CORS Middleware (before any route)
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);


app.all("/api/auth/*splat", toNodeHandler(auth));

// Use express.json() for your other API routes
app.use(express.json());

// Your API routes
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use('/api/stripe',stripeRouter)


// Global error handler
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
