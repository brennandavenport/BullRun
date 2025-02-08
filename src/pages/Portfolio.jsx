import React, { useState } from "react";
import "./Portfolio.css"; 
import NewsComponent from "./NewsComponent";

import { useRef, useEffect } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler } from 'chart.js';
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler);



const StockChart = ({ data }) => {
    const chartRef = useRef(null);
    const canvasRef = useRef(null);
  
    useEffect(() => {
      if (!canvasRef.current) return;
  
      const ctx = canvasRef.current.getContext('2d');
      
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(76, 175, 80, 0.2)');
      gradient.addColorStop(1, 'rgba(76, 175, 80, 0)');
  
      const config = {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [{
            data: data.values,
            borderColor: '#4CAF50',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            backgroundColor: gradient,
            pointRadius: 0,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: 'rgba(0,0,0,0.7)',
              bodyColor: '#fff',
              titleColor: '#fff',
              caretSize: 0,
              displayColors: false,
              padding: 12,
              callbacks: {
                title: () => '',
                label: (context) => `${context.parsed.y}%`
              }
            }
          },
          scales: {
            x: {
              display: false,
              grid: { display: false }
            },
            y: {
              display: false,
              grid: { display: false }
            }
          },
          interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
          },
          elements: {
            line: {
              borderWidth: 2
            }
          }
        }
      };
  
      const chart = new Chart(ctx, config);
      return () => chart.destroy();
    }, [data]);
  
    return (
      <div style={{ position: 'relative', height: '300px', width: '500px' }}>
        <canvas ref={canvasRef} />
      </div>
    );
};
  
  // Sample data format
  const sampleData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10'],
    values: [3.1, 5.0, 4.5, 1, 2.5, 1.8, 4.2, 3.1, 5.0, 4.5]
  };
  


const Portfolio = () => {
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
        <div className="charts">
            <div className="stock-chart">Performance
                <StockChart data = { sampleData }></StockChart>
            </div>
            <div className="pie-chart">Portfolio
               
            </div>
        </div>
        <div className="news">News here
            <NewsComponent></NewsComponent>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
