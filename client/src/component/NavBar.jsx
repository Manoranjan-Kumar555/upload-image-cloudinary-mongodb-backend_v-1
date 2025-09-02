import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">My App</div>
      <div className="navbar-links">
        <NavLink 
          to="/upload" 
          className={({ isActive }) => 
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Image Uploader
        </NavLink>
        <NavLink 
          to="/data" 
          className={({ isActive }) => 
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Show Data
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
