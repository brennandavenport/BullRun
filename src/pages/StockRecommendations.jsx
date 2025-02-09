import React, { useState } from "react";

const StockRecommendations = () => {
  // State for user preferences
  const [userPreferences, setUserPreferences] = useState({
    risk: "medium",
    sector: "tech",
    timeframe: "long",
    marketCap: "large",
  });

  // State for stock data
  const [stock, setStock] = useState({
    risk: "medium",
    sector: "tech",
    volatility: "low",
    marketCap: "large",
  });

  // State for the recommendation score
  const [score, setScore] = useState(null);

  // Function to handle preference changes
  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setUserPreferences((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to handle stock data changes
  const handleStockChange = (e) => {
    const { name, value } = e.target;
    setStock((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to calculate the recommendation score
  const calculateScore = () => {
    const newScore = recommendStock(userPreferences, stock);
    setScore(newScore);
  };

  return (
    <div className="stock-recommendations">
      <h1>Stock Recommendation App</h1>

      <div>
        <h2>User Preferences</h2>
        <label>
          Risk:
          <select name="risk" value={userPreferences.risk} onChange={handlePreferenceChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <label>
          Sector:
          <select name="sector" value={userPreferences.sector} onChange={handlePreferenceChange}>
            <option value="tech">Tech</option>
            <option value="automotive">Automotive</option>
            <option value="finance">Finance</option>
            <option value="materials">Materials</option>
            <option value="etf">ETF</option>
            <option value="healthcare">Healthcare</option>
            <option value="energy">Energy</option>
          </select>
        </label>
        <label>
          Timeframe:
          <select name="timeframe" value={userPreferences.timeframe} onChange={handlePreferenceChange}>
            <option value="short">Short</option>
            <option value="long">Long</option>
          </select>
        </label>
        <label>
          Market Cap:
          <select name="marketCap" value={userPreferences.marketCap} onChange={handlePreferenceChange}>
            <option value="large">Large</option>
            <option value="small">Small</option>
          </select>
        </label>
      </div>

      <div>
        <h2>Stock Details</h2>
        <label>
          Risk:
          <select name="risk" value={stock.risk} onChange={handleStockChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <label>
          Sector:
          <select name="sector" value={stock.sector} onChange={handleStockChange}>
            <option value="tech">Tech</option>
            <option value="automotive">Automotive</option>
            <option value="finance">Finance</option>
          </select>
        </label>
        <label>
          Volatility:
          <select name="volatility" value={stock.volatility} onChange={handleStockChange}>
            <option value="low">Low</option>
            <option value="high">High</option>
          </select>
        </label>
        <label>
          Market Cap:
          <select name="marketCap" value={stock.marketCap} onChange={handleStockChange}>
            <option value="large">Large</option>
            <option value="small">Small</option>
          </select>
        </label>
      </div>

      <button onClick={calculateScore}>Evaluate Stock</button>

      {score !== null && (
        <div>
          <h2>Recommendation Score: {score.toFixed(2)}</h2>
          {score >= 0.7 ? (
            <p>This stock is a positive recommendation!</p>
          ) : (
            <p>This stock is not recommended.</p>
          )}
        </div>
      )}
    </div>
  );
};

// Stock recommendation algorithm
const recommendStock = (userPreferences, stock) => {
  let score = 0;

  // Risk matching
  if (userPreferences.risk === stock.risk) {
    score += 0.3;
  } else if (
    (userPreferences.risk === "low" && stock.risk === "medium") ||
    (userPreferences.risk === "medium" && stock.risk === "high") ||
    (userPreferences.risk === "high" && stock.risk === "medium")
  ) {
    score += 0.2;
  } else {
    score += 0.1;
  }

  // Sector matching
  if (userPreferences.sector === stock.sector) {
    score += 0.3;
  } else {
    score += 0.1;
  }

  // Timeframe matching (using volatility as a proxy)
  if (userPreferences.timeframe === "short" && stock.volatility === "high") {
    score += 0.2;
  } else if (userPreferences.timeframe === "long" && stock.volatility === "low") {
    score += 0.2;
  } else {
    score += 0.1;
  }

  // Market cap matching
  if (userPreferences.marketCap === stock.marketCap) {
    score += 0.2;
  } else {
    score += 0.1;
  }

  // Ensure the score is between 0 and 1
  score = Math.min(Math.max(score, 0), 1);

  return score;
};

export default StockRecommendations;