import React, { useState } from 'react';
import './users.css';

const requests = [
  { name: 'Kwame Nkrumah', email: 'olivia@untitledui.com', phone: '+21 7347634767', year: '2nd' },
  { name: 'Amina Jalloh', email: 'phoenix@untitledui.com', phone: '+21 7347634768', year: '1st' },
  { name: 'Thandiwe Moyo', email: 'lana@untitledui.com', phone: '+21 7347634769', year: '4th' },
  { name: 'Fatoumata Diallo', email: 'demi@untitledui.com', phone: '+21 7347634770', year: '2nd' },
  { name: 'Dakarai Nyasha', email: 'candice@untitledui.com', phone: '+21 7347634771', year: '1st' },
  { name: 'Sipho Ndlela', email: 'natali@untitledui.com', phone: '+21 7347634772', year: '3rd' },
  { name: 'Yaa Asantewaa', email: 'drew@untitledui.com', phone: '+21 7347634773', year: '4th' },
  { name: 'Chinua Achebe', email: 'orlando@untitledui.com', phone: '+21 7347634774', year: '4th' },
  { name: 'Zuri Mthethwa', email: 'andi@untitledui.com', phone: '+21 7347634775', year: '2nd' },
  { name: 'Lola Abiola', email: 'kate@untitledui.com', phone: '+21 7347634776', year: '2nd' }
];

function RequestTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests = requests.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(requests.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="users-container">
        <div className="users-header">
            {/* <h2>Users</h2> */}
            <div className="user-count">
              Registration Requests <span>10</span>
            </div>
          </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email address</th>
            <th>Phone number</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRequests.map((request, index) => (
            <tr key={index}>
              <td>
                    <div className="user-info">
                      <img
                        src={`https://i.pravatar.cc/40?img=${index + 10}`}
                        alt={request.name}
                      />
                      <span>{request.name}</span>
                    </div>
              </td>
              <td>{request.email}</td>
              <td>{request.phone}</td>
              <td>{request.year}</td>
             <td>
                <div className="action-buttons">
                    <button className="accept-btn">Accept</button>
                    <button className="reject-btn">Reject</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={prevPage} className="page-btn">Previous</button>
        <span className="page-numbers">{currentPage}</span>
        <button onClick={nextPage} className="page-btn">Next</button>
      </div>
    </div>
  );
}

export default RequestTable;