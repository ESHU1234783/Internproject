import express from "express";

import {
    createResume,
    getAllResumes,
    getResumeById,
    updateResume,
    deleteResume,
} from "../controllers/resumeController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Resume
router.post("/", protect, createResume);

// Get All Resumes
router.get("/", protect, getAllResumes);



//router.get("/", auth, getUserResumes);

// Get Resume By ID
router.get("/:id", protect, getResumeById);

// Update Resume
router.put("/:id", protect, updateResume);

// Delete Resume
router.delete("/:id", protect, deleteResume);


export default router;