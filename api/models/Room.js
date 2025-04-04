import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RoomSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    des: {
      type: String,
      required: true,
    },
    roomNumbers: [{ number: Number, unavailableDate: { type: [Date] } }],
  },
  { timestamps: true }
);
export default mongoose.model("Room", RoomSchema);
