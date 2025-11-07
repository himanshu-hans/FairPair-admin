import React from "react";
import "../header/header.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth?.userId);
  const username = useSelector((state) => state.auth?.username);
  const profileImage = useSelector((state) => state.auth?.profileImage);
  console.log("...", userId);

  const handleProfileClick = () => {
    navigate("/profile", { state: { userId: userId } });
  };

  return (
    <div
      className={`header ${isSidebarOpen ? "header-open" : "header-closed"}`}
    >
      <div className="d-flex align-items-center">
        {/* <button className="icon-button">
          <FaSun className="icon" />
        </button>
        <button className="icon-button">
          <FaGlobe className="icon" />
        </button> */}

        {/* User Profile */}
        <div
          className="user-profile ms-3 d-flex align-items-center cursor-pointer"
          onClick={handleProfileClick}
        >
          <img
            src={profileImage || "images/dummy_image.svg"}
            alt="User Avatar"
            className="avatar"
          />
          <span className="username ms-2">{username || "User"}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
