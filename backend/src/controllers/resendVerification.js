import crypto from "crypto";
import User from '../schema/UserSchema.js'

export const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email is required"
    });
  }

  try {
    const user = await User.findOne({ email });

    // 1️⃣ User must exist
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // 2️⃣ User must NOT already be verified
    if (user.isVerified) {
      return res.status(400).json({
        message: "Email already verified"
      });
    }

    // 3️⃣ Generate NEW token (invalidate old one)
    const newToken = crypto.randomBytes(32).toString("hex");

    user.verificationToken = newToken;
    user.verificationTokenExpires = Date.now() + 1000 * 60 * 60; // 1 hour

    await user.save();

    // 4️⃣ Send email (stub for now)
    console.log("RESEND VERIFY TOKEN:", newToken);

    return res.status(200).json({
      message: "Verification email resent successfully"
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};
