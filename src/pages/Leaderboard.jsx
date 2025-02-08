// import React from "react"


// const Leaderboard = () => {
//     return(
//         <h1>Leaderboard Page</h1>
//     )
// }

// export default Leaderboard;

import React, { useState } from "react";
import "./Portfolio.css"; 

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend
);

const PortfolioChart = ({ dataPoints }) => {
  if (!Array.isArray(dataPoints) || dataPoints.length === 0) {
    return <p>Loading data or no portfolio data available.</p>;
  }
    

  const data = {
    labels: dataPoints.map((point) => point.date),
    datasets: [
      {
        label: "Portfolio Value ($)",
        data: dataPoints.map((point) => ({ x: point.date, y: point.value })),
        borderColor: "#4A90E2",
        backgroundColor: "rgba(74, 144, 226, 0.2)",
        borderWidth: 2,
        pointRadius: 3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Portfolio Value ($)",
        },
        suggestedMin: Math.min(...dataPoints.map((point) => point.value)) * 0.9, // 10% lower
        suggestedMax: Math.max(...dataPoints.map((point) => point.value)) * 1.1, // 10% higher
      },
    },
  };
  

  return <Line data={data} options={options} />;
};

const sampleData = [
    { date: "2024-01-01", value: 10000 },
    { date: "2024-02-01", value: 10500 },
    { date: "2024-03-01", value: 10200 },
    { date: "2024-04-01", value: 11000 },
    { date: "2024-05-01", value: 11500 },
    { date: "2024-06-01", value: 12000 },
    { date: "2024-07-01", value: 12500 },
    { date: "2024-08-01", value: 13000 },
    { date: "2024-09-01", value: 12800 },
    { date: "2024-10-01", value: 13500 },
];
  

const LeaderBoard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleHover = () => setIsOpen(true);
  const handleLeave = () => setIsOpen(false);

  return (
    <div className="portfolio-container">
      <div
        className={`sidebar ${isOpen ? "open" : ""}`}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        <div className={`nav-items ${isOpen ? "show" : ""}`}>
          <a href="#leaderboard">LeaderBoard</a>
          <a href="#learn">Learn</a>
          <a href="#settings">Settings</a>
        </div>
        <div className="sign-out">
          <a href="#sign-out">Sign out</a>
        </div>
      </div>
      <div className="content">
        <h1>Portfolio Page</h1>
        <p>Welcome to my portfolio page!</p>
        <PortfolioChart dataPoints={ sampleData }></PortfolioChart>
      </div>
    </div>
    
  );
};

export default LeaderBoard;