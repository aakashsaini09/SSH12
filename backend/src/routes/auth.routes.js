import { connectDB } from "../config/db.js";
import jwt from "jsonwebtoken";
export const userSignUp = async (req, res) => {
  const { name, email, city } = req.body;

  // 1️⃣ Validation
  if (!name || !email || !city) {
    return res.status(400).json({
      message: "Name, email and city are required"
    });
  }
  try {
    const db = await connectDB();
    const users = db.collection("users");

    // 2️⃣ Check existing user
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    // 3️⃣ Insert user
    await users.insertOne({
      name,
      email,
      city,
      createdAt: new Date()
    });

    return res.status(201).json({
      message: "User signed up successfully"
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};


export const userSignIn = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email is required"
    });
  }

  try {
    const db = await connectDB();
    const users = db.collection("users");

    const user = await users.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in"
      });
    }

    // Issue JWT
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};