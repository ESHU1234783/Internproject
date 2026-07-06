import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaFileAlt,
  FaStar,
  FaDownload,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <div className="hero">
          <h1>👋 Welcome Back, Eshu</h1>

          <p>
            Create ATS-Friendly resumes that impress recruiters.
          </p>
        </div>

        <div className="cards">

          {/* Create Resume */}
          <DashboardCard
            icon={<FaPlus />}
            title="Create Resume"
            description="Start building a professional resume."
            onClick={() => navigate("/create-resume")}
          />

          {/* My Resumes */}
          <DashboardCard
            icon={<FaFileAlt />}
            title="My Resumes"
            description="View all your saved resumes."
            onClick={() => navigate("/my-resumes")}
          />

          {/* ATS Score */}
          <DashboardCard
            icon={<FaStar />}
            title="ATS Score"
            description="Check your resume quality."
            onClick={() => alert("ATS Score feature coming soon!")}
          />

          {/* Download PDF */}
          <DashboardCard
            icon={<FaDownload />}
            title="Download PDF"
            description="Export your resume instantly."
            onClick={() => alert("Download PDF feature coming soon!")}
          />

        </div>
      </div>
    </>
  );
}

export default Dashboard;