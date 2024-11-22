import dotenv from "dotenv";
dotenv.config();
export const { MONGODB_URI, PORT, DB_NAME } = process.env;
