import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api",
});

// Automatically attach JWT token
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

// ================= Resume APIs =================

// Get all resumes
export const getAllResumes = () => API.get("/resume");

// Get single resume by ID
export const getResumeById = (id) => API.get(`/resume/${id}`);

// Delete resume
export const deleteResume = (id) => API.delete(`/resume/${id}`);

// Update resume (future use for Edit)
export const updateResume = (id, data) =>
    API.put(`/resume/${id}`, data);

export default API;