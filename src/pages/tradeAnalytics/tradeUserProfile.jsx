import React, { useState } from "react";
import "../tradeAnalytics/trades.css";
import "../userManagement/users.css";
import { FaArrowLeft, FaCheckCircle, FaStar, FaCrown } from "react-icons/fa";


const tradeUsers = [
  {
    id: "389498",
    by: "Chinua Achebe",
    with: "Nelson Mandela",
    category: "Technology",
    service: "Java",
    datetime: "29 Jun 2:00 PM",
    status: "Pending",
  },
  {
    id: "474849",
    by: "Wangari Maathai",
    with: "Wangari Maathai",
    category: "Wellness",
     service: "Subconscious mind",
    datetime: "30 Jul 6:00 PM",
    status: "Active",
  },
  {
    id: "562321",
    by: "Nelson Mandela",
    with: "Chinua Achebe",
    category: "Finance",
    service: "Balance sheet",
    datetime: "10 Jul 1:30 PM",
    status: "Completed",
  },
  {
    id: "647832",
    by: "Miriam Makeba",
    with: "Yaa Asantewaa",
    category: "Education",
    service: "Content creation",
    datetime: "15 Jul 4:45 PM",
    status: "Cancelled",
  },
  {
    id: "718293",
    by: "Biko Tambo",
    with: "Haile Selassie",
    category: "Travel",
    service: "Teaching",
    datetime: "22 Jul 9:15 AM",
    status: "Reported",
  },
  {
    id: "834657",
    by: "Aminatta Forna",
    with: "Desmond Tutu",
    category: "Food & Beverage",
     service: "Vlogs",
    datetime: "28 Jul 3:00 PM",
    status: "Active",
  },
  {
    id: "902174",
    by: "Ayaan Hirsi Ali",
    with: "Miriam Makeba",
    category: "Entertainment",
     service: "Recipe",
    datetime: "5 Aug 11:00 AM",
    status: "Pending",
  },
];

const TradeUserProfile = () => {


  return (
    <div className="container-fluid dashboard-container">

        <div className="profile-header d-flex align-items-center p-3 gap-5 mb-3">
      {/* Left Section */}
        <FaArrowLeft className="text-dark fs-5 cursor-pointer" style={{ fontSize: "1.5rem" }}/>
        <div className="d-flex align-items-center gap-3">
            <img
          src="../images/dummyUser.svg"
          alt="profile"
          className="rounded-circle profile-img img-fluid"
        />
        <div className="userNameContainer">
          <h6 className="mb-0 fw-semibold text-dark">Craig Terry</h6>
          <small className="text-muted">3rd Year</small>
        </div>
        </div>

      {/* Right Section */}
      <div className="d-flex align-items-center gap-2">
          <FaCheckCircle className="text-success" style={{ fontSize: "1.5rem" }} />
          <span className="text-dark fw-semibold verified-text">Verified</span>
        </div>

        <div className="d-flex align-items-center gap-2">
          <FaStar className="text-warning" style={{ fontSize: "1.5rem" }} />
          <span className="fw-semibold text-dark verified-text">4.0</span>
        </div>

        <div className="d-flex align-items-center gap-2">
          <FaCrown className="text-secondary" style={{ fontSize: "1.5rem" }}/>
          <span className="fw-medium text-dark verified-text">BRONZE</span>
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
        <td className="text-dark small">+1 5551234567</td>
      </tr>
      <tr>
        <td className="icon-cell">
          <i className="bi bi-envelope text-secondary fs-6"></i>
        </td>
        <td className="text-dark small">jorge@example.com</td>
      </tr>
      <tr>
        <td className="icon-cell">
          <i className="bi bi-code-slash text-secondary fs-6"></i>
        </td>
        <td className="text-dark small">JavaScript, Ruby, Go</td>
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
        <td className="text-dark fw-semibold">34</td>
      </tr>
      <tr>
        <td>Published</td>
        <td className="text-dark fw-semibold">21</td>
      </tr>
      <tr>
        <td>Reported</td>
        <td className="text-dark fw-semibold">2</td>
      </tr>
    </tbody>
  </table>
</div>


  </div>
        <div className="col-md-4">
  <div className="card p-4 border-0 trade-card h-100">
    {/* Header Section */}
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h5 className="mb-0 fw-semibold text-dark">Credits</h5>
      <button className="btn btn-link p-0 text-decoration-none text-primary fw-semibold" style={{ color: "rgba(62, 53, 223, 1)" }}>
        Revoke
      </button>
    </div>

    {/* Wallet Value */}
    <div className="d-flex align-items-center mb-3">
      <img
        src="../images/wallet.svg"
        alt="Wallet Icon"
        className="img-fluid me-2"
        style={{ width: "22px", height: "22px" }}
      />
      <span className="fs-5 fw-bold text-dark">286</span>
    </div>

    {/* Reported Row */}
    <div className="d-flex align-items-center gap-4">
      <span className="small text-secondary">Reported</span>
      <span className="fw-semibold text-dark">2</span>
    </div>
  </div>
</div>

      </div>


      <div className="users-container">
        <div className="users-header">
          {/* <h2>Users</h2> */}
          <div className="user-count">
            Trades <span>50</span>
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
            {tradeUsers.map((trade, index) => (
              <tr
                key={index}
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
                <td className="textGrey">{trade.category}</td>
                <td className="textGrey">{trade.service}</td>
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
    </div>
  );
};

export default TradeUserProfile;
