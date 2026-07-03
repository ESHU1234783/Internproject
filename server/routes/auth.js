import express from "express";


import {
    registerUser,
    loginUser,
    forgotPassword,
    verifyOTP,
    resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Forgot Password
router.post("/forgot-password", forgotPassword);

router.post("/verify-otp", verifyOTP);

router.post("/reset-password", resetPassword);

export default router;