import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";


function ResetPassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetPassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/reset-password",
        {
          email: formData.email,
          otp: formData.otp,
          newPassword: formData.newPassword,
        }
      );

      alert(res.data.message);

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
  <div className="auth-card">

    <h1>Reset Password</h1>

    <p>Create a new secure password.</p>

    <Input
      type="email"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleChange}
    />

    <Input
      type="text"
      name="otp"
      placeholder="OTP"
      value={formData.otp}
      onChange={handleChange}
    />

    <Input
      type="password"
      name="newPassword"
      placeholder="New Password"
      value={formData.newPassword}
      onChange={handleChange}
    />

    <Input
      type="password"
      name="confirmPassword"
      placeholder="Confirm Password"
      value={formData.confirmPassword}
      onChange={handleChange}
    />

    <Button
      text="Reset Password"
      onClick={handleResetPassword}
    />

    <p className="back-login" onClick={() => navigate("/")}>
      Back to Login
    </p>

  </div>
</div>
  );
}

export default ResetPassword;