import express from "express";
import { userSignUp } from "../controllers/auth.controller.js";
import { verifyEmail } from "../controllers/auth.verify.js";
import { resendVerificationEmail } from "../controllers/resendVerification.js";

const router = express.Router();

router.post("/signup", userSignUp);
router.get("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerificationEmail);
// later:
// router.post("/login", loginUser);

export default router;
