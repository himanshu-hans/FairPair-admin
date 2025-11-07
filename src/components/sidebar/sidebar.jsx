import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../sidebar/sidebar.css";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { showToast } from "../showToast";
import { logout } from "../authRedux/authSlice";
import { post } from "../../hooks/services/services";

const Sidebar = ({ isSdOpen, setIsSdOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Get tokens from Redux store
  const { access_token } = useSelector((state) => state.auth);

  const menuItems = [
    { name: "User Management", icon: "bi-grid-fill", path: "/user-management" },
    {
      name: "Trade Analytics & Tracking",
      icon: "bi-graph-up",
      path: "/trade-analytics",
    },
    {
      name: "Credit System Management",
      icon: "bi-credit-card",
      path: "/credit-system",
    },
    {
      name: "Notification Broadcasting",
      icon: "bi-bell",
      path: "/notifications",
    },
  ];

  const toggleSidebar = () => setIsSdOpen(!isSdOpen);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    if (!access_token) {
      showToast("No active session found", "warning");
      dispatch(logout());
      navigate("/");
      return;
    }

    setIsLoggingOut(true);

    try {
      const response = await post("auth/logout", {});

      if (response.status === 200 || response.status === 201) {
        dispatch(logout());
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("savedEmail");
        showToast(
          response.data?.message ||
            response?.message ||
            "Logged out successfully!",
          "success"
        );
        navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error);

      if (!error.response) {
        showToast("Network error. Please check your connection.", "error");
      } else {
        dispatch(logout());
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("savedEmail");

        showToast(
          error.response?.data?.message ||
            error.response?.message ||
            error?.message ||
            "Logged out locally",
          "warning"
        );
        navigate("/");
      }
    } finally {
      setIsLoggingOut(false);
    }
  };

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
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="btn btnn btn-light w-100 d-flex align-items-center text-secondary"
          style={{
            justifyContent: isSdOpen ? "start" : "center",
            opacity: isLoggingOut ? 0.6 : 1,
            cursor: isLoggingOut ? "not-allowed" : "pointer",
          }}
        >
          <i className="bi-box-arrow-right me-2"></i>
          {isSdOpen && (isLoggingOut ? "Logging out..." : "Logout")}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
