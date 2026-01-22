import React, { useState, useEffect } from "react";
import "../tradeAnalytics/trades.css";
import "../userManagement/users.css";
import "../creditSystemManagement/creditSystemManagement.css";
import { get, patch } from "../../hooks/services/services";
import { showToast } from "../../components/showToast";
import CreditPurchaseChart from "./creditPurchaseChart ";
import ReferralPieChart from "./referralPieChart";

const CreditSystemManagement = () => {
  const [creditData, setCreditData] = useState(null);
  const [subscribersData, setSubscribersData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [chartTotals, setChartTotals] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [subscribersLoading, setSubscribersLoading] = useState(false);
  const [referralData, setReferralData] = useState(null);
  const [referralLoading, setReferralLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);
  const [creditAmount, setCreditAmount] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const yearOptions = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );

  const cardData = [
    {
      count: creditData?.creditIssued || 0,
      label: "Credits issued",
      change: "Since last month",
      icon: "../images/like.svg",
    },
  ];

  const fetchCreditData = async () => {
    setLoading(true);
    try {
      const response = await get("credit/allCredit");

      if (response.status === 200 || response.status === 201) {
        setCreditData(response.data?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching credit data:", error.message);
      showToast(
        error.message ||
          error.response?.message ||
          error.response?.data?.message ||
          "Error fetching credit data",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscribers = async () => {
    setSubscribersLoading(true);
    try {
      const response = await get(`purchase/allSubscribers?page=${currentPage}`);

      if (response.status === 200 || response.status === 201) {
        setSubscribersData(response.data?.data);
      }
    } catch (error) {
      console.error("Error fetching subscribers:", error.message);
      showToast(
        error.message ||
          error.response?.message ||
          error.response?.data?.message ||
          "Error fetching subscribers",
        "error"
      );
    } finally {
      setSubscribersLoading(false);
    }
  };

  const fetchChartData = async (year) => {
    try {
      const response = await get(`credit/credit-by-year?year=${year}`);

      if (response.status === 200 || response.status === 201) {
        setChartData(response.data?.data?.chartData || []);
        setChartTotals(response.data?.data?.totals || null);
      }
    } catch (error) {
      console.error("Error fetching chart data:", error.message);
      showToast(
        error.message ||
          error.response?.message ||
          error.response?.data?.message ||
          "Error fetching chart data",
        "error"
      );
    }
  };

  const fetchReferralDashboard = async () => {
    setReferralLoading(true);
    try {
      const response = await get("invitations/dashboard/overview");

      if (response.status === 200 || response.status === 201) {
        setReferralData(response.data?.data);
      }
    } catch (error) {
      console.error("Error fetching referral dashboard:", error.message);
      showToast(
        error.message ||
          error.response?.message ||
          error.response?.data?.message ||
          "Error fetching referral data",
        "error"
      );
    } finally {
      setReferralLoading(false);
    }
  };

  const handleActionClick = (action, subscriber) => {
    setModalAction(action);
    setSelectedSubscriber(subscriber);
    setCreditAmount("");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalAction("");
    setSelectedSubscriber(null);
    setCreditAmount("");
  };

  const handleConfirmAction = async () => {
    if (!creditAmount || creditAmount <= 0) {
      showToast("Please enter a valid credit amount", "error");
      return;
    }

    if (
      modalAction === "revoke" &&
      parseInt(creditAmount) > (selectedSubscriber?.totalCredits || 0)
    ) {
      showToast(
        "Revoke credit should not be greater than total credits",
        "warning"
      );
      return;
    }

    setActionLoading(true);
    try {
      const response = await patch(
        `purchase/purchaseAction/${selectedSubscriber.userId}`,
        {
          action: modalAction,
          amount: parseInt(creditAmount),
        }
      );

      if (response.status === 200 || response.status === 201) {
        showToast(
          `Credits ${
            modalAction === "allocate" ? "allocated" : "revoked"
          } successfully`,
          "success"
        );
        handleCloseModal();
        fetchSubscribers();
        fetchCreditData();
      }
    } catch (error) {
      console.error(
        `Error ${
          modalAction === "allocate" ? "allocating" : "revoking"
        } credits:`,
        error
      );
      showToast(
        error.response?.data?.message ||
          error.message ||
          `Error ${
            modalAction === "allocate" ? "allocating" : "revoking"
          } credits`,
        "error"
      );
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData(selectedYear);
  }, [selectedYear]);

  useEffect(() => {
    fetchCreditData();
    fetchReferralDashboard();
  }, []);

  useEffect(() => {
    fetchSubscribers();
  }, [currentPage]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const nextPage = () => {
    if (currentPage < subscribersData?.totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="container-fluid dashboard-container">
      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        {cardData.map((card, index) => (
          <div key={index} className="col-md-4">
            <div className="card p-4 border-0 trade-card">
              <div className="d-flex justify-content-between align-items-center card-inner-body">
                <h3>{loading ? "..." : card?.count}</h3>
                <div className="icon-container">
                  <img src={card?.icon} alt="icon" />
                </div>
              </div>

              <p className="muted-text">{card?.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Graph Block  */}
      <div className="row mb-3">
        <div className="col-md-12">
          <CreditPurchaseChart
            chartData={chartData}
            totals={chartTotals}
            selectedYear={selectedYear}
            onYearChange={handleYearChange}
            yearOptions={yearOptions}
          />
        </div>
      </div>

      <div className="users-container mb-3">
        <div className="users-header justify-content-between">
          <div className="credit-count">
            Subscribers <span>{subscribersData?.summary?.bronze || 0}</span>{" "}
            <span>{subscribersData?.summary?.silver || 0}</span>{" "}
            <span>{subscribersData?.summary?.gold || 0}</span>
          </div>
        </div>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>User</th>
              <th>Plan</th>
              <th>Credits</th>
              <th>Purchased On</th>
              {/* <th>Status</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscribersLoading ? (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">
                  Loading subscribers...
                </td>
              </tr>
            ) : subscribersData?.subscribers?.length > 0 ? (
              subscribersData.subscribers.map((subscriber, index) => (
                <tr key={subscriber.id || index} className="clickable-row">
                  <td>
                    <div className="user-info">
                      <img
                        src={
                          subscriber?.userProfileImg ||
                          "images/dummy_image.svg"
                        }
                        alt={subscriber?.userName}
                      />
                      <span>{subscriber?.userName
                          ? subscriber.userName
                          : subscriber?.userEmail
                          ? subscriber.userEmail.slice(0, 2).toUpperCase()
                          : "-"}</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`plan-text ${subscriber?.plan?.toLowerCase()}`}
                    >
                      {subscriber?.plan || "-"}
                    </span>
                  </td>
                  <td className="textGrey">
                    {subscriber?.totalCredits || "-"}
                  </td>
                  <td className="textGrey">
                    {subscriber?.purchasedOn
                      ? formatDate(subscriber.purchasedOn)
                      : "-"}
                  </td>
                  {/* <td>
                    <span className={`status-text ${subscriber?.status?.toLowerCase()}`}>
                      {subscriber?.status || "-"}
                    </span>
                  </td> */}
                  <td>
                    <div className="action-buttons">
                      <button
                        className="allocate-btn"
                        disabled={subscribersLoading}
                        onClick={() =>
                          handleActionClick("allocate", subscriber)
                        }
                      >
                        Allocate
                      </button>
                      <button
                        className="revoke-btn"
                        disabled={subscribersLoading}
                        onClick={() => handleActionClick("revoke", subscriber)}
                      >
                        Revoke
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">
                  No Subscribers Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button
            className="page-btn"
            onClick={prevPage}
            disabled={currentPage === 1 || subscribersLoading}
          >
            Previous
          </button>
          <span className="page-numbers">
            {currentPage} / {subscribersData?.totalPages || 1}
          </span>
          <button
            className="page-btn"
            onClick={nextPage}
            disabled={
              currentPage === subscribersData?.totalPages || subscribersLoading
            }
          >
            Next
          </button>
        </div>
      </div>

      <div className="card border-0 shadow-sm p-4 bonus-card">
        <div className="position-relative d-flex justify-content-between align-items-center">
          <h6 className="fw-semibold mb-3">Bonus Credit Overview</h6>
          <div className="badge bg-warning text-dark position-absolute top-0 end-0 px-3 py-2">
            Credits issued{" "}
            <strong>
              {referralLoading ? "..." : referralData?.creditsIssued || 0}
            </strong>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
              <ReferralPieChart
                chartData={referralData?.chart}
                loading={referralLoading}
              />
            </div>

          <div className="col-md-8">
            <h6 className="top-heading-text mb-4">
              Top 3 leaders in referrals
            </h6>

            <div className="d-flex flex-wrap gap-3">
              {referralLoading ? (
                <div className="text-muted">Loading leaderboard...</div>
              ) : referralData?.leaderboard?.length > 0 ? (
                referralData.leaderboard.map((leader) => (
                  <div
                    key={leader.rank}
                    className="leader-card text-center p-3"
                  >
                    <div className="d-inline-block">
                      <img
                        src={
                          leader.profile_image ||
                          "images/dummy_image.svg"
                        }
                        className="rounded-circle border border-3 border-warning"
                        alt={leader.name || "leader"}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                      <span className="rank-badge bg-warning text-dark">
                        {leader.rank === 1
                          ? "1st"
                          : leader.rank === 2
                          ? "2nd"
                          : leader.rank === 3
                          ? "3rd"
                          : `${leader.rank}th`}
                      </span>
                    </div>
                    <h6 className="mt-2 mb-1 fw-semibold">
                      {leader.name || "N/A"}
                    </h6>
                    <p className="mb-0 fw-bold">{leader.referrals} referrals</p>
                  </div>
                ))
              ) : (
                <div className="text-muted">No leaderboard data available</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Credit Action Modal */}
      {showModal && selectedSubscriber && (
        <div className="delete-modal-overlay" onClick={handleCloseModal}>
          <div
            className="delete-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="delete-modal-title m-0">Credit Management</h3>
              <button
                onClick={handleCloseModal}
                disabled={actionLoading}
                className="modal-cross-button"
              >
                &times;
              </button>
            </div>

            <p className="delete-modal-message">
              <strong>{selectedSubscriber.userName}</strong> currently has{" "}
              <strong>{selectedSubscriber.totalCredits || 0} credits</strong>.
            </p>

            <div className="mb-3">
              <label className="form-label form-label-text">
                {modalAction === "allocate"
                  ? "Credits to Allocate"
                  : "Credits to Revoke"}
              </label>
              <input
                type="number"
                className="form-control form-input-style"
                placeholder="Enter amount"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
                min="1"
                disabled={actionLoading}
              />
            </div>

            <div className="delete-modal-actions">
              <button
                onClick={handleCloseModal}
                className="delete-modal-button delete-modal-button-cancel"
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className="delete-modal-button delete-modal-button-confirm"
                disabled={actionLoading || !creditAmount}
                style={{
                  backgroundColor:
                    modalAction === "allocate" ? "#3e35dfff" : "#d32f2f",
                }}
              >
                {actionLoading
                  ? "Processing..."
                  : modalAction === "allocate"
                  ? "Allocate"
                  : "Revoke"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditSystemManagement;
