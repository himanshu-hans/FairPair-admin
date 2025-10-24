import React, { useState } from "react";
import '../sidebar/sidebar.css';
import { useLocation, Link } from "react-router-dom";

const Sidebar = ({isSdOpen, setIsSdOpen }) => {
    const location = useLocation()

const menuItems = [
    { name: "User Management", icon: "bi-grid-fill", path: "/user-management" },
    { name: "Trade Analytics & Tracking", icon: "bi-graph-up", path: "/trade-analytics" },
    { name: "Credit System Management", icon: "bi-credit-card", path: "/credit-system" },
    { name: "Content Management", icon: "bi-file-earmark-text", path: "/content-management" },
    // { name: "Reports & Insights", icon: "bi-bar-chart", path: "/reports" },
    { name: "Notification Broadcasting", icon: "bi-bell", path: "/notifications" },
  ];

  const toggleSidebar = () => setIsSdOpen(!isSdOpen);

  return (
    <div
      className="d-flex flex-column justify-content-between bg-white"
      style={{
        width: isSdOpen ? "318px" : "80px",
        height: "100vh",
        padding: "16px 8px",
        transition: "width 0.3s",
      }}
    >
      <div className="flex flex-col items-center mb-6 cursor-pointer">
        {/* Logo */}
        {isSdOpen ? (
          <img
            src="/images/Fair_Pair_Logo.svg"
            alt="Fair Pair Logo"
            className="w-32 h-auto mb-4 transition-all duration-300"
            onClick={toggleSidebar}
          />
        ) : (
          <img
            src="images/FPlog.svg"
            alt=""
            onClick={toggleSidebar}
            className="w-50 h-60 ms-2"
          />
        )}
      </div>

      {/* Menu */}
      <div className="px-1 my-4 mb-5">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`btn btnn w-100 d-flex align-items-center mb-2 ${
              location.pathname.startsWith(item.path) ? "active-link" : ""
            }`}
            style={{
              borderRadius: "20px",
              padding: "8px",
              fontSize: "14px",
              justifyContent: isSdOpen ? "start" : "center",
              textDecoration: "none", 
            }}
          >
            <i className={`${item.icon} me-2`} style={{ fontSize: "16px" }}></i>
            {isSdOpen && item.name}
          </Link>
        ))}
      </div>

      <div className="px-1 mt-auto">
        <button
          className="btn btnn btn-light w-100 d-flex align-items-center mb-2 text-secondary"
          style={{ justifyContent: isSdOpen ? "start" : "center" }}
        >
          <i className="bi-question-circle me-2"></i>
          {isSdOpen && "Help"}
        </button>
        <button
          className="btn btnn btn-light w-100 d-flex align-items-center text-secondary"
          style={{ justifyContent: isSdOpen ? "start" : "center" }}
        >
          <i className="bi-box-arrow-right me-2"></i>
          {isSdOpen && "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
