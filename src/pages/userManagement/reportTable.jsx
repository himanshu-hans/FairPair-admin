import React, { useEffect, useState } from 'react';
import "../userManagement/users.css";
import { get, patch } from '../../hooks/services/services';
import { showToast } from "../../components/showToast";

const ReportTable = () => {
  const [userReportList, setUserReportList] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState({});

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

  // Get available actions based on current status
  const getActionsForStatus = (status) => {
    const normalizedStatus = status?.toLowerCase();
    
    switch (normalizedStatus) {
      case 'pending':
        return ['Investigate', 'Discard'];
      case 'under review':
        return ['Resolve', 'Dismiss'];
      case 'resolved':
        return ['Reopen'];
      case 'dismissed':
        return ['Reopen'];
      default:
        return ['Investigate', 'Discard']; // Default actions for unknown status
    }
  };

  const handleReportAction = async (reportId, action) => {
    // Set loading for specific report and action
    setActionLoading(prev => ({ ...prev, [`${reportId}-${action}`]: true }));
    
    try {
      const payload = {
        action: action, // Send action as-is (Investigate, Dismiss, Resolve, Reopen)
      };

      const response = await patch(`report-trade/update_report/${reportId}`, payload);

      if (response.status === 200 || response.status === 201) {
        showToast(response?.data?.message || response?.message || "Action completed successfully!", "success");
        fetchUserReportList(); // Refresh the list to get updated statuses
      }
    } catch (error) {
      console.error(`Error updating report:`, error.message);
      showToast(
        error.response?.data?.message || error.response?.message || error.message || "Error processing report",
        "error"
      );
    } finally {
      setActionLoading(prev => ({ ...prev, [`${reportId}-${action}`]: false }));
    }
  };

  const getActionButtonClass = (action) => {
    switch (action.toLowerCase()) {
      case 'investigate':
        return 'action-btn investigate-btn';
      case 'discard':
        return 'action-btn discard-btn';
      case 'resolve':
        return 'action-btn resolved-btn';
      case 'dismiss':
        return 'action-btn dismiss-btn';
      case 'reopen':
        return 'action-btn reopen-btn';
      default:
        return 'action-btn';
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'status-badge status-pending';
      case 'under review':
        return 'status-badge status-under-review';
      case 'resolved':
        return 'status-badge status-resolved';
      case 'dismissed':
        return 'status-badge status-dismissed';
      default:
        return 'status-badge';
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
            <th>Status</th>
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
            userReportList.users.map((report, index) => {
              const availableActions = getActionsForStatus(report?.status);
              
              return (
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
                  <td>
                    <span className={getStatusBadgeClass(report?.status)}>
                      {report?.status || "N/A"}
                    </span>
                  </td>
                  <td className='textGrey'>{formatDate(report?.created_at)}</td>

                  <td className="actions-cell">
                    {availableActions.map((action) => {
                      const isActionLoading = actionLoading[`${report.id}-${action}`];
                      
                      return (
                        <button
                          key={action}
                          className={getActionButtonClass(action)}
                          onClick={() => handleReportAction(report.id, action)}
                          disabled={isActionLoading || loading}
                        >
                          {isActionLoading ? 'Processing...' : action}
                        </button>
                      );
                    })}
                  </td>
                </tr>
              );
            })
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