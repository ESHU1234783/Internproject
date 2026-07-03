import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  // OTP Send
  const sendOTP = async () => {

    try {

      const res = await axios.post(
        "http://localhost:8000/api/auth/forgot-password",
        { email }
      );

      alert(res.data.message);

    } catch (error) {

      alert(error.response?.data?.message);

    }

  };

  // OTP Verify
  const verifyOTP = async () => {

    try {

      const res = await axios.post(
        "http://localhost:8000/api/auth/verify-otp",
        {
          email,
          otp,
        }
      );
      

      alert(res.data.message);

      navigate("/reset-password");

    } catch (error) {

      alert(error.response?.data?.message);

    }

  };

  return (

    <div className="container">

      <div className="card">

        <h2>Forgot Password</h2>

        <Input
          type="email"
          placeholder="Enter Email"
          name="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <Button
          text="Send OTP"
          onClick={sendOTP}
        />

        <Input
          type="text"
          placeholder="Enter OTP"
          name="otp"
          value={otp}
          onChange={(e)=>setOtp(e.target.value)}
        />

        <Button
          text="Verify OTP"
          onClick={verifyOTP}
        />

      </div>

    </div>

  );

}

export default ForgotPassword;