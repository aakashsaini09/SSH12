import "./src/config/env.js";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/auth.routes.js";
import { connectDB } from "./src/config/db.js";
import { verifyEmail } from "./src/controllers/verifyEmail.js";
import eventRoutes from './src/routes/event.routes.js'

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8001;
// console.log("URL: ", process.env.MONGODB_URL)
await connectDB();
app.use("/auth", authRoutes);
app.get("/verify-email", verifyEmail)
app.use('/events', eventRoutes)
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
