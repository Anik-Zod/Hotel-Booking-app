import Booking from "../models/booking.model.js";
import { createError } from "../utils/error.js";

// Get all bookings for a user
export const getUserBookings = async (req, res, next) => {
  try {
    const { userId } = req.params;
    
    const bookings = await Booking.find({ user: userId })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    res.status(200).json(bookings);
  } catch (error) {
    next(createError(500, "Failed to fetch bookings"));
  }
};

// Get all bookings (admin)
export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    res.status(200).json(bookings);
  } catch (error) {
    next(createError(500, "Failed to fetch bookings"));
  }
};

// Get booking by ID
export const getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const booking = await Booking.findById(id)
      .populate('user', 'name email');
    
    if (!booking) {
      return next(createError(404, "Booking not found"));
    }
    
    res.status(200).json(booking);
  } catch (error) {
    next(createError(500, "Failed to fetch booking"));
  }
};

// Update booking status
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ["pending", "confirmed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return next(createError(400, "Invalid status"));
    }
    
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('user', 'name email');
    
    if (!booking) {
      return next(createError(404, "Booking not found"));
    }
    
    res.status(200).json(booking);
  } catch (error) {
    next(createError(500, "Failed to update booking"));
  }
};

// Cancel booking
export const cancelBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status: "cancelled" },
      { new: true }
    );
    
    if (!booking) {
      return next(createError(404, "Booking not found"));
    }
    
    res.status(200).json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    next(createError(500, "Failed to cancel booking"));
  }
};