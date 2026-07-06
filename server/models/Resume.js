import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    personalInfo: {
        fullName: String,
        email: String,
        phone: String,
        address: String,
        linkedin: String,
        github: String,
        portfolio: String,
    },

    summary: {
        type: String,
    },

    education: [{
        college: String,
        degree: String,
        field: String,
        startYear: String,
        endYear: String,
        cgpa: String,
    }, ],

    experience: [{
        company: String,
        role: String,
        startDate: String,
        endDate: String,
        description: String,
    }, ],

    projects: [{
        title: String,
        technologies: String,
        description: String,
        githubLink: String,
    }, ],

    skills: [String],

    certifications: [String],

    languages: [String],
}, {
    timestamps: true,
});

export default mongoose.model("Resume", resumeSchema);