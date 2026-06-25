import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="container">
      <div className="card">
        <h2>Register</h2>

        <Input
          type="text"
          placeholder="Full Name"
        />

        <Input
          type="email"
          placeholder="Email"
        />

        <Input
          type="password"
          placeholder="Password"
        />

        <Button text="Register" />

        <p>
          Already have an account?
          <Link to="/"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;