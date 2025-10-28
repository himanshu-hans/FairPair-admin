import React, { useEffect, useState } from "react";
import "./users.css";
import { fetchDataAuth } from "../../hooks/services/services";
import { useNavigate } from "react-router-dom";

function RequestTable() {
  const navigate = useNavigate();
  const [userRequestList, setUserRequestList] = useState({ users: [] });
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = userRequestList?.users?.slice(indexOfFirstItem, indexOfLastItem) || [];

  const nextPage = () => {
    if (currentPage < userRequestList?.totalPages) {
      setCurrentPage((currentPage)=>currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((currentPage)=>currentPage - 1);
    }
  };

  const fetchUserRequestList = async () => {
    try {
      const response = await fetchDataAuth(
        `user/all_users_Request?page=${currentPage}`,
        navigate
      );

      if (!response?.ok && !response?.data)
        throw new Error("Failed to fetch data from server.");

      const getData = await response?.json();
      setUserRequestList(getData?.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUserRequestList();
  }, [currentPage]);


  return (
    <div className="users-container">
      <div className="users-header">
        <div className="user-count">
          Registration Requests <span>{currentUsers?.length || 0}</span>
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
          {currentUsers?.length > 0 ? (
            currentUsers?.map((request, index) => (
              <tr key={request.id || index}>
                <td>
                  <div className="user-info">
                    <img
                      src={`https://i.pravatar.cc/40?img=${index + 10}`}
                      alt={request?.username || "user"}
                    />
                    <span>{request?.username || "N/A"}</span>
                  </div>
                </td>
                <td>{request?.useremail}</td>
                <td>{request?.phoneNumber || "—"}</td>
                <td>{request?.year || "—"}</td>
                <td>
                  <div className="action-buttons">
                    <button className="accept-btn">Accept</button>
                    <button className="reject-btn">Reject</button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-muted py-4">
                No Registration Requests Found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={prevPage}
          className="page-btn"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="page-numbers">{currentPage}</span>
        <button
          onClick={nextPage}
          className="page-btn"
          disabled={currentPage === userRequestList?.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default RequestTable;
