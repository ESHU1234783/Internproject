import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>

        <Input
          type="email"
          placeholder="Email"
        />

        <Input
          type="password"
          placeholder="Password"
        />

        <Button text="Login" />

        <p>
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;