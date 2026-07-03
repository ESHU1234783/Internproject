import { FaBell, FaUserCircle } from "react-icons/fa";
import logo from "../assets/hero.png";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Resume Builder</h2>
      </div>

      <div className="navbar-right">

        <button className="icon-btn">
          <FaBell />
        </button>

        <div className="profile">
          <FaUserCircle className="profile-icon" />
          <span>Eshu</span>
        </div>

      </div>

    </nav>
  );
}

export default Navbar;