import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../schema/UserSchema.js";

export const userSignUp = async (req, res) => {
  const { name, email, password, city } = req.body;

  if (!name || !email || !password || !city) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters"
    });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const verificationToken = crypto.randomBytes(32).toString("hex");

    await User.create({
      name,
      email,
      password: hashedPassword,
      city,
      isVerified: false,
      verificationToken,
      verificationTokenExpires: Date.now() + 1000 * 60 * 60
    });

    console.log("VERIFY TOKEN:", verificationToken);

    return res.status(201).json({
      message: "Signup successful. Please verify your email."
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};
