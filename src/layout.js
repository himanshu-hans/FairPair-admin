import React, { useState } from "react";
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div
      className="layout-container"
      style={{ display: "flex", height: "100dvh" }}
    >
      {/* Sidebar */}
      <Sidebar isSdOpen={isSidebarOpen} setIsSdOpen={setIsSidebarOpen} />

      {/* Main content */}
      <div
        className="main-content"
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        {/* Header */}
        <Header isSidebarOpen={isSidebarOpen} />

        {/* Page content */}
        <div
          className="content"
          style={{ padding: "40px 20px", overflowY: "auto", flex: 1 }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
