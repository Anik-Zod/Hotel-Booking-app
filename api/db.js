import mongoose from "mongoose";


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1); // Exit process if DB connection fails
  }
};

export default connectDB;