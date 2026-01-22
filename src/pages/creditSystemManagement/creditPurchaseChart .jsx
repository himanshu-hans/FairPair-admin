import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const CreditPurchaseChart = ({ chartData, totals, selectedYear, onYearChange, yearOptions }) => {

  // Custom legend component
  const CustomLegend = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        gap: "20px",
        marginBottom: "20px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: "#00BFA6",
          }}
        />
        <span style={{ fontSize: "14px", color: "#425466" }}>Bronze</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: "#9C27B0",
          }}
        />
        <span style={{ fontSize: "14px", color: "#425466" }}>Silver</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: "#616161",
          }}
        />
        <span style={{ fontSize: "14px", color: "#425466" }}>Gold</span>
      </div>
    </div>
  );

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>
            Credit Purchase Overview
          </h3>
          {/* Total badges */}
          <div style={{ display: "flex", gap: "8px" }}>
            <span
              style={{
                backgroundColor: "#00BFA6",
                color: "white",
                padding: "4px 12px",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              {totals?.totalBronze || 0}
            </span>
            <span
              style={{
                backgroundColor: "#9C27B0",
                color: "white",
                padding: "4px 12px",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              {totals?.totalSilver || 0}
            </span>
            <span
              style={{
                backgroundColor: "#616161",
                color: "white",
                padding: "4px 12px",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              {totals?.totalGold || 0}
            </span>
          </div>
        </div>

        {/* Timeframe selector */}
        <select
          value={selectedYear}
          onChange={(e) => onYearChange(e.target.value)}
          style={{
            padding: "8px 32px 8px 16px",
            borderRadius: "8px",
            border: "1px solid #E5E7EB",
            fontSize: "14px",
            fontWeight: "500",
            backgroundColor: "white",
            cursor: "pointer",
            outline: "none",
          }}
        >
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Legend */}
      <CustomLegend />

      {/* Chart */}
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#F3F4F6"
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#1A1A1AA3", fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#1A1A1AA3", fontSize: 12 }}
            ticks={[0, 100, 300, 500, 700, 900, 1200]}
            domain={[0, 1200]}
          />
          <Bar
            dataKey="Bronze"
            fill="#00BFA6"
            radius={[8, 8, 0, 0]}
            maxBarSize={20}
          />
          <Bar
            dataKey="Silver"
            fill="#9C27B0"
            radius={[8, 8, 0, 0]}
            maxBarSize={20}
          />
          <Bar
            dataKey="Gold"
            fill="#616161"
            radius={[8, 8, 0, 0]}
            maxBarSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CreditPurchaseChart;
