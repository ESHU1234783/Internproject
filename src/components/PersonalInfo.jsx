import { useState } from "react";
//import "./App.css";

function PersonalInfo({ resumeData, setResumeData, nextStep }) {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value,
      },
    }));
  };

  const validate = () => {
    let newErrors = {};

    if (!resumeData.personalInfo.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!resumeData.personalInfo.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!resumeData.personalInfo.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      nextStep();
    }
  };

  return (
    <div className="personal-container">

      <div className="personal-card">

        <h2>Personal Information</h2>

        <p>Fill your basic information carefully.</p>

        <div className="grid">

          <div className="input-group">
            <label>Full Name *</label>

            <input
              type="text"
              name="fullName"
              value={resumeData.personalInfo.fullName}
              onChange={handleChange}
            />

            {errors.fullName && (
              <span>{errors.fullName}</span>
            )}
          </div>

          <div className="input-group">
            <label>Email *</label>

            <input
              type="email"
              name="email"
              value={resumeData.personalInfo.email}
              onChange={handleChange}
            />

            {errors.email && (
              <span>{errors.email}</span>
            )}
          </div>

          <div className="input-group">
            <label>Phone *</label>

            <input
              type="text"
              name="phone"
              value={resumeData.personalInfo.phone}
              onChange={handleChange}
            />

            {errors.phone && (
              <span>{errors.phone}</span>
            )}
          </div>

          <div className="input-group">
            <label>Address</label>

            <input
              type="text"
              name="address"
              value={resumeData.personalInfo.address}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>LinkedIn</label>

            <input
              type="text"
              name="linkedin"
              value={resumeData.personalInfo.linkedin}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>GitHub</label>

            <input
              type="text"
              name="github"
              value={resumeData.personalInfo.github}
              onChange={handleChange}
            />
          </div>

          <div className="input-group full-width">
            <label>Portfolio</label>

            <input
              type="text"
              name="portfolio"
              value={resumeData.personalInfo.portfolio}
              onChange={handleChange}
            />
          </div>

          <div className="input-group full-width">
            <label>Professional Summary</label>

            <textarea
              rows="5"
              name="summary"
              value={resumeData.personalInfo.summary}
              onChange={handleChange}
            />
          </div>

        </div>

        <button
          className="next-btn"
          type="button"
          onClick={handleNext}
        >
          Next →
        </button>

      </div>

    </div>
  );
}

export default PersonalInfo;