import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import resumeRoutes from "./routes/resumeRoutes.js";

// Load .env FIRST
dotenv.config();
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Debug .env
console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log("EMAIL_PASS =", process.env.EMAIL_PASS);

// Connect MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

app.get("/", (req, res) => {
    res.send("Server is Running...");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});