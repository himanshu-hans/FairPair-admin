import React from "react";
import { FaSun, FaGlobe } from "react-icons/fa";
import "../header/header.css";
import { useNavigate } from "react-router-dom";

const Header = ({ isSidebarOpen }) => {
    const navigate = useNavigate();
  return (
    <div
      className={`header ${isSidebarOpen ? "header-open" : "header-closed"}`}
    >
      <div className="d-flex align-items-center">
        <button className="icon-button">
          <FaSun className="icon" />
        </button>
        <button className="icon-button">
          <FaGlobe className="icon" />
        </button>

        {/* User Profile */}
        <div className="user-profile ms-3 d-flex align-items-center cursor-pointer" onClick={()=> navigate("/profile")}>
          <img
            src="images/profile_img.svg"
            alt="User Avatar"
            className="avatar"
          />
          <span className="username ms-2">Tlotliso</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
