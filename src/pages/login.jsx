import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";


function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/login",
        formData
      );

      alert(res.data.message);

      navigate("/dashboard");

    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };
 
  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>

        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button
          text="Login"
          onClick={handleLogin}
        />
        <p>
  <Link to="/forgot-password">
    Forgot Password?
  </Link>
</p>

        <p>
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;