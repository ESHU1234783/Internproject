import express from "express";
import {
    registerUser,
    loginUser,
    forgotPassword
} from "../controllers/authController.js";

import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);

// Protected Route
router.get("/profile", auth, (req, res) => {
    res.json({
        success: true,
        message: "Profile Access Granted",
        user: req.user,
    });
});

export default router;