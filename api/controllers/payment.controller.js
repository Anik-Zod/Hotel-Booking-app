import stripe from "../utils/stripe.js";
import Booking from "../models/booking.model.js";

//create payment intent
export const createPaymentIntent = async (req, res) => {
  try {
    const {
      amount=10,
      currency = "usd",
      customer_email = "",
      userId= "",
      selectedRooms ="",
      dates="",
    } = req.body;

    

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      receipt_email: customer_email,
      payment_method_types: ["card"],

      metadata: {
        userId,
        roomIds: selectedRooms.join(","),
        checkIn: dates[0].startDate,
        checkOut: dates[0].endDate,
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Create PaymentIntent error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Create booking after successful payment
export const createBooking = async (req, res) => {
  try {
    const { userId, roomIds, dates, totalPrice, paymentIntentId } = req.body;

    // Validate required fields
    if (!userId || !roomIds || !dates || !totalPrice || !paymentIntentId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate data types
    if (!Array.isArray(roomIds) || roomIds.length === 0) {
      return res.status(400).json({ error: "roomIds must be a non-empty array" });
    }

    if (typeof totalPrice !== 'number' || totalPrice <= 0) {
      return res.status(400).json({ error: "totalPrice must be a positive number" });
    }

    if (!dates.startDate || !dates.endDate) {
      return res.status(400).json({ error: "dates must contain startDate and endDate" });
    }

    // Validate date format
    const startDate = new Date(dates.startDate);
    const endDate = new Date(dates.endDate);
    
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    if (startDate > endDate) {
      return res.status(400).json({ error: "End date must be after start date" });
    }

    // Sanitize roomIds to prevent NoSQL injection
    const sanitizedRoomIds = roomIds.filter(id => 
      typeof id === 'string' && id.match(/^[0-9a-fA-F]{24}$/)
    );

    if (sanitizedRoomIds.length !== roomIds.length) {
      return res.status(400).json({ error: "Invalid room ID format" });
    }

    // Create booking
    const booking = new Booking({
      user: userId,
      rooms: sanitizedRoomIds.map(id => ({ roomId: id })),
      dates: {
        startDate,
        endDate
      },
      totalPrice,
      paymentIntentId,
      status: "confirmed"
    });

    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({ error: error.message });
  }
};

// check Payment status
export const getPaymentStatus = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    res.status(200).json({
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      created: paymentIntent.created,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//check Payment success or not
export const checkPaymentSuccess = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      res
        .status(400)
        .json({ success: false, message: "Payment not succeeded" });
      return;
    }

    res.status(200).json({ success: true, message: "Payment succeeded" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
