import React, { useState, useEffect } from "react";
import "./Portfolio.css";
import NewsComponent from "./NewsComponent";
import NavBar from "./NavBar";
import PortfolioPieChart from "./PortfolioPieChart";
import StockChart from "./StockChart";

const Portfolio = () => {
  const [chartData, setChartData] = useState({ labels: [], values: [] });
  const [pieChartData, setPieChartData] = useState({ labels: [], values: [] });

  useEffect(() => {
    const fetchPortfolioValue = async () => {
      try {
        const user_id = localStorage.getItem("user"); // Replace with your actual user ID
        const apiUrl = `http://localhost:8000/main/investments/get_portfolio_value/?user_id=${user_id}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Portfolio Value Data:", data);

        // Extract the portfolio history from the returned data.
        const history = data.portfolio_value_over_time;

        // Convert the history object into separate arrays for labels (dates) and values.
        const labels = Object.keys(history);
        const values = Object.values(history);

        // Update the chartData state.
        setChartData({ labels, values });

        // Extract data for the pie chart
        const pieLabels = Object.keys(data.portfolio_value_over_time);
        const pieValues = Object.values(data.portfolio_value_over_time);

        setPieChartData({ labels: pieLabels, values: pieValues });
      } catch (error) {
        console.error("Error fetching portfolio value:", error);
      }
    };

    fetchPortfolioValue();
  }, []);

  return (
    <div className="portfolio-container">
      <NavBar></NavBar>
      <div className="content">
        <div className="charts">
          <div className="stock-chart" data-title="Performance - Past Month">
            <StockChart data={chartData}></StockChart>
          </div>
          <div className="pie-chart" data-title="Total Holdings">
            <PortfolioPieChart data={pieChartData}></PortfolioPieChart>
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