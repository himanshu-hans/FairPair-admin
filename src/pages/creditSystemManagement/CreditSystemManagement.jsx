import React, { useState, useEffect } from "react";
import "../tradeAnalytics/trades.css";
import "../userManagement/users.css";
import "../creditSystemManagement/creditSystemManagement.css";
import { get } from "../../hooks/services/services";
import { showToast } from "../../components/showToast";
import CreditPurchaseChart from "./creditPurchaseChart ";

const CreditSystemManagement = () => {
  const [creditData, setCreditData] = useState(null);
  const [subscribersData, setSubscribersData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [chartTotals, setChartTotals] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [subscribersLoading, setSubscribersLoading] = useState(false);

  const yearOptions = Array.from(
    { length: 6 },
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
        setCreditData(response.data?.data);
      }
    } catch (error) {
      console.error("Error fetching credit data:", error.message);
      showToast(error.message || error.response?.message || error.response?.data?.message || "Error fetching credit data", "error");
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
      showToast(error.message || error.response?.message || error.response?.data?.message ||  "Error fetching subscribers", "error");
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
      showToast(error.message || error.response?.message || error.response?.data?.message || "Error fetching chart data", "error");
    }
  };

  useEffect(() => {
    fetchChartData(selectedYear);
  }, [selectedYear]);

  useEffect(() => {
    fetchCreditData();
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
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
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
            Subscribers{" "}
            <span>{subscribersData?.summary?.bronze || 0}</span>{" "}
            <span>{subscribersData?.summary?.silver || 0}</span>{" "}
            <span>{subscribersData?.summary?.gold || 0}</span>
          </div>
        </div>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>User</th>
              <th>Plan</th>
              <th>Purchased On</th>
              <th>Status</th>
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
                        src={subscriber?.userProfileImg || `https://i.pravatar.cc/40?img=${index + 10}`}
                        alt={subscriber?.userName}
                      />
                      <span>{subscriber?.userName || "N/A"}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`plan-text ${subscriber?.plan?.toLowerCase()}`}>
                      {subscriber?.plan || "N/A"}
                    </span>
                  </td>
                  <td className="textGrey">
                    {subscriber?.purchasedOn ? formatDate(subscriber.purchasedOn) : "N/A"}
                  </td>
                  <td>
                    <span className={`status-text ${subscriber?.status?.toLowerCase()}`}>
                      {subscriber?.status || "N/A"}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="allocate-btn" disabled={subscribersLoading}>
                        Allocate
                      </button>
                      <button className="revoke-btn" disabled={subscribersLoading}>
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
            disabled={currentPage === subscribersData?.totalPages || subscribersLoading}
          >
            Next
          </button>
        </div>
      </div>

      <div className="card border-0 shadow-sm p-4 bonus-card">
        <div className="position-relative d-flex justify-content-between align-items-center">
          <h6 className="fw-semibold mb-3">Bonus Credit Overview</h6>
          <div className="badge bg-warning text-dark position-absolute top-0 end-0 px-3 py-2">
            Credits issued <strong>2000</strong>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 d-flex flex-column align-items-center justify-content-center text-center chart-box">
            <div className="chart-circle mb-2">
              <div className="chart-inner">2394</div>
            </div>

            <div className="d-flex justify-content-center gap-3 mt-2 stats">
              <div>
                <span className="dot dot-1"></span>22 <small>1st</small>
              </div>
              <div>
                <span className="dot dot-2"></span>15 <small>2nd</small>
              </div>
              <div>
                <span className="dot dot-3"></span>170 <small>3rd</small>
              </div>
              <div>
                <span className="dot dot-4"></span>450 <small>4th</small>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <h6 className="top-heading-text mb-4">
              Top 3 leaders in referrals
            </h6>

            <div className="d-flex flex-wrap gap-3">
              <div className="leader-card text-center p-3">
                <div className="d-inline-block">
                  <img
                    src="../images/profile-img.svg"
                    className="rounded-circle border border-3 border-warning"
                    alt="leader"
                  />
                  <span className="rank-badge bg-warning text-dark">1st</span>
                </div>
                <h6 className="mt-2 mb-1 fw-semibold">
                  Ratna <span className="badge bg-success">+5</span>
                </h6>
                <p className="mb-0 fw-bold">14 referrals</p>
              </div>

              <div className="leader-card text-center p-3">
                <div className="d-inline-block">
                  <img
                    src="../images/profile-img.svg"
                    className="rounded-circle border border-3 border-warning"
                    alt="leader"
                  />
                  <span className="rank-badge bg-warning text-dark">2nd</span>
                </div>
                <h6 className="mt-2 mb-1 fw-semibold">
                  Sari <span className="badge bg-success">+8</span>
                </h6>
                <p className="mb-0 fw-bold">20 referrals</p>
              </div>

              <div className="leader-card text-center p-3">
                <div className="d-inline-block">
                  <img
                    src="../images/profile-img.svg"
                    className="rounded-circle border border-3 border-warning"
                    alt="leader"
                  />
                  <span className="rank-badge bg-warning text-dark">3rd</span>
                </div>
                <h6 className="mt-2 mb-1 fw-semibold">
                  Ali <span className="badge bg-success">+10</span>
                </h6>
                <p className="mb-0 fw-bold">25 referrals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditSystemManagement;