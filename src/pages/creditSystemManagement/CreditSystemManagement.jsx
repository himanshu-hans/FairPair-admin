import React, { useState } from "react";
import "../tradeAnalytics/trades.css";
import "../userManagement/users.css";
import "../creditSystemManagement/creditSystemManagement.css";

const cardData = [
  {
    count: 27373,
    label: "Credits issued",
    count: "+3",
    change: "Since last month",
    icon: "../images/like.svg",
  },
  {
    count: 4744,
    label: "Referral credits",
    count: "+3",
    change: "Since last month",
    icon: "../images/hand.svg",
  },
  {
    count: 3443,
    label: "Refunded credits",
    count: "+3",
    change: "Since last month",
    icon: "../images/credit.svg",
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

const CreditSystemManagement = () => {

  return (
    <div className="container-fluid dashboard-container">
      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        {cardData.map((card, index) => (
          <div key={index} className="col-md-4">
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

      {/* Graph Block  */}
      <div className="row mb-3">
        <div className="col-md-12">

        <img src="../images/graph.svg" alt="graph icon" className="img-fluid w-100"></img>
        </div>
      </div>


      <div className="users-container mb-3">
        <div className="users-header justify-content-between">
          {/* <h2>Users</h2> */}
          <div className="credit-count">
            Subscribers <span>1241</span> <span>455</span> <span>780</span>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <select className="form-select trade-select">
              <option>STATUS</option>
            </select>
            <select className="form-select trade-select">
              <option>PLAN</option>
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

      <div class="card border-0 shadow-sm p-4 bonus-card">
  <div class="position-relative d-flex justify-content-between align-items-center">
     <h6 class="fw-semibold mb-3">Bonus Credit Overview</h6>
    <div class="badge bg-warning text-dark position-absolute top-0 end-0 px-3 py-2">
      Credits issued <strong>2000</strong>
    </div>
  </div>

  <div class="row">
    <div class="col-md-4 d-flex flex-column align-items-center justify-content-center text-center chart-box">
      <div class="chart-circle mb-2">
        <div class="chart-inner">2394</div>
      </div>

      <div class="d-flex justify-content-center gap-3 mt-2 stats">
        <div><span class="dot dot-1"></span>22 <small>1st</small></div>
        <div><span class="dot dot-2"></span>15 <small>2nd</small></div>
        <div><span class="dot dot-3"></span>170 <small>3rd</small></div>
        <div><span class="dot dot-4"></span>450 <small>4th</small></div>
      </div>
    </div>

    <div class="col-md-8">
      <h6 class="top-heading-text mb-4">
        Top 3 leaders in referrals
      </h6>

      <div class="d-flex  flex-wrap gap-3">
        <div class="leader-card text-center p-3">
          <div class="d-inline-block">
            <img src="../images/profile-img.svg" class="rounded-circle border border-3 border-warning" alt="leader" />
            <span class="rank-badge bg-warning text-dark">1st</span>
          </div>
          <h6 class="mt-2 mb-1 fw-semibold">Ratna <span class="badge bg-success">+5</span></h6>
          <p class="mb-0 fw-bold">14 referrals</p>
        </div>

        <div class="leader-card text-center p-3">
          <div class="d-inline-block">
            <img src="../images/profile-img.svg" class="rounded-circle border border-3 border-warning" alt="leader" />
            <span class="rank-badge bg-warning text-dark">2nd</span>
          </div>
          <h6 class="mt-2 mb-1 fw-semibold">Sari <span class="badge bg-success">+8</span></h6>
          <p class="mb-0 fw-bold">20 referrals</p>
        </div>

        <div class="leader-card text-center p-3">
          <div class="d-inline-block">
            <img src="../images/profile-img.svg" class="rounded-circle border border-3 border-warning" alt="leader" />
            <span class="rank-badge bg-warning text-dark">3rd</span>
          </div>
          <h6 class="mt-2 mb-1 fw-semibold">Ali <span class="badge bg-success">+10</span></h6>
          <p class="mb-0 fw-bold">25 referrals</p>
        </div>
      </div>
    </div>
  </div>
</div>



    </div>
  );
};

export default CreditSystemManagement;
