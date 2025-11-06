import React, { useState, useEffect } from "react";
import "../tradeAnalytics/trades.css";
import "../userManagement/users.css";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../components/showToast";
import { get } from "../../hooks/services/services";

const TradesDashboard = () => {
  const navigate = useNavigate();
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [tradesData, setTradesData] = useState({ trades: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [cardData, setCardData] = useState([
    {
      count: 0,
      label: "Completed trades",
      change: "Since last month",
      icon: "../images/like.svg",
    },
    {
      count: 0,
      label: "Active trades",
      change: "Since last month",
      icon: "../images/hand.svg",
    },
    {
      count: 0,
      label: "Pending trades",
      change: "Since last month",
      icon: "../images/time.svg",
    },
    // { count: 0, label: "Disputes", change: "Since last month", icon: "../images/flag.svg" },
  ]);

  // Fetch categories function
  const fetchCategories = async () => {
    try {
      const response = await get("category");
      if (response.status === 200 || response.status === 201) {
        setCategories(response.data?.data || []);
      } else {
        showToast("Failed to load categories", "warning");
      }
    } catch (error) {
      console.error("Error fetching categories:", error.message);
      showToast("Error fetching categories", "error");
    }
  };

  const fetchTrades = async () => {
    setLoading(true);
    try {
      let queryParams = `page=${currentPage}`;

      if (selectedStatus) {
        queryParams += `&status=${selectedStatus}`;
      }

      if (selectedCategory) {
        queryParams += `&category=${selectedCategory}`;
      }

      const response = await get(`publishtrades/all?${queryParams}`);

      if (response.status !== 200) {
        showToast("Failed to fetch trades data", "error");
      }

      setTradesData(response.data?.data || { trades: [] });
    } catch (error) {
      console.error("Error fetching trades:", error.message);
      showToast("Error loading trades", "error");
      setTradesData({ trades: [] });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const response = await get("publishtrades/export", {
        responseType: 'blob'
      });

      if (response.status === 200 || response.status === 201) {
        const blob = response.data;
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `trades_export_${new Date().getTime()}.csv`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

        showToast("Trades exported successfully!", "success");
      } else {
        showToast("Failed to export data", "error");
      }
    } catch (error) {
      console.error("Export failed:", error.message);
      showToast("Export failed. Please try again.", "error");
    }
  };

  const fetchStatusSummary = async () => {
    try {
      const response = await get("publishtrades/status-summary");

      if (response.status === 200 || response.status === 201) {
        const data = response.data?.data;

        setCardData([
          {
            count: data?.completed || 0,
            label: "Completed trades",
            icon: "../images/like.svg",
          },
          {
            count: data?.active || 0,
            label: "Active trades",
            icon: "../images/hand.svg",
          },
          {
            count: data?.pending || 0,
            label: "Pending trades",
            icon: "../images/time.svg",
          },
          // { count: 16, label: "Disputes", change: "Since last month", icon: "../images/flag.svg" },
        ]);
      } else {
        showToast("Failed to fetch trade summary", "warning");
      }
    } catch (error) {
      console.error("Error fetching status summary:", error.message);
      showToast("Error fetching trade summary", "error");
    }
  };

  const handleResetFilters = () => {
    setSelectedStatus("");
    setSelectedCategory("");
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchTrades();
    fetchStatusSummary();
  }, [currentPage, selectedStatus, selectedCategory]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleRowClick = (trade) => {
    setSelectedTrade(trade);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedTrade(null);
  };

  const nextPage = () => {
    if (currentPage < tradesData?.totalPages) {
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

  return (
    <div className="container-fluid dashboard-container">
      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        {cardData.map((card, index) => (
          <div key={index} className="col-md-3">
            <div className="card p-4 border-0 trade-card">
              <div className="d-flex justify-content-between align-items-center card-inner-body">
                <h3>{card?.count}</h3>
                <div className="icon-container">
                  <img src={card?.icon} alt="icon" />
                </div>
              </div>
              <p className="muted-text">{card?.label}</p>
              {/* <p className="success-text">
                <span>+3</span> {card?.change}
              </p> */}
            </div>
          </div>
        ))}
      </div>
      {/* Filters */}
      <div className="d-flex justify-content-end align-items-center mb-3 flex-wrap gap-2">
        <div className="d-flex gap-2">
          <select
            className="form-select trade-select"
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>

          <select
            className="form-select trade-select"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.category}>
                {cat.category}
              </option>
            ))}
          </select>

          {(selectedStatus || selectedCategory) && (
            <button
              className="btn btn-outline-secondary py-0 px-3"
              onClick={handleResetFilters}
            >
              Clear
            </button>
          )}

          <button className="blue_btn py-0 px-5" onClick={handleExport}>
            Export
          </button>
        </div>
      </div>

      <div className="users-container">
        <div className="users-header justify-content-between">
          <div className="user-count">
            Trades <span>{tradesData?.totalItems || 0}</span>
          </div>
          {/* <div className="d-flex gap-2 align-items-center">
            <select className="form-select trade-select">
              <option>WEEKLY</option>
            </select>
          </div> */}
        </div>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>Trade ID</th>
              <th>Trade by</th>
              <th>Trade with</th>
              <th>Category</th>
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
            ) : tradesData?.trades?.length > 0 ? (
              tradesData.trades.map((trade, index) => (
                <tr key={trade.id || index}>
                  <td
                    onClick={() => handleRowClick(trade)}
                    className="clickable-row"
                  >
                    {trade.publishTradeId || "—"}
                  </td>
                  <td
                    onClick={() =>
                      navigate("/trade-user-profile", {
                        state: { userId: trade.userId },
                      })
                    }
                    className="clickable-row"
                  >
                    <div className="user-info">
                      <img
                        src={
                          trade.tradeByProfileImg ||
                          `https://i.pravatar.cc/40?img=${index + 10}`
                        }
                        alt={trade.tradeBy || "user"}
                      />
                      <span>{trade.tradeBy || "—"}</span>
                    </div>
                  </td>
                  <td>
                    <div className="user-info">
                      <img
                        src={
                          trade.tradeWithProfileImg
                            ? trade.tradeWithProfileImg
                            : `https://i.pravatar.cc/40?img=${index + 10}`
                        }
                        alt={trade.tradeWith || "user"}
                      />
                      <span>{trade.tradeWith || "—"}</span>
                    </div>
                  </td>
                  <td className="textGrey">{trade.category || "—"}</td>
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
            {currentPage} / {tradesData?.totalPages || 1}
          </span>
          <button
            className="page-btn"
            onClick={nextPage}
            disabled={currentPage === tradesData?.totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {isDrawerOpen && selectedTrade && (
        <>
          <div className="drawer-overlay show" onClick={closeDrawer}></div>

          <div
            className={`trade-drawer show`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="drawer-header d-flex justify-content-between align-items-center p-3 border-bottom">
              <div className="d-flex align-items-center trades-drawer">
                <h5>{selectedTrade.category || "—"}</h5>
                <h6 className="d-flex align-items-center gap-2">
                  <img
                    src="../images/calender.svg"
                    className="img-fluid"
                    alt="calendar"
                  />{" "}
                  {selectedTrade.start_time || "—"} -{" "}
                  {selectedTrade.end_time || "—"}
                </h6>
                <h6>|</h6>
                <h6>{selectedTrade.start_date || "—"}</h6>
                <span className="coin-badge">
                  <img
                    src="../images/wallet.svg"
                    className="img-fluid"
                    alt="wallet"
                  />{" "}
                  50
                </span>
                <h6 style={{ color: "rgba(26, 26, 26, 0.56)" }}>
                  Trade ID:{" "}
                  <span style={{ color: "rgba(26, 26, 26, 0.88)" }}>
                    {selectedTrade.publishTradeId || "—"}
                  </span>
                </h6>
              </div>
              <div className="d-flex gap-3 align-items-center">
                <div className="cursor-pointer">
                  <img
                    src="../images/link.svg"
                    alt="link icon"
                    className="img-fluid"
                  />
                </div>
                <button
                  className="p-2 bg-transparent border-0"
                  onClick={closeDrawer}
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className="drawer-body p-4">
              {/* Provider Section */}
              <div className="card border-0 drawer-card mb-3">
                <h6 className="fw-medium mb-3">Provider</h6>
                <div className="row g-3 align-items-center">
                  <div className="col-md-4 ">
                    <div className="stats-box d-flex align-items-center gap-3 p-3">
                      <img
                        src={
                          selectedTrade.tradeByProfileImg ||
                          "../images/dummy_image.jpeg"
                        }
                        alt="provider"
                        className="rounded-circle"
                        style={{ width: "60px", height: "60px" }}
                      />
                      <div>
                        <p className="fw-semibold mb-1">
                          {selectedTrade.tradeBy || "—"}
                        </p>
                        <span className="badges rounded-pill px-3">
                          3rd Year
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 ">
                    <div className="d-flex align-items-center gap-3 stats-box p-3">
                      <p
                        className="mt-2 small"
                        style={{ color: "rgba(26, 26, 26, 1)" }}
                      >
                        <i className="bi bi-telephone me-2"></i> — <br />
                        <i className="bi bi-envelope me-2"></i> — <br />
                        <i className="bi bi-code-slash me-2"></i> —
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="stats-box p-3 rounded">
                      <p className="mb-1 small d-flex align-items-center gap-4">
                        <span>Total Trades</span>
                        <span className="fw-semibold text-dark">—</span>
                      </p>
                      <p className="mb-1 small d-flex align-items-center gap-4">
                        <span>Published</span>
                        <span className="fw-semibold text-dark">—</span>
                      </p>
                      <p className="mb-1 small d-flex align-items-center gap-4">
                        <span>Reported</span>
                        <span className="fw-semibold text-dark">—</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Requester Section */}
              <div className="drawer-card mb-3">
                <h6 className="fw-medium mb-3">Requester</h6>
                <div className="row">
                  <div className="col-md-4">
                    <div className="d-flex align-items-center gap-3 stats-box p-3">
                      <img
                        src={
                          selectedTrade.tradeWithProfileImg ||
                          "../images/dummy_image.jpeg"
                        }
                        alt="requester"
                        className="rounded-circle"
                        style={{ width: "60px", height: "60px" }}
                      />
                      <div>
                        <p className="fw-semibold mb-1">
                          {selectedTrade.tradeWith || "—"}
                        </p>
                        <span className="badges rounded-pill px-3">
                          4th Year
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex align-items-center gap-3 stats-box p-3">
                      <p
                        className="mt-2 small"
                        style={{ color: "rgba(26, 26, 26, 1)" }}
                      >
                        <i className="bi bi-telephone me-2"></i> — <br />
                        <i className="bi bi-envelope me-2"></i> — <br />
                        <i className="bi bi-code-slash me-2"></i> —
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="stats-box p-3 rounded">
                      <p className="mb-1 small d-flex align-items-center gap-4">
                        <span>Total Trades</span>
                        <span className="fw-semibold text-dark">—</span>
                      </p>
                      <p className="mb-1 small d-flex align-items-center gap-4">
                        <span>Published</span>
                        <span className="fw-semibold text-dark">—</span>
                      </p>
                      <p className="mb-1 small d-flex align-items-center gap-4">
                        <span>Reported</span>
                        <span className="fw-semibold text-dark">—</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dispute Log */}
              <div className="dispute-card mb-4">
                <h6 className="fw-semibold mb-3 small text-muted">
                  Dispute log
                </h6>

                <div className="dispute-item d-flex justify-content-between align-items-center">
                  <span>No dispute logs available</span>
                  <div className="d-flex gap-3 align-items-center">
                    <div>—</div>
                    <div className="text-muted small">—</div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="d-flex flex-wrap gap-3 mt-auto">
                <button className="custom-badge">Suspend User</button>
                <button className="custom-badge">Refund Credits</button>
                <button className="custom-badge">Reopen Case</button>
                <button className="custom-badge">Close Dispute</button>
                <button className="custom-badge">Issue Warning</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TradesDashboard;