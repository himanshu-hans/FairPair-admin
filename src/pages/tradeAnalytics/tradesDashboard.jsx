import React, { useState } from 'react';

// Sample static data
const tradesData = [
  {
    tradeId: 394048,
    tradeBy: 'Chinua Achebe',
    tradeWith: 'Nelson Mandela',
    category: 'Technology',
    dateTime: '29 Jan, 2:00 PM',
    status: 'Pending'
  },
  {
    tradeId: 674849,
    tradeBy: 'Wangari Maathai',
    tradeWith: 'Wangari Maathai',
    category: 'Wellness',
    dateTime: '30 Jul, 6:00 PM',
    status: 'Active'
  },
  {
    tradeId: 562341,
    tradeBy: 'Nelson Mandela',
    tradeWith: 'Chinua Achebe',
    category: 'Finance',
    dateTime: '2 Jul, 5:00 PM',
    status: 'Completed'
  },
  {
    tradeId: 456488,
    tradeBy: 'Miriam Makeba',
    tradeWith: 'Xen Asenwene',
    category: 'Education',
    dateTime: '16 Mar, 4:14 PM',
    status: 'Cancelled'
  },
  {
    tradeId: 778323,
    tradeBy: 'Biko Tambo',
    tradeWith: 'Haile Selassie',
    category: 'Travel',
    dateTime: '12 Oct, 11:22 AM',
    status: 'Reported'
  },
  {
    tradeId: 892201,
    tradeBy: 'Aminatta Forna',
    tradeWith: 'Desmond Tutu',
    category: 'Food & Beverage',
    dateTime: '3 Aug, 1:50 PM',
    status: 'Active'
  },
  {
    tradeId: 932174,
    tradeBy: 'Ayaan Hirsi Ali',
    tradeWith: 'Miriam Makeba',
    category: 'Entertainment',
    dateTime: '5 Aug, 11:30 AM',
    status: 'Pending'
  }
];

// Helper for status color
const statusClasses = {
  Pending: 'badge bg-secondary',
  Active: 'badge bg-info',
  Completed: 'badge bg-success',
  Cancelled: 'badge bg-warning',
  Reported: 'badge bg-danger'
};

// Dashboard Info Cards (top section)
function InfoCards() {
  return (
    <div className="row g-3 mb-4">
      <div className="col-md-3 col-6">
        <div className="card text-center p-3">
          <h4>2000</h4>
          <span>Completed trades</span>
          <div className="text-success small">+3 Since last month</div>
        </div>
      </div>
      <div className="col-md-3 col-6">
        <div className="card text-center p-3">
          <h4>30</h4>
          <span>Active trades</span>
          <div className="text-success small">+3 Since last month</div>
        </div>
      </div>
      <div className="col-md-3 col-6">
        <div className="card text-center p-3">
          <h4>8</h4>
          <span>Pending trades</span>
          <div className="text-success small">+3 Since last month</div>
        </div>
      </div>
      <div className="col-md-3 col-6">
        <div className="card text-center p-3">
          <h4>16</h4>
          <span>Disputes</span>
          <div className="text-success small">+3 Since last month</div>
        </div>
      </div>
    </div>
  );
}

// Filters UI (non-functional)
function FiltersBar() {
  return (
    <div className="d-flex flex-wrap gap-2 mb-3">
      <select className="form-select w-auto">
        <option>From</option>
      </select>
      <select className="form-select w-auto">
        <option>To</option>
      </select>
      <select className="form-select w-auto">
        <option>Skill</option>
      </select>
      <select className="form-select w-auto">
        <option>Status</option>
      </select>
      <select className="form-select w-auto">
        <option>Category</option>
      </select>
      <button className="btn btn-primary ms-auto">Export</button>
    </div>
  );
}

// Pagination UI-only
function Pagination({ page, setPage, totalPages }) {
  return (
    <nav>
      <ul className="pagination justify-content-end">
        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => setPage(page - 1)}>Previous</button>
        </li>
        {[...Array(totalPages)].map((_, idx) => (
          <li key={idx} className={`page-item ${page === idx + 1 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => setPage(idx + 1)}>{idx + 1}</button>
          </li>
        ))}
        <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => setPage(page + 1)}>Next</button>
        </li>
      </ul>
    </nav>
  );
}

function TradesTable({ trades }) {
  return (
    <table className="table table-hover align-middle rounded-3 overflow-hidden">
      <thead className="table-light">
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
        {trades.map((trade, idx) => (
          <tr key={trade.tradeId}>
            <td>{trade.tradeId}</td>
            <td>{trade.tradeBy}</td>
            <td>{trade.tradeWith}</td>
            <td>{trade.category}</td>
            <td>{trade.dateTime}</td>
            <td><span className={statusClasses[trade.status]}>{trade.status}</span></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function TradesDashboard() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 7;
  const totalPages = 8; // Example static, can change

  // Static paginated data for demo, all on page 1 for UI
  const paginatedData = tradesData; // implement slice for real data if needed

  return (
    <div className="container my-4">
      <InfoCards />
      <FiltersBar />
      <div className="d-flex align-items-center mb-2">
        <h5 className="mb-0">Trades <span className="badge bg-warning text-dark ms-1">50</span></h5>
        <div className="ms-auto">
          <select className="form-select form-select-sm w-auto">
            <option>WEEKLY</option>
          </select>
        </div>
      </div>
      <TradesTable trades={paginatedData} />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
}
