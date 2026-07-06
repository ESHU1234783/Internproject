import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllResumes, deleteResume } from "../api/resumeApi";
import "../App.css";

function MyResumes() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await getAllResumes();

      setResumes(res.data.resumes || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) return;

    try {
      await deleteResume(id);

      setResumes(resumes.filter((resume) => resume._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        Loading Resumes...
      </div>
    );
  }

  return (
    <div className="my-resumes">

      <h1>My Resumes</h1>

      {resumes.length === 0 ? (
        <div className="empty">

          <h2>No Resume Found</h2>

          <button
            onClick={() => navigate("/create-resume")}
          >
            Create Resume
          </button>

        </div>
      ) : (
        <div className="resume-grid">

          {resumes.map((resume) => (

            <div
              className="resume-card"
              key={resume._id}
            >

              <h2>{resume.title}</h2>

              <p>
                Last Updated :
                {" "}
                {new Date(resume.updatedAt).toLocaleDateString()}
              </p>

              <div className="buttons">

                <button
                  className="edit"
                  onClick={() =>
                    navigate(`/edit-resume/${resume._id}`)
                  }
                >
                  Edit
                </button>

                <button
                  className="preview"
                  onClick={() =>
                    navigate(`/resume-preview/${resume._id}`)
                  }
                >
                  Preview
                </button>

                <button
                  className="delete"
                  onClick={() =>
                    handleDelete(resume._id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>
      )}
    </div>
  );
}

export default MyResumes;