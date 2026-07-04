import Resume from "../models/Resume.js";

// Create Resume
export const createResume = async(req, res) => {
    try {
        const resume = await Resume.create({
            ...req.body,
            user: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "Resume Created Successfully",
            resume,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Resumes of Logged-in User
export const getAllResumes = async(req, res) => {
    try {
        const resumes = await Resume.find({
            user: req.user._id,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            resumes,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Single Resume
export const getResumeById = async(req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume Not Found",
            });
        }

        res.status(200).json({
            success: true,
            resume,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Resume
export const updateResume = async(req, res) => {
    try {
        const resume = await Resume.findOneAndUpdate({
                _id: req.params.id,
                user: req.user._id,
            },
            req.body, {
                new: true,
                runValidators: true,
            }
        );

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Resume Updated Successfully",
            resume,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Resume
export const deleteResume = async(req, res) => {
    try {
        const resume = await Resume.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Resume Deleted Successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};