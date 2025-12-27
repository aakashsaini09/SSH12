import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_URL) {
  throw new Error("❌ MONGODB_URL is missing in .env");
}