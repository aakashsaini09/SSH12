import { connectDB } from "../config/db.js";

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
