import React, { useEffect, useState } from 'react';
import "../userManagement/users.css";
import { get, patch } from '../../hooks/services/services';
import { showToast } from "../../components/showToast";

const ReportTable = () => {
  const [userReportList, setUserReportList] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const nextPage = () => {
    if (currentPage < userReportList?.totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const fetchUserReportList = async () => {
    setLoading(true);
    try {
      const response = await get(`report-trade/all_report?page=${currentPage}`);

      if (response.status === 200 || response.status === 201) {
        setUserReportList(response.data?.data);
      }
    } catch (error) {
      console.error("Error fetching reports:", error.message);
      showToast(error.response?.data?.message || error.response?.message || error.message || "Error fetching reports", "error");
      setUserReportList(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReportAction = async (reportId, action) => {
    setLoading(true);
    try {
      const payload = {
        status: action.toLowerCase(), // "investigate", "discard", or "resolved"
      };

      const response = await patch(`report-trade/${reportId}`, payload);

      if (response.status === 200 || response.status === 201) {
        showToast(response?.data?.message || response?.message || "Reported successfully!", "success");
        fetchUserReportList();
      }
    } catch (error) {
      console.error(`Error updating report:`, error.message);
      showToast(
        error.response?.data?.message || error.response?.message || error.message || "Error processing report",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const getActionButtonClass = (action) => {
    switch (action.toLowerCase()) {
      case 'investigate':
        return 'action-btn investigate-btn';
      case 'discard':
        return 'action-btn discard-btn';
      case 'resolved':
        return 'action-btn resolved-btn';
      default:
        return 'action-btn';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  useEffect(() => {
    fetchUserReportList();
  }, [currentPage]);

  return (
    <div className="users-container">
      <div className="users-header">
        <div className="user-count">
          Reports Raised <span>{userReportList?.totalItems || 0}</span>
        </div>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>Reported By</th>
            <th>Reported Against</th>
            <th>Reason</th>
            <th>Comments</th>
            <th>Raised On</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center text-muted py-4">
                Loading reports...
              </td>
            </tr>
          ) : userReportList?.users?.length > 0 ? (
            userReportList.users.map((report, index) => (
              <tr key={report.id || index}>
                <td>
                  <div className="user-info">
                    <img
                      src={report?.reportedByProfileImage || "images/dummy_image.svg"}
                      alt={report?.reportedBy || "User"}
                    />
                    <span>{report?.reportedBy || "N/A"}</span>
                  </div>
                </td>

                <td>
                  <div className="user-info">
                    <img
                      src={report?.reportedAgainstProfileImage || "images/dummy_image.svg"}
                      alt={report?.reportedAgainst || "User"}
                    />
                    <span>{report?.reportedAgainst || "N/A"}</span>
                  </div>
                </td>

                <td className='textGrey'>{report?.report || "N/A"}</td>
                <td className='textGrey'>{report?.comments || "N/A"}</td>
                <td className='textGrey'>{formatDate(report?.created_at)}</td>

                <td className="actions-cell">
                  {report?.status === 'resolved' ? (
                    <button className={getActionButtonClass('resolved')} disabled>
                      Resolved
                    </button>
                  ) : (
                    <>
                      <button
                        className={getActionButtonClass('investigate')}
                        onClick={() => handleReportAction(report.id, 'investigate')}
                        disabled={loading}
                      >
                        Investigate
                      </button>
                      <button
                        className={getActionButtonClass('discard')}
                        onClick={() => handleReportAction(report.id, 'discard')}
                        disabled={loading}
                      >
                        Discard
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted py-4">
                No Reports Found.
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
          {currentPage} / {userReportList?.totalPages || 1}
        </span>
        <button
          className="page-btn"
          onClick={nextPage}
          disabled={currentPage === userReportList?.totalPages || loading}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReportTable;
