import { MongoClient } from "mongodb";
const URL = process.env.MONGODB_URL
// const client = new MongoClient(URL);

// let db;

// export const connectDB = async () => {
//   if (!db) {
//     await client.connect();
//     db = client.db('users');
//     console.log("MongoDB connected");
//   }
//   return db;
// };
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(URL, {
      dbName: "users"
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    process.exit(1);
  }
};
