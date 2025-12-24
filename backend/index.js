import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { userSignUp } from "./src/routes/auth.routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8001;
app.post('/auth/signup', userSignUp)
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
