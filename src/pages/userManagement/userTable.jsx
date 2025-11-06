import React, { useEffect, useState } from "react";
import "../userManagement/users.css";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import UserEditModel from "./userEditModel";
import { get, del } from "../../hooks/services/services";
import { showToast } from "../../components/showToast";

const UserTable = () => {
  const [userEditModalOpen, setUserEditModalOpen] = useState(false);
  const [userList, setUserList] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

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
      showToast("Error fetching users", "error");
      setUserList(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId, username) => {
    // Confirmation dialog
    const confirmDelete = window.confirm(
      `Are you sure you want to delete user "${username}"?`
    );

    if (!confirmDelete) return;

    setLoading(true);
    try {
      const response = await del(`user/${userId}`);

      if (response.status === 200 || response.status === 201) {
        showToast("User deleted successfully!", "success");
        fetchUserList();
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
      showToast(
        error.response?.data?.message || "Error deleting user",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const openModel = (u) => {
    setUserToEdit(u);
    setUserEditModalOpen(true);
  };

  const closeModelAndRefresh = () => {
    setUserEditModalOpen(false);
    setUserToEdit(null);
    fetchUserList(); // Refresh list after editing
  };

  useEffect(() => {
    fetchUserList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <th>Actions</th>
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
                  <td>  
                    <div className="user-info">
                      <img
                        src={u?.profile_image || `images/profile_img.svg`}
                        alt={u?.username || "User"}
                      />
                      <span>{u?.username || "N/A"}</span>
                    </div>
                  </td>

                  <td className="textGrey">{u?.useremail || "N/A"}</td>

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

                  <td className="textGrey">{u?.phoneNumber || "N/A"}</td>
                  <td className="textGrey">{u?.year || "N/A"}</td>

                  <td>
                    <div className="action">
                      <img
                        src="/images/pen_edit.svg"
                        alt="Edit"
                        className="action-icon"
                        onClick={() => openModel(u)}
                        style={{
                          cursor: loading ? "not-allowed" : "pointer",
                          opacity: loading ? 0.5 : 1,
                        }}
                      />
                      <img
                        src="/images/delete.svg"
                        alt="Delete"
                        className="action-icon"
                        onClick={() =>
                          !loading && handleDeleteUser(u.id, u.username)
                        }
                        style={{
                          cursor: loading ? "not-allowed" : "pointer",
                          opacity: loading ? 0.5 : 1,
                        }}
                      />
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

      <UserEditModel
        setUserEditModalOpen={setUserEditModalOpen}
        userEditModalOpen={userEditModalOpen}
        userToEdit={userToEdit}
        onClose={closeModelAndRefresh}
        refreshUserList={fetchUserList}
      />
    </>
  );
};

export default UserTable;
