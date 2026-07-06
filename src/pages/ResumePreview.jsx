
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { getResumeById } from "../api/resumeApi";
import "../App.css";

function ResumePreview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const resumeRef = useRef(null);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
  try {
    console.log("Resume ID:", id);

    const res = await getResumeById(id);

    console.log("API Response:", res.data);

    setResume(res.data.resume);
  } catch (err) {
    console.log("Error:", err.response?.data || err.message);
  } finally {
    setLoading(false);
  }
};
  const downloadPDF = () => {
  const element = resumeRef.current;

  const options = {
    margin: 0.5,
    filename: `${resume.personalInfo?.fullName || "Resume"}.pdf`,
    image: {
      type: "jpeg",
      quality: 1,
    },
    html2canvas: {
      scale: 2,
      useCORS: true,
    },
    jsPDF: {
      unit: "in",
      format: "a4",
      orientation: "portrait",
    },
  };

  html2pdf().set(options).from(element).save();
};

  if (loading) {
    return <div className="loading">Loading Resume...</div>;
  }

  if (!resume) {
    return <h2 style={{ textAlign: "center" }}>Resume Not Found</h2>;
  }

  return (
    <div className="preview-page">

      <div className="preview-header no-print">
        <button onClick={() => navigate(-1)}>⬅ Back</button>

        <button
  className="download-btn"
  onClick={downloadPDF}
>
  Download PDF
</button>
      </div>

      <div
  className="resume-template"
  ref={resumeRef}
>

        <h1>{resume.title}</h1>

        <hr />

        {/* Personal Information */}
        <section>
          <div className="personal-info">

  <h1>{resume.personalInfo?.fullName}</h1>

  <div className="contact-info">

    <span>{resume.personalInfo?.address}</span>

    <span>|</span>

    <span>📧 {resume.personalInfo?.email}</span>

    <span>|</span>

    <span>📱 {resume.personalInfo?.phone}</span>

  </div>

</div>
        </section>

        <hr />

        {/* Summary */}
        <section>
          <h2>Professional Summary</h2>

          <p>{resume.summary}</p>
        </section>

        <hr />

        {/* Skills */}
        <section>
          <h2>Skills</h2>

          <ul>
            {resume.skills?.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>

        <hr />

        {/* Education */}
        <section>
          <h2>Education</h2>

          {resume.education?.map((edu, index) => (
            <div key={index}>
              <h4>{edu.degree}</h4>

              <p>{edu.institute}</p>

              <p>{edu.year}</p>
            </div>
          ))}
        </section>

        <hr />

        {/* Experience */}
        <section>
          <h2>Experience</h2>

          {resume.experience?.map((exp, index) => (
            <div key={index}>
              <h4>{exp.company}</h4>

              <p>{exp.position}</p>

              <p>{exp.duration}</p>

              <p>{exp.description}</p>
            </div>
          ))}
        </section>

      </div>

    </div>
  );
}

export default ResumePreview;