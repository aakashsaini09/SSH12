import { MongoClient } from "mongodb";
const URL = process.env.MONGODB_URL
console.log("URL IS: ", URL)
const client = new MongoClient(URL);

let db;

export const connectDB = async () => {
  if (!db) {
    await client.connect();
    db = client.db('users');
    console.log("MongoDB connected");
  }
  return db;
};
