import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import "./App.css";
import CreateResume from "./pages/CreateResume";
import MyResumes from "./pages/MyResumes";
import ResumePreview from "./pages/ResumePreview";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/create-resume" element={<CreateResume />} />
        <Route path="/my-resumes" element={<MyResumes />} />
        <Route path="/resume-preview/:id" element={<ResumePreview />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;