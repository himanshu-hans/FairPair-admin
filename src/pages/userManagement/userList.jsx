import React, { useState } from "react";

// import RequestsTab from "./RequestTabs";
import "../userManagement/users.css";
import UserTable from "./userTable";
import ReportTable from "./reportTable";
import RequestTable from "./requestTable";

const UserList = () => {
  const [activeTab, setActiveTab] = useState("Users");

  const renderContent = () => {
    switch (activeTab) {
      case "Users":
        return <UserTable/>;
      case "Requests":
        return <RequestTable/>;
      case "Reported":
        return <ReportTable/>;
      default:
        return <div className="tab-content-box">Select a tab</div>;
    }
  };

  return (
    <div className="user-tabs-wrapper">
      {/* Tab buttons */}
      <div className="tabs-header">
        {["Users", "Requests", "Reported"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {renderContent()}
    </div>
  );
};

export default UserList;
