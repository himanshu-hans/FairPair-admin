import React, { useEffect, useState } from "react";
import "../userManagement/users.css";
import { FaCheckCircle, FaClock, FaTimesCircle, FaTimes } from "react-icons/fa";
import { get, patch } from "../../hooks/services/services";
import { showToast } from "../../components/showToast";
import { useNavigate } from "react-router-dom";

const UserTable = () => {
  const [userList, setUserList] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [userToAction, setUserToAction] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const navigate = useNavigate();

  const nextPage = () => {
    if (currentPage < userList?.totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const fetchUserList = async () => {
    setLoading(true);
    try {
      const response = await get(`user/all_users?page=${currentPage}`);

      if (response.status === 200 || response.status === 201) {
        setUserList(response.data?.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error.message);
      showToast(
        error.response?.data?.message ||
          error.response?.message ||
          error.message ||
          "Error fetching users",
        "error"
      );
      setUserList(null);
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (user) => {
    setUserToAction(user);
    setIsActionModalOpen(true);
  };

  const closeModal = () => {
    if (!actionLoading) {
      setIsActionModalOpen(false);
      setUserToAction(null);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("delete-modal-overlay")) {
      closeModal();
    }
  };

  const confirmAction = async () => {
    if (!userToAction) return;

    setActionLoading(true);
    try {
      const response = await patch(`user/toggle-suspend/${userToAction.id}`, {
        suspend: userToAction.isSuspended ? "false" : "true",
      });

      if (response.status === 200 || response.status === 201) {
        showToast(
          `User ${
            userToAction.isSuspended ? "reactivated" : "suspended"
          } successfully`,
          "success"
        );
        fetchUserList();
      }
    } catch (error) {
      console.error("Error toggling user status:", error.message);
      showToast(
        error.response?.data?.message ||
          error.response?.message ||
          error.message ||
          "Error updating user status",
        "error"
      );
    } finally {
      setActionLoading(false);
      setIsActionModalOpen(false);
      setUserToAction(null);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, [currentPage]);

  return (
    <>
      <div className="users-container">
        <div className="users-header">
          <div className="user-count">
            Total <span>{userList?.totalItems || 0} users</span>
          </div>
        </div>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email address</th>
              <th>Registration</th>
              <th>Phone number</th>
              <th>Year</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">
                  Loading users...
                </td>
              </tr>
            ) : userList?.users?.length > 0 ? (
              userList.users.map((u, index) => (
                <tr key={u.id || index}>
                  <td
                    onClick={() =>
                      navigate("/trade-user-profile", {
                        state: { userId: u.id },
                      })
                    }
                    className="clickable-row"
                  >
                    <div className="user-info">
                      <img
                        src={u?.profile_image || "images/dummy_image.svg"}
                        alt={u?.username || "User"}
                      />
                      <span>
                        {u?.username || u?.useremail
                          ? u.useremail.slice(0, 2).toUpperCase() : ""}
                      </span>
                    </div>
                  </td>

                  <td className="textGrey">{u?.useremail || "-"}</td>

                  <td>
                    <span
                      className={`status ${
                        u?.isProfileVerified === "verified"
                          ? "verified"
                          : u?.isProfileVerified === "rejected"
                          ? "rejected"
                          : "pending"
                      }`}
                    >
                      {u?.isProfileVerified === "verified" ? (
                        <>
                          <FaCheckCircle color="green" /> Verified
                        </>
                      ) : u?.isProfileVerified === "rejected" ? (
                        <>
                          <FaTimesCircle color="red" /> Rejected
                        </>
                      ) : (
                        <>
                          <FaClock color="orange" /> Pending
                        </>
                      )}
                    </span>
                  </td>

                  <td className="textGrey">{u?.phoneNumber || "-"}</td>
                  <td className="textGrey">{u?.year || "-"}</td>

                  <td>
                    <div className="action">
                      {u?.isSuspended ? (
                        <img
                          src="/images/re_activate_user.svg"
                          alt="Reactivate"
                          className="action-icon"
                          onClick={() => handleActionClick(u)}
                          style={{
                            cursor: actionLoading ? "not-allowed" : "pointer",
                            opacity: actionLoading ? 0.5 : 1,
                          }}
                        />
                      ) : (
                        <img
                          src="/images/suspend_user.svg"
                          alt="Suspend"
                          className="action-icon"
                          onClick={() => handleActionClick(u)}
                          style={{
                            cursor: actionLoading ? "not-allowed" : "pointer",
                            opacity: actionLoading ? 0.5 : 1,
                          }}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">
                  No Users Found.
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
            {currentPage} / {userList?.totalPages || 1}
          </span>
          <button
            className="page-btn"
            onClick={nextPage}
            disabled={currentPage === userList?.totalPages || loading}
          >
            Next
          </button>
        </div>
      </div>

      {/* Suspend/Reactivate Modal */}
      {isActionModalOpen && userToAction && (
        <div className="delete-modal-overlay" onClick={handleOverlayClick}>
          <div className="delete-modal-content">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h3 className="delete-modal-title m-0">
                {userToAction.isSuspended ? "Reactivate User" : "Suspend User"}
              </h3>
              <button
                onClick={closeModal}
                disabled={actionLoading}
                className="modal-cross-button"
                onMouseEnter={(e) =>
                  !actionLoading && (e.target.style.color = "#374151")
                }
                onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
              >
                <FaTimes />
              </button>
            </div>

            <p className="delete-modal-message">
              Are you sure you want to{" "}
              {userToAction.isSuspended ? "reactivate" : "suspend"}{" "}
              <strong>{userToAction.username}</strong>?
            </p>

            <div className="delete-modal-actions">
              <button
                onClick={closeModal}
                className="delete-modal-button delete-modal-button-cancel"
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className="delete-modal-button delete-modal-button-confirm"
                disabled={actionLoading}
                style={{
                  backgroundColor: userToAction.isSuspended
                    ? "#3e35dfff"
                    : "#d32f2f",
                }}
              >
                {actionLoading
                  ? "Processing..."
                  : userToAction.isSuspended
                  ? "Reactivate"
                  : "Suspend"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserTable;
