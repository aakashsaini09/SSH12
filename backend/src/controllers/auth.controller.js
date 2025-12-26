import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../schema/UserSchema.js";
import { sendVerificationEmail } from "../services/email.services.js";

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
        if (!existingUser.isVerified) {
            return res.status(409).json({
            message: "Email not verified",
            action: "RESEND_VERIFICATION"
            });
        }

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
    // ✅ SEND EMAIL HERE
    await sendVerificationEmail({
      to: email,
      token: verificationToken
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

export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({
            message: "Email and password are required!"
        })
    }
    try {
        const user = await User.findOne({ email});
        if(!user){
            return res.status(401).json({
            message: "Invalid Email or password"
          })
        }
        if(!user.isVerified){
            return res.status(403).json({
                message: "Email not verified",
                action: "RESEND_VERIFICATION"
            });
        }
        // 4️⃣ Issue JWT
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
