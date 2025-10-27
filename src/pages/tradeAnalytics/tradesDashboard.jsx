import React, { useState } from "react";
import "../tradeAnalytics/trades.css";
import "../userManagement/users.css";
import { FaTimes } from "react-icons/fa";

const cardData = [
  {
    count: 2000,
    label: "Completed trades",
    count: "+3",
    change: "Since last month",
    icon: "../images/like.svg",
  },
  {
    count: 30,
    label: "Active trades",
    count: "+3",
    change: "Since last month",
    icon: "../images/hand.svg",
  },
  {
    count: 8,
    label: "Pending trades",
    count: "+3",
    change: "Since last month",
    icon: "../images/time.svg",
  },
  {
    count: 16,
    label: "Disputes",
    count: "+8",
    change: "Since last month",
    icon: "../images/flag.svg",
  },
];

const tradeUsers = [
  {
    id: "389498",
    by: "Chinua Achebe",
    with: "Nelson Mandela",
    category: "Technology",
    datetime: "29 Jun 2:00 PM",
    status: "Pending",
  },
  {
    id: "474849",
    by: "Wangari Maathai",
    with: "Wangari Maathai",
    category: "Wellness",
    datetime: "30 Jul 6:00 PM",
    status: "Active",
  },
  {
    id: "562321",
    by: "Nelson Mandela",
    with: "Chinua Achebe",
    category: "Finance",
    datetime: "10 Jul 1:30 PM",
    status: "Completed",
  },
  {
    id: "647832",
    by: "Miriam Makeba",
    with: "Yaa Asantewaa",
    category: "Education",
    datetime: "15 Jul 4:45 PM",
    status: "Cancelled",
  },
  {
    id: "718293",
    by: "Biko Tambo",
    with: "Haile Selassie",
    category: "Travel",
    datetime: "22 Jul 9:15 AM",
    status: "Reported",
  },
  {
    id: "834657",
    by: "Aminatta Forna",
    with: "Desmond Tutu",
    category: "Food & Beverage",
    datetime: "28 Jul 3:00 PM",
    status: "Active",
  },
  {
    id: "902174",
    by: "Ayaan Hirsi Ali",
    with: "Miriam Makeba",
    category: "Entertainment",
    datetime: "5 Aug 11:00 AM",
    status: "Pending",
  },
];

const TradesDashboard = () => {
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleRowClick = (trade) => {
    setSelectedTrade(trade);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedTrade(null);
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
              <p className="success-text">
                <span>{card?.count}</span> {card?.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="d-flex justify-content-end align-items-center mb-3 flex-wrap gap-2">
        <div className="d-flex gap-2">
          <select className="form-select trade-select">
            <option>Status</option>
          </select>
          <select className="form-select trade-select">
            <option>Category</option>
            <option>Category</option>
          </select>
          <button className="blue_btn py-0 px-5">Export</button>
        </div>
      </div>

      <div className="users-container">
        <div className="users-header justify-content-between">
          {/* <h2>Users</h2> */}
          <div className="user-count">
            Trades <span>50</span>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <select className="form-select trade-select">
              <option>WEEKLY</option>
            </select>
          </div>
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
            {tradeUsers.map((trade, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(trade)}
                className="clickable-row"
              >
                <td>{trade.id}</td>
                <td>
                  <div className="user-info">
                    <img
                      src={`https://i.pravatar.cc/40?img=${index + 10}`}
                      alt={trade.by}
                    />
                    <span>{trade.by}</span>
                  </div>
                </td>
                <td>
                  <div className="user-info">
                    <img
                      src={`https://i.pravatar.cc/40?img=${index + 10}`}
                      alt={trade.with}
                    />
                    <span>{trade.with}</span>
                  </div>
                </td>
                <td className="textGrey">{trade.category}</td>
                <td className="textGrey">{trade.datetime}</td>
                <td>
                  <span className={`status-text ${trade.status.toLowerCase()}`}>
                    {trade.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button className="page-btn">Previous</button>
          <span className="page-numbers">1 2 3 ... 10</span>
          <button className="page-btn">Next</button>
        </div>
      </div>

      {/* {isDrawerOpen && selectedTrade && (
  <div className="drawer-overlay" onClick={closeDrawer}>
    <div
      className="trade-drawer"
      onClick={(e) => e.stopPropagation()} 
    >
      <div className="drawer-header">
        <h5>{selectedTrade.category}</h5>
        <button className="close-btn" onClick={closeDrawer}>
          <FaTimes />
        </button>
      </div>

      <div className="drawer-section">
        <h6>Provider</h6>
        <div className="drawer-user">
          <img src="https://i.pravatar.cc/50?img=30" alt="provider" />
          <div>
            <p className="user-name">{selectedTrade.by}</p>
            <p className="textGrey">Total Trades: 34</p>
          </div>
        </div>
      </div>

      <div className="drawer-section">
        <h6>Requester</h6>
        <div className="drawer-user">
          <img src="https://i.pravatar.cc/50?img=40" alt="requester" />
          <div>
            <p className="user-name">{selectedTrade.with}</p>
            <p className="textGrey">Total Trades: 21</p>
          </div>
        </div>
      </div>

      <div className="drawer-section">
        <h6>Dispute log</h6>
        <ul className="dispute-log">
          <li>Jorge reported the trade as bulky — <span>08 Jul 11:45 PM</span></li>
          <li>Admin escalated to review — <span>08 Jul 11:50 PM</span></li>
          <li>Admin approved refund — <span>09 Jul 12:15 AM</span></li>
          <li>Resolved - credits refunded — <span>09 Jul 1:30 AM</span></li>
        </ul>
      </div>

      <div className="drawer-actions">
        <button className="blue_btn">Suspend User</button>
        <button className="blue_btn">Refund Credits</button>
        <button className="blue_btn">Reopen Case</button>
        <button className="blue_btn">Close Dispute</button>
        <button className="blue_btn">Issue Warning</button>
      </div>
    </div>
  </div>
)} */}

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
                <h5>{selectedTrade.category}</h5>
                <h6 className="d-flex align-items-center gap-2">
                  <img src="../images/calender.svg" className="img-fluid"></img>{" "}
                  6 PM - 7 PM
                </h6>
                <h6>|</h6>
                <h6>Monday</h6>
                <span className="coin-badge">
                  <img src="../images/wallet.svg" className="img-fluid"></img>{" "}
                  50
                </span>
                <h6 style={{ color: "rgba(26, 26, 26, 0.56)" }}>
                  Trade ID:{" "}
                  <span style={{ color: "rgba(26, 26, 26, 0.88)" }}>
                    {selectedTrade.id}
                  </span>
                </h6>
              </div>
              <div className="d-flex gap-3 align-items-center">
                <div className="cursor-pointer">
                  <img
                    src="../images/link.svg"
                    alt="link icon"
                    className="img-fluid"
                  ></img>
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
                        src="https://i.pravatar.cc/60?img=30"
                        alt="provider"
                        className="rounded-circle"
                      />
                      <div>
                        <p className="fw-semibold mb-1">{selectedTrade.by}</p>
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
                        <i className="bi bi-telephone me-2"></i> +1 8466784862{" "}
                        <br />
                        <i className="bi bi-envelope me-2"></i>{" "}
                        craig@example.com <br />
                        <i className="bi bi-code-slash me-2"></i> Java, Python,
                        C++
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="stats-box p-3 rounded">
                      <p className="mb-1 small d-flex align-items-center gap-4">
                        <span>Total Trades</span>
                        <span className="fw-semibold text-dark">34</span>
                      </p>
                      <p className="mb-1 small d-flex align-items-center gap-4">
                        <span>Published</span>
                        <span className="fw-semibold text-dark">21</span>
                      </p>
                      <p className="mb-1 small d-flex align-items-center gap-4">
                        <span>Reported</span>
                        <span className="fw-semibold text-dark">2</span>
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
                        src="https://i.pravatar.cc/60?img=40"
                        alt="requester"
                        className="rounded-circle"
                      />
                      <div>
                        <p className="fw-semibold mb-1">{selectedTrade.with}</p>
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
                        <i className="bi bi-telephone me-2"></i> +1 5551234567{" "}
                        <br />
                        <i className="bi bi-envelope me-2"></i>{" "}
                        jorge@example.com <br />
                        <i className="bi bi-code-slash me-2"></i> JavaScript,
                        Ruby, Go
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="stats-box p-3 rounded">
                      <p className="mb-1 small d-flex align-items-center gap-4">
                        <span>Total Trades</span>
                        <span className="fw-semibold text-dark">34</span>
                      </p>
                      <p className="mb-1 small d-flex align-items-center gap-4">
                        <span>Published</span>
                        <span className="fw-semibold text-dark">21</span>
                      </p>
                      <p className="mb-1 small d-flex align-items-center gap-4">
                        <span>Reported</span>
                        <span className="fw-semibold text-dark">2</span>
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
                  <span>Jorge reported the trade as bulley</span>
                  <div className="d-flex gap-3 align-items-center">
                    <div>08 Jul</div>
                    <div className="text-muted small">11:45 PM</div>
                  </div>
                </div>

                <div className="dispute-item d-flex justify-content-between align-items-center">
                  <span>Admin escalated to review</span>
                  <div className="d-flex gap-3 align-items-center">
                    <div>09 Jul</div>
                    <div className="text-muted small">12:00 AM</div>
                  </div>
                </div>

                <div className="dispute-item d-flex justify-content-between align-items-center">
                  <span>
                    Admin Approved the trade as bulley, on the basis of review
                  </span>
                  <div className="d-flex gap-3 align-items-center">
                    <div>09 Jul</div>
                    <div className="text-muted small">12:15 AM</div>
                  </div>
                </div>

                <div className="dispute-item d-flex justify-content-between align-items-center">
                  <span>Resolved - credits refunded</span>
                  <div className="d-flex gap-3 align-items-center">
                    <div>09 Jul</div>
                    <div className="text-muted small">12:30 AM</div>
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
