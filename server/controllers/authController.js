import User from "../models/User.js";
//import sendEmail from "../utils/sendEmail.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// ================= REGISTER =================
export const registerUser = async(req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ================= LOGIN =================
export const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and Password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid Password" });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: "Login Successfully",
            token,
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ================= FORGOT PASSWORD =================
export const forgotPassword = async(req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        user.otp = otp;
        user.otpExpiry = Date.now() + 5 * 60 * 1000;

        await user.save();

        console.log("Generated OTP:", otp);

        return res.status(200).json({
            success: true,
            message: "OTP Generated Successfully",
            otp,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// ================= VERIFY OTP =================
export const verifyOTP = async(req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json({
                success: false,
                message: "No OTP found. Please request a new OTP.",
            });
        }

        if (Date.now() > user.otpExpiry) {
            return res.status(400).json({
                success: false,
                message: "OTP has expired",
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        res.status(200).json({
            success: true,
            message: "OTP Verified Successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// ================= RESET PASSWORD =================
export const resetPassword = async(req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Email, OTP and New Password are required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json({
                success: false,
                message: "Please generate OTP first",
            });
        }

        if (Date.now() > user.otpExpiry) {
            return res.status(400).json({
                success: false,
                message: "OTP has expired",
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.otp = undefined;
        user.otpExpiry = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password Reset Successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};