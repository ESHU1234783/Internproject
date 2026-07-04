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

         <DashboardCard
  icon={<FaPlus />}
  title="Create Resume"
  description="Start building a professional resume."
  onClick={() => navigate("/create-resume")}
/>

          <DashboardCard
            icon={<FaFileAlt />}
            title="My Resumes"
            description="View all your saved resumes."
          />

          <DashboardCard
            icon={<FaStar />}
            title="ATS Score"
            description="Check your resume quality."
          />

          <DashboardCard
            icon={<FaDownload />}
            title="Download PDF"
            description="Export your resume instantly."
          />

        </div>

      </div>
    </>
  );
}

export default Dashboard;