import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./Auth";
import "../styles/navbar.css";

const NavBar = () => {
  const [error, setError] = useState("");
  const { currUser, logout } = useAuth();
  const navigate = useNavigate();
  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Unable to logout");
    }
  }

  return (
    <nav className="nav">
      
        <Link to="/" style={{ textDecoration: "none" }}>
          <p className="app">Task tracker</p>
        </Link>
        {currUser ? (
          <div className="dropdown">
            <button className="dropbutton">
              {currUser.displayName}
              <img src={currUser.photoURL} alt="avatar" className="avatar" />
            </button>
            <div className="dropdown-content">
              <Link to="/profile">Profile</Link>
              <p onClick={handleLogout}>Log Out</p>
            </div>
          </div>
        ) : (
          <div className="new">
            <button className="NavButton">
              <Link to="/login">Log In</Link>
            </button>
            <button className="NavButton">
              <Link to="/signup">Sign Up</Link>
            </button>
          </div>
        )}
      
    </nav>
  );
};

export default NavBar;
