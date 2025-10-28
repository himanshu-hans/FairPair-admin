import React, { useEffect, useState } from 'react';
import "../userManagement/users.css";
import { fetchDataAuth } from '../../hooks/services/services';
import { useNavigate } from "react-router-dom";

const reportData = [
  { by: 'Kwame Nkrumah', against: 'Kwame Nkrumah', reason: 'Spam', raisedOn: '29 Jun 2:00 PM', actions: ['Investigate', 'Discard'] },
  { by: 'Amina Jalloh', against: 'Amina Jalloh', reason: 'Fraud', raisedOn: '3 Jul 6:00 PM', actions: ['Investigate', 'Discard'] },
  { by: 'Thandiwe Moyo', against: 'Thandiwe Moyo', reason: 'Bullying', raisedOn: '4 Jul 7:00 PM', actions: ['Investigate', 'Discard'] },
  { by: 'Fatoumata Diallo', against: 'Fatoumata Diallo', reason: 'Reason not listed here', raisedOn: '2 Jul 5:00 PM', actions: ['Resolved'] },
  { by: 'Dakarai Nyasha', against: 'Dakarai Nyasha', reason: 'Fraud', raisedOn: '5 Jul 8:00 PM', actions: ['Investigate', 'Discard'] },
  { by: 'Sipho Ndlela', against: 'Sipho Ndlela', reason: 'Spam', raisedOn: '1 Jul 4:00 PM', actions: ['Investigate', 'Discard'] },
  { by: 'Yaa Asantewaa', against: 'Yaa Asantewaa', reason: 'Bullying', raisedOn: '6 Jul 9:00 PM', actions: ['Investigate', 'Discard'] },
  { by: 'Chinua Achebe', against: 'Chinua Achebe', reason: 'Fraud', raisedOn: '30 Jun 3:00 PM', actions: ['Investigate', 'Discard'] },
  { by: 'Zuri Mthethwa', against: 'Zuri Mthethwa', reason: 'Bullying', raisedOn: '7 Jul 10:00 PM', actions: ['Investigate', 'Discard'] },
  { by: 'Lola Abiola', against: 'Lola Abiola', reason: 'Spam', raisedOn: '29 Jun 2:00 PM', actions: ['Investigate', 'Discard'] },
];

const ReportTable = () => {
const navigate = useNavigate()
  const [userReportList, setUserReportList] = useState()
   const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 1;


      const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests = userReportList?.users?.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < userReportList?.totalPages){
      setCurrentPage((currentPage)=>currentPage + 1);
    }
  };
console.log(userReportList?.users,"reportlist")
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((currentPage)=>currentPage - 1);
    }
  };

    const getActionButtonClass = (action) => {
    switch (action) {
      case 'Investigate':
        return 'action-btn investigate-btn';
      case 'Discard':
        return 'action-btn discard-btn';
      case 'Resolved':
        return 'action-btn resolved-btn';
      default:
        return 'action-btn';
    }
  };

   const fetchUserReportList = async () => {
      try {
        const response = await fetchDataAuth(
          `report-trade/all_report?page=${currentPage}`,
          navigate
        );
        if (!response.ok)
          throw new Error("Failed to fetch data from the server.");
        const getData = await response.json();
        setUserReportList(getData?.data)
      } catch (error) {
        console.log(error.message);
      }
    };
  

  
    useEffect(() => {
      fetchUserReportList()
    }, [currentPage])
  
  return (
    <div className="users-container">
          <div className="users-header">
            {/* <h2>Users</h2> */}
            <div className="user-count">
              Reports Raised <span>10</span>
            </div>
          </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>By</th>
            <th>Against</th>
            <th>Reason</th>
            <th>Raised On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((report, index) => (
            <tr key={index}>
                <td>
                    <div className="user-info">
                      <img
                        src={`https://i.pravatar.cc/40?img=${index + 10}`}
                        alt={report.by}
                      />
                      <span>{report.by}</span>
                    </div>
                </td>
                <td>
                    <div className="user-info">
                      <img
                        src={`https://i.pravatar.cc/40?img=${index + 10}`}
                        alt={report.against}
                      />
                      <span>{report.against}</span>
                    </div>
                </td>
              <td className='textGrey'>{report.reason}</td>
              <td className='textGrey'>{report.raisedOn}</td>
             <td className="actions-cell">
                {report.actions.map((action, i) => (
                  <button
                    key={i}
                    className={getActionButtonClass(action)}
                  >
                    {action}
                  </button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

        <div className="pagination">
            <button className="page-btn" onClick={prevPage}>Previous</button>
            <span className="page-numbers">{currentPage}</span>
            <button className="page-btn" onClick={nextPage}>Next</button>
          </div>
    </div>
  );
};

export default ReportTable;