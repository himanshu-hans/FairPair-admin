import React, { useEffect, useState } from "react";
import "../tradeAnalytics/trades.css";
import "../userManagement/users.css";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaStar,
  FaCrown,
  FaClock,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { showToast } from "../../components/showToast";
import { get } from "../../hooks/services/services";

const TradeUserProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [userTrades, setUserTrades] = useState({ data: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const userId = location.state?.userId || null;

  const getPlanColor = (planName) => {
    if (!planName) return "#616161";

    const plan = planName.toLowerCase();

    if (plan.includes("bronze")) {
      return "#00BFA6";
    } else if (plan.includes("silver")) {
      return "#9C27B0";
    } else if (plan.includes("gold")) {
      return "#616161";
    }

    return "#616161";
  };

  const fetchUserProfile = async () => {
    if (!userId) return;

    try {
      const response = await get(`user/user-profile/${userId}`);

      if (response.status === 200 || response.status === 201) {
        setUserData(response.data?.data);
      } else {
        showToast(response?.data?.message || response?.message || "Failed to load user profile", "error");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
      showToast(error.response?.data?.message || error.response?.message || error.message || "Error fetching user profile", "error");
    }
  };

  const fetchUserTrades = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const response = await get(
        `publishtrades/get-by-user/${userId}?page=${currentPage}`
      );

      if (response.status === 200 || response.status === 201) {
        setUserTrades(response.data?.data || { data: [] });
      } else {
        showToast(response?.data?.message || response?.message || "Failed to fetch user trades", "error");
      }
    } catch (error) {
      console.error("Error fetching user trades:", error.message);
      setUserTrades({ data: [] });
      showToast(error.response?.data?.message || error.response?.message || error.message || "Error fetching user trades", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchUserTrades();
  }, [userId, currentPage]);

  const nextPage = () => {
    if (currentPage < userTrades?.totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const formatDateTime = (date, time) => {
    if (!date || !time) return "—";
    const dateObj = new Date(date);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${time}`;
  };

  if (!userData) {
    return (
      <div className="container-fluid dashboard-container">
        <div className="text-center py-5">Loading user profile...</div>
      </div>
    );
  }

  return (
    <div className="container-fluid dashboard-container">
      <div className="profile-header d-flex align-items-center p-3 gap-5 mb-3">
        <FaArrowLeft
          className="text-dark fs-5 cursor-pointer"
          style={{ fontSize: "1.5rem" }}
          onClick={() => navigate(-1)}
        />
        <div className="d-flex align-items-center gap-3">
          <img
            src={
              userData?.profile_image || `https://i.pravatar.cc/40?img=${10}`
            }
            alt="profile"
            className="rounded-circle profile-img img-fluid"
          />
          <div className="userNameContainer">
            <h6 className="mb-0 fw-semibold text-dark">
              {userData?.username || "—"}
            </h6>
            <small className="text-muted">{userData?.year || "—"} years</small>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2">
          {userData?.isProfileVefied === "verified" ? (
            <FaCheckCircle
              className="text-success"
              style={{ fontSize: "1.5rem" }}
            />
          ) : (
            <FaClock color="orange" style={{ fontSize: "1.5rem" }} />
          )}
          <span className="text-dark fw-semibold verified-text">
            {userData?.isProfileVefied === "verified" ? "Verified" : "Pending"}
          </span>
        </div>

        <div className="d-flex align-items-center gap-2">
          <FaStar className="text-warning" style={{ fontSize: "1.5rem" }} />
          <span className="fw-semibold text-dark verified-text">
            {userData?.rating || "0.0"}
          </span>
        </div>

        <div className="d-flex align-items-center gap-2">
          <FaCrown
            style={{
              fontSize: "1.5rem",
              color: getPlanColor(userData?.planName),
            }}
          />
          <span className="fw-medium text-dark verified-text">
            {userData?.planName?.toUpperCase() || "-"}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card p-4 border-0 trade-card h-100 d-flex justify-content-center">
            <table className="table table-borderless contact-table mb-0">
              <tbody>
                <tr>
                  <td className="icon-cell">
                    <i className="bi bi-telephone text-secondary fs-6"></i>
                  </td>
                  <td className="text-dark small">
                    {userData?.phoneNumber || "—"}
                  </td>
                </tr>
                <tr>
                  <td className="icon-cell">
                    <i className="bi bi-envelope text-secondary fs-6"></i>
                  </td>
                  <td className="text-dark small">{userData?.email || "—"}</td>
                </tr>
                <tr>
                  <td className="icon-cell">
                    <i className="bi bi-code-slash text-secondary fs-6"></i>
                  </td>
                  <td className="text-dark small">
                    {userData?.KeySkill
                      ? userData.KeySkill.length > 30
                        ? userData.KeySkill.slice(0, 30) + "..."
                        : userData.KeySkill
                      : "—"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Card */}
        <div className="col-md-4">
          <div className="card p-4 border-0 trade-card h-100 d-flex justify-content-center">
            <table className="table table-borderless mb-0 small align-middle card-table">
              <tbody>
                <tr>
                  <td>Total Trades</td>
                  <td className="text-dark fw-semibold">
                    {userData?.totalTrade || 0}
                  </td>
                </tr>
                <tr>
                  <td>Published</td>
                  <td className="text-dark fw-semibold">
                    {userData?.published || 0}
                  </td>
                </tr>
                <tr>
                  <td>Reported</td>
                  <td className="text-dark fw-semibold">
                    {userData?.reported || 0}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-4 border-0 trade-card h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0 fw-semibold text-dark">Credits</h5>
            </div>

            {/* <button
                className="btn btn-link p-0 text-decoration-none text-primary fw-semibold"
                style={{ color: "rgba(62, 53, 223, 1)" }}
              >
                Revoke
              </button> */}

            <div className="d-flex align-items-center mb-3">
              <img
                src="../images/wallet.svg"
                alt="Wallet Icon"
                className="img-fluid me-2"
                style={{ width: "22px", height: "22px" }}
              />
              <span className="fs-5 fw-bold text-dark">
                {userData?.totalCredits || 0}
              </span>
            </div>
            {/* <div className="d-flex align-items-center gap-4">
              <span className="small text-secondary">Reported</span>
              <span className="fw-semibold text-dark">
                {userData?.reported || 0}
              </span>
            </div> */}
          </div>
        </div>
      </div>

      <div className="users-container">
        <div className="users-header">
          {/* <h2>Users</h2> */}
          <div className="user-count">
            Trades <span>{userTrades?.totalItems || 0}</span>
          </div>
        </div>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>Trade ID</th>
              <th>Trade with</th>
              <th>Category</th>
              <th>service</th>
              <th>Date/Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">
                  Loading trades...
                </td>
              </tr>
            ) : userTrades?.data?.length > 0 ? (
              userTrades.data.map((trade, index) => (
                <tr key={trade.id || index} className="clickable-row">
                  <td>{trade.publishTradeId || "—"}</td>
                  <td>
                    <div className="user-info">
                      <img
                        src={
                          trade.tradeWithProfileImg ||
                          `https://i.pravatar.cc/40?img=${index + 10}`
                        }
                        alt={trade.tradeWith || "user"}
                      />
                      <span>{trade.tradeWith || "—"}</span>
                    </div>
                  </td>
                  <td className="textGrey">{trade.category || "—"}</td>
                  <td className="textGrey">—</td>
                  <td className="textGrey">
                    {formatDateTime(trade.start_date, trade.start_time)}
                  </td>
                  <td>
                    <span
                      className={`status-text ${
                        trade.status?.toLowerCase() || ""
                      }`}
                    >
                      {trade.status || "—"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">
                  No trades found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button
            className="page-btn"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="page-numbers">
            {currentPage} / {userTrades?.totalPages || 1}
          </span>
          <button
            className="page-btn"
            onClick={nextPage}
            disabled={currentPage === userTrades?.totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradeUserProfile;
