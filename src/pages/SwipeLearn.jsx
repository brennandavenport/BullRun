import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import InfoCardCarousel from "./InfoCardCarousel";
import Chat from "./Chat";
import "./SwipeLearn.css";

// Define user preferences (adjust as needed)
const userPreferences = {
  risk: "medium",
  sector: "tech",     // Note: Will compare lowercase strings
  timeframe: "long",
  marketCap: "large", // Ensure this matches with your stock marketCap values or adjust accordingly
};

// Define the stock data as a dictionary (an array of objects)
// Each object now includes an "id" and "symbol" property.
const stockData = [
  { id: 1, symbol: "NVDA", marketCap: "3T", volatility: "High", sector: "Technology", risk_level: "medium" },
  { id: 2, symbol: "AAPL", marketCap: "3.4T", volatility: "Low", sector: "Technology", risk_level: "low" },
  { id: 3, symbol: "SPY", marketCap: "500B", volatility: "Low", sector: "Finance", risk_level: "high" },
  { id: 4, symbol: "MSFT", marketCap: "3T", volatility: "Low", sector: "Technology", risk_level: "medium" },
  { id: 5, symbol: "TSLA", marketCap: "1.13T", volatility: "High", sector: "Automotive", risk_level: "low" },
  { id: 6, symbol: "NIO", marketCap: "9B", volatility: "High", sector: "Materials", risk_level: "high" },
  { id: 7, symbol: "XOM", marketCap: "400B", volatility: "Low", sector: "Energy", risk_level: "medium" },
  { id: 8, symbol: "BLK", marketCap: "153B", volatility: "Low", sector: "Finance", risk_level: "high" },
  { id: 9, symbol: "LLY", marketCap: "833B", volatility: "Low", sector: "Healthcare", risk_level: "low" },
  { id: 10, symbol: "SHW", marketCap: "90B", volatility: "Low", sector: "Materials", risk_level: "high" },
];

console.log(stockData);

// Define a dictionary (mapping) for risk score adjustments.
// This maps the user's risk preference to a nested mapping of stock risk levels and corresponding score values.
const riskMapping = {
  low: {
    low: 0.3,
    medium: 0.2,
    high: 0.1,
  },
  medium: {
    low: 0.1,
    medium: 0.3,
    high: 0.2,
  },
  high: {
    low: 0.1,
    medium: 0.2,
    high: 0.3,
  },
};

// Recommendation function that returns a score between 0 and 1.
const recommendStock = (userPreferences, stock) => {
  let score = 0;

  // Use the riskMapping dictionary to calculate the risk score.
  // For example, if user risk is "medium" and the stock risk_level is "high",
  // then riskMapping["medium"]["high"] returns 0.2.
  score += riskMapping[userPreferences.risk][stock.risk_level];

  // Sector calculation (comparing lowercase values for consistency)
  if (userPreferences.sector.toLowerCase() === stock.sector.toLowerCase()) {
    score += 0.3;
  } else {
    score += 0.1;
  }

  // Timeframe and volatility calculation
  if (userPreferences.timeframe === "short" && stock.volatility.toLowerCase() === "high") {
    score += 0.2;
  } else if (userPreferences.timeframe === "long" && stock.volatility.toLowerCase() === "low") {
    score += 0.2;
  } else {
    score += 0.1;
  }

  // Market cap calculation
  // Adjust the logic here if your market cap values differ.
  if (userPreferences.marketCap === stock.marketCap) {
    score += 0.2;
  } else {
    score += 0.1;
  }

  console.log("Stock Score:", score);
  return Math.min(Math.max(score, 0), 1);
};

const SwipeLearn = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Move to the next item by incrementing the index.
  // This wraps around using the stockData length.
  const nextItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % stockData.length);
  };

  // Called when a user "likes" a card.
  // Instead of fetching data from an API, we directly select the stock from the local dictionary.
  const handleLike = () => {
    // Match the stock by using the currentIndex from stockData.
    const matchedStock = stockData[currentIndex];

    // Calculate the recommendation score using the matched stock.
    const score = recommendStock(userPreferences, matchedStock);

    // If the score meets or exceeds the threshold (0.7), redirect the user.
    if (score >= 0.7) {
      console.log("Matched stock:", matchedStock);
      localStorage.setItem("stockID", currentIndex);
      // Redirect and pass along the matched stock data and score.
      navigate("/StockRecommendations", { state: { stockData: matchedStock, score } });
    } else {
      // If not a match, simply move to the next item.
      nextItem();
    }
  };

  // For a "dislike" action, simply move to the next stock.
  const handleDislike = () => {
    nextItem();
  };

  // Treat "superlike" the same as "like" (modify as needed)
  const handleSuperlike = () => {
    handleLike();
  };

  return (
    <div className="header">
      <NavBar />
      <div className="body">
        <div className="page-content">
          <div className="tinder">
            <h1>Swipe Learn Page</h1>
            <InfoCardCarousel companyIndex={currentIndex} />
            <div className="buttons">
              <button className="dislike" onClick={handleDislike}>
                ❌
              </button>
              <button className="superlike" onClick={handleSuperlike}>
                ⭐
              </button>
              <button className="like" onClick={handleLike}>
                💚
              </button>
            </div>
          </div>
          <div className="chat-bot">
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwipeLearn;