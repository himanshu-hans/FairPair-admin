import React from 'react'
import "../userManagement/users.css";
import { FaCheckCircle} from "react-icons/fa";


 const users = [
    {
      name: "Kwame Nkrumah",
      email: "olivia@untitledui.com",
      registration: "Verified",
      phone: "+217347634767",
      year: "2nd",
    },
    {
      name: "Amina Jalloh",
      email: "phoenix@untitledui.com",
      registration: "In progress",
      phone: "+217347634768",
      year: "1st",
    },
    {
      name: "Thandiwe Moyo",
      email: "lana@untitledui.com",
      registration: "Verified",
      phone: "+217347634769",
      year: "4th",
    },
    {
      name: "Thandiwe Moyo",
      email: "lana@untitledui.com",
      registration: "Verified",
      phone: "+217347634769",
      year: "4th",
    },
    {
      name: "Thandiwe Moyo",
      email: "lana@untitledui.com",
      registration: "In progress",
      phone: "+217347634769",
      year: "4th",
    },
    {
      name: "Thandiwe Moyo",
      email: "lana@untitledui.com",
      registration: "Verified",
      phone: "+217347634769",
      year: "4th",
    },
    {
      name: "Thandiwe Moyo",
      email: "lana@untitledui.com",
      registration: "Verified",
      phone: "+217347634769",
      year: "4th",
    },
    {
      name: "Thandiwe Moyo",
      email: "lana@untitledui.com",
      registration: "In progress",
      phone: "+217347634769",
      year: "4th",
    },
    {
      name: "Thandiwe Moyo",
      email: "lana@untitledui.com",
      registration: "Verified",
      phone: "+217347634769",
      year: "4th",
    },
    {
      name: "Thandiwe Moyo",
      email: "lana@untitledui.com",
      registration: "In progress",
      phone: "+217347634769",
      year: "4th",
    },
  ];
  
const UserTable = () => {
  return (
       <div className="users-container">
          <div className="users-header">
            {/* <h2>Users</h2> */}
            <div className="user-count">
              Total <span>100 users</span>
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
              {users.map((u, index) => (
                <tr key={index}>
                  <td>
                    <div className="user-info">
                      <img
                        src={`https://i.pravatar.cc/40?img=${index + 10}`}
                        alt={u.name}
                      />
                      <span>{u.name}</span>
                    </div>
                  </td>
                  <td className="textGrey">{u.email}</td>
                  <td>
                    <span
                      className={`status ${
                        u.registration === "Verified" ? "verified" : "in-progress"
                      }`}
                    >
                      {u.registration === "Verified" ? (
                        <>
                          <FaCheckCircle /> Verified
                        </>
                      ) : (
                        "In progress"
                      )}
                    </span>
                  </td>
                  <td className="textGrey">{u.phone}</td>
                  <td className="textGrey">{u.year}</td>
                  <td>
                    <div className="action">
                      <img
                        src="/images/pen_edit.svg"
                        alt="Edit"
                        className="action-icon"
                      />
                      <img
                        src="/images/delete.svg"
                        alt="Delete"
                        className="action-icon"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
    
          <div className="pagination">
            <button className="page-btn">Previous</button>
            <span className="page-numbers">1 2 3 ... 10</span>
            <button className="page-btn">Next</button>
          </div>
        </div>
  )
}

export default UserTable