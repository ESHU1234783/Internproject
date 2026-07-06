import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "No Token Provided",
            });
        }

        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get logged-in user from database
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Save full user object in request
        req.user = user;

        next();
    } catch (error) {
        console.error(error);

        return res.status(401).json({
            success: false,
            message: "Invalid Token",
        });
    }
};

export default auth;