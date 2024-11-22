import mongoose from "mongoose";
import { DB_NAME, MONGODB_URI } from "../config";

const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
    process.exit(1);
  }
};
export default connectDB;
