import React, { useState } from "react";
import "./Portfolio.css"; 
import NewsComponent from "./NewsComponent";
import NavBar from "./NavBar";
import PortfolioPieChart from "./PortfolioPieChart";
import StockChart from "./StockChart";

import { useRef, useEffect } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler } from 'chart.js';
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler);

const getChartData = async () =>  {
  //get data from james api
}
const generateStockData = () => {
  let currentPrice = 100; // Starting price
  const volatility = 2.5; // Price fluctuation range
  const dailyDrift = 0.3; // General upward trend
  
  return {
    labels: Array.from({length: 30}, (_, i) => `Day ${i + 1}`),
    values: Array.from({length: 30}, () => {
      currentPrice += dailyDrift + (Math.random() * volatility - volatility/2);
      return Number(currentPrice.toFixed(2));
    })
  };
};

const sampleData = generateStockData();

// Sample data format
// const sampleData = {
//   labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10'],
//   values: [3.1, 5.0, 4.5, 1, 2.5, 1.8, 4.2, 3.1, 5.0, 4.5]
// };
  


const Portfolio = () => {
  return (
    <div className="portfolio-container">
      <NavBar></NavBar>
      <div className="content">
        <div className="charts">
            <div className="stock-chart" data-title="Performance - Past Month">
              <StockChart data = { sampleData }></StockChart>
            </div>
            <div className="pie-chart" data-title="Total Holdings">
              <PortfolioPieChart></PortfolioPieChart>
            </div>
        </div>
        <div className="news">
            <NewsComponent></NewsComponent>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
