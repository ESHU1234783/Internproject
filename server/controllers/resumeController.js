import Resume from "../models/Resume.js";


// ==============================
// Create Resume
// ==============================
export const createResume = async(req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Resume data is required.",
            });
        }

        const resume = await Resume.create({
            ...req.body,
            user: req.user._id,
        });

        return res.status(201).json({
            success: true,
            message: "Resume created successfully.",
            resume,
        });
    } catch (error) {
        console.error("Create Resume Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create resume.",
            error: error.message,
        });
    }
};

// ==============================
// Get All Resumes
// ==============================
export const getAllResumes = async(req, res) => {
    try {
        const resumes = await Resume.find({
            user: req.user._id,
        }).sort({
            updatedAt: -1,
        });

        return res.status(200).json({
            success: true,
            count: resumes.length,
            resumes,
        });
    } catch (error) {
        console.error("Get Resume Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch resumes.",
            error: error.message,
        });
    }
};

// ==============================
// Get Resume By ID
// ==============================
export const getResumeById = async(req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found.",
            });
        }

        return res.status(200).json({
            success: true,
            resume,
        });
    } catch (error) {
        console.error("Get Resume By ID Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch resume.",
            error: error.message,
        });
    }
};

// ==============================
// Update Resume
// ==============================
export const updateResume = async(req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Update data is required.",
            });
        }

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
                message: "Resume not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Resume updated successfully.",
            resume,
        });
    } catch (error) {
        console.error("Update Resume Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update resume.",
            error: error.message,
        });
    }
};

// ==============================
// Delete Resume
// ==============================
export const deleteResume = async(req, res) => {
    try {
        const resume = await Resume.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Resume deleted successfully.",
        });
    } catch (error) {
        console.error("Delete Resume Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete resume.",
            error: error.message,
        });
    }
};