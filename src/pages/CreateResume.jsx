import { useState } from "react";
import API from "../api/resumeApi";
import PersonalInfo from "../components/PersonalInfo";

function CreateResume() {
  const [step, setStep] = useState(1);

  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      github: "",
      portfolio: "",
      summary: "",
    },
    education: [],
    experience: [],
    projects: [],
    skills: [],
    languages: [],
    certifications: [],
  });

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.post("/resume", resumeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Resume Saved Successfully!");

      console.log(res.data);
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="create-resume-container">

      {step === 1 && (
        <PersonalInfo
          resumeData={resumeData}
          setResumeData={setResumeData}
          nextStep={nextStep}
        />
      )}

      {step > 1 && (
        <div style={{ padding: "30px" }}>
          <h2>Next Step Coming...</h2>

          <button onClick={handleSubmit}>
            Save Resume
          </button>
        </div>
      )}

    </div>
  );
}

export default CreateResume;