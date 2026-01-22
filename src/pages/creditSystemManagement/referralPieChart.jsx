import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "../creditSystemManagement/creditSystemManagement.css";

const ReferralPieChart = ({ chartData, loading }) => {
  // Define colors matching your CSS
  const COLORS = ["#6258e8", "#fbbf24", "#34d399", "#f87171"];

  // Transform the API data for Recharts
  const pieData =
    chartData?.breakdown?.map((item, index) => ({
      name: item.year,
      value: item.count,
      color: COLORS[index % COLORS.length],
    })) || [];

  const total = chartData?.total || 0;

  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center chart-box">
      <div className="mb-1 w-100 d-flex justify-content-start align-items-center pie-chart-class-year-text">
        Class/Year
      </div>

      <div style={{ position: "relative", width: 120, height: 120 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={53}
              dataKey="value"
              startAngle={90}
              endAngle={450}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`${entry.color}CC`} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center text */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontWeight: 700,
            fontSize: "16px",
            color: "#1A1A1A",
          }}
        >
          {loading ? "..." : total}
        </div>
      </div>

      <div className="w-100 d-flex justify-content-between gap-3 mt-1 stats">
        {loading ? (
          <div className="text-muted">Loading...</div>
        ) : pieData.length > 0 ? (
          pieData.map((item, index) => (
            <div key={index} className="d-flex justify-content-center align-items-center">
              <div>
                <span
                  className="dot"
                  style={{
                    display: "inline-block",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: item.color,
                    marginRight: "4px",
                    opacity: "0.7",
                  }}
                ></span>
              </div>
              <div className="d-flex flex-column justify-content-center align-items-between gap-2 class-text-piechart">
                <span>{item.value}</span>
                <span className="year-text-piechart">
                  <small className="fs-15">{item.name}</small>
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-muted">No data</div>
        )}
      </div>
    </div>
  );
};

export default ReferralPieChart;
