import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rooms: [
      {
        roomId: {
          type: String,
          required: true,
        },
      },
    ],

    dates: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    paymentIntentId: {
      type: String,
      required: true,
      unique: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);
