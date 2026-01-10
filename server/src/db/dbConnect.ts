import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to database", response.connection.host);
  } catch (error) {
    console.error("Error connecting to database", error);
    process.exit(1);
  }
};
