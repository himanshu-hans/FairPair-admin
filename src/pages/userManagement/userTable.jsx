import React, { useEffect, useState } from 'react';
import "../userManagement/users.css";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import { fetchDataAuth } from '../../hooks/services/services';
import { useNavigate } from "react-router-dom";
import UserEditModel from "./userEditModel";

const UserTable = () => {
  const navigate = useNavigate();
  const [userEditModalOpen, setUserEditModalOpen] = useState(false);
  const [userList, setUserList] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = userList?.users?.slice(indexOfFirstItem, indexOfLastItem) || [];

  const nextPage = () => {
    if (currentPage < userList?.totalPages) {
      setCurrentPage((currentPage) => currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  };

  const fetchUserList = async () => {
    try {
      const response = await fetchDataAuth(`user/all_users?page=${currentPage}`, navigate);
      if (!response.ok) throw new Error("Failed to fetch data from the server.");
      const getData = await response.json();
      setUserList(getData?.data);
    } catch (error) {
      console.log(error.message);
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
            Total <span>{currentUsers?.length || 0} users</span>
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
            {currentUsers?.length > 0 ? (
              currentUsers.map((u, index) => (
                <tr key={index}>
                  <td>
                    <div className="user-info">
                      <img
                        src={u?.bio || `images/profile_img.svg`}
                        alt={u?.name || "User"}
                      />
                      <span>{u?.name || "N/A"}</span>
                    </div>
                  </td>

                  <td className="textGrey">{u?.useremail || "N/A"}</td>

                  <td>
                    <span
                      className={`status ${
                        u?.registration === "Verified"
                          ? "verified"
                          : u?.registration === "Rejected"
                          ? "rejected"
                          : "pending"
                      }`}
                    >
                      {u?.registration === "Verified" ? (
                        <>
                          <FaCheckCircle color="green" /> Verified
                        </>
                      ) : u?.registration === "Rejected" ? (
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
                        onClick={() => setUserEditModalOpen(true)}
                      />
                      <img
                        src="/images/delete.svg"
                        alt="Delete"
                        className="action-icon"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted py-4">
                  No Users Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button className="page-btn" onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span className="page-numbers">{currentPage}</span>
          <button
            className="page-btn"
            onClick={nextPage}
            disabled={currentPage === userList?.totalPages}
          >
            Next
          </button>
        </div>
      </div>

      <UserEditModel
        setUserEditModalOpen={setUserEditModalOpen}
        userEditModalOpen={userEditModalOpen}
      />
    </>
  );
};

export default UserTable;