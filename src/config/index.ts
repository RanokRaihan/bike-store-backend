import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();
export const { MONGODB_URI, PORT, DB_NAME } = process.env;
