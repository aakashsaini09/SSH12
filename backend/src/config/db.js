import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URL);

let db;

export const connectDB = async () => {
  if (!db) {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log("MongoDB connected");
  }
  return db;
};
