import express from "express";
import { userLogin, userSignUp } from "../controllers/auth.controller.js";
import { verifyEmail } from "../controllers/verifyEmail.js"; 
import { resendVerificationEmail } from "../controllers/resendVerification.js";

const router = express.Router();

router.post("/signup", userSignUp);
router.post("/login", userLogin)
router.get("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerificationEmail);
// later:
// router.post("/login", loginUser);

export default router;
