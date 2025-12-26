import User from "../schema/UserSchema.js";

export const verifyEmail = async (req, res) => {
     console.log("VERIFY EMAIL HIT", req.query);
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({
      message: "Verification token is required"
    });
  }

  try {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired verification token"
      });
    }

    // Mark user as verified
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();

    return res.status(200).json({
      message: "Email verified successfully. You can now log in."
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};
