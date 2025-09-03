import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiLogOut, FiUpload, FiDatabase, FiMenu, FiX } from "react-icons/fi";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("✅ Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">AuthApp</div>

      {/* Hamburger (mobile) */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </div>

      {/* Links */}
      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <NavLink
          to="/upload"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          onClick={() => setMenuOpen(false)}
        >
          <FiUpload className="icon" /> Upload
        </NavLink>

        <NavLink
          to="/data"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          onClick={() => setMenuOpen(false)}
        >
          <FiDatabase className="icon" /> Data
        </NavLink>

        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut className="icon" /> Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
