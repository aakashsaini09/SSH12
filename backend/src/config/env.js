import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_URL) {
  throw new Error("❌ MONGODB_URL is missing in .env");
}

// MongoDBUsername=aakashsaini948585_db_user;
// MongoDBUserPassword=aakashsaini948585_db_user;
// MongodbConnectionString=mongodb+srv://aakashsaini948585_db_user:lPGlbocYAJi0OiQ2@cluster0.g4qvxlk.mongodb.net/