import React, { useEffect, useState } from 'react';
import { getUserBasedRecommendations } from '../utils/recommendations';

const StockRecommendations = ({ user }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Example stock data. In production, you might fetch this from an API.
    const stocks = [
      { ticker: 'AAPL', expectedReturn: 0.10, volatility: 0.15, beta: 1.1, sector: 'technology' },
      { ticker: 'MSFT', expectedReturn: 0.08, volatility: 0.12, beta: 0.9, sector: 'technology' },
      { ticker: 'JNJ', expectedReturn: 0.07, volatility: 0.10, beta: 0.8, sector: 'healthcare' },
      { ticker: 'TSLA', expectedReturn: 0.15, volatility: 0.30, beta: 1.5, sector: 'automotive' },
    ];
    
    const recs = getUserBasedRecommendations(user, stocks, 0.02);
    setRecommendations(recs);
  }, [user]);

  return (
    <div>
      <h2>Recommendations for {user.name}</h2>
      <ul>
        {recommendations.map(stock => (
          <li key={stock.ticker}>
            <strong>{stock.ticker}</strong> — Composite Score: {stock.compositeScore.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockRecommendations;