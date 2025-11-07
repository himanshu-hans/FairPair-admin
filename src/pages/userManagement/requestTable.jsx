import React, { useEffect, useState } from "react";
import "./users.css";
import { get, patch } from "../../hooks/services/services";
import { showToast } from "../../components/showToast";

function RequestTable() {
  const [userRequestList, setUserRequestList] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const nextPage = () => {
    if (currentPage < userRequestList?.totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const fetchUserRequestList = async () => {
    setLoading(true);
    try {
      const response = await get(`user/all_users_Request?page=${currentPage}`);
      
      if (response.status === 200 || response.status === 201) {
        setUserRequestList(response.data?.data || response?.data);
      }
    } catch (error) {
      console.error("Error fetching user requests:", error.message);
      showToast(error.response?.data?.message || error.response?.message || error.message || "Error fetching user requests", "error");
      setUserRequestList(null);
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (userId, status) => {
    setLoading(true);
    try {
      const payload = {
        status: status,
      };

      const response = await patch(`user/registration_request/${userId}`, payload);

      if (response.status === 200 || response.status === 201) {
        showToast(
          `User ${status === "approved" ? "accepted" : "rejected"} successfully!`,
          "success"
        );
        fetchUserRequestList();
      }
    } catch (error) {
      console.error(`Error updating request status:`, error.message);
      showToast(
        error.response?.data?.message || error.response?.message || error.message || `Error ${status === "approved" ? "accepting" : "rejecting"} user`,
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = (userId) => {
    updateRequestStatus(userId, "approved");
  };

  const handleReject = (userId) => {
    updateRequestStatus(userId, "rejected");
  };

  useEffect(() => {
    fetchUserRequestList();
  }, [currentPage]);

  return (
    <div className="users-container">
      <div className="users-header">
        <div className="user-count">
          Registration Requests <span>{userRequestList?.totalItems || 0}</span>
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
          {loading ? (
            <tr>
              <td colSpan="5" className="text-center text-muted py-4">
                Loading requests...
              </td>
            </tr>
          ) : userRequestList?.users?.length > 0 ? (
            userRequestList.users.map((request, index) => (
              <tr key={request.id || index}>
                <td>
                  <div className="user-info">
                    <img
                      src={request?.profile_image || "images/dummy_image.svg"}
                      alt={request?.username || "User"}
                    />
                    <span>{request?.username || "N/A"}</span>
                  </div>
                </td>
                <td className="textGrey">{request?.useremail || "N/A"}</td>
                <td className="textGrey">{request?.phoneNumber || "N/A"}</td>
                <td className="textGrey">{request?.year || "N/A"}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="accept-btn"
                      onClick={() => handleAccept(request.id)}
                      disabled={loading}
                    >
                      Accept
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleReject(request.id)}
                      disabled={loading}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-muted py-4">
                No Registration Requests Found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button
          className="page-btn"
          onClick={prevPage}
          disabled={currentPage === 1 || loading}
        >
          Previous
        </button>
        <span className="page-numbers">
          {currentPage} / {userRequestList?.totalPages || 1}
        </span>
        <button
          className="page-btn"
          onClick={nextPage}
          disabled={currentPage === userRequestList?.totalPages || loading}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default RequestTable;