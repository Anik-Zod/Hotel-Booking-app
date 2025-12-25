import express from "express";
import {
  getUserBookings,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking
} from "../controllers/booking.controller.js";

const bookingRouter = express.Router();

// Get user bookings
bookingRouter.get("/user/:userId", getUserBookings);

// Get all bookings (admin)
bookingRouter.get("/", getAllBookings);

// Get booking by ID
bookingRouter.get("/:id", getBookingById);

// Update booking status
bookingRouter.put("/:id/status", updateBookingStatus);

// Cancel booking
bookingRouter.put("/:id/cancel", cancelBooking);

export default bookingRouter;