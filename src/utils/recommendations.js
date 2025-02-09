// Calculate the Sharpe ratio for a stock.
export function calculateSharpeRatio(expectedReturn, riskFreeRate, volatility) {
    if (volatility === 0) return 0;
    return (expectedReturn - riskFreeRate) / volatility;
  }
  
  // Compute a composite score factoring in both the Sharpe ratio and beta.
  export function calculateCompositeScore(stock, riskFreeRate, weights) {
    const sharpe = calculateSharpeRatio(stock.expectedReturn, riskFreeRate, stock.volatility);
    const betaScore = stock.beta ? 1 / stock.beta : 0;
    return weights.sharpe * sharpe + weights.beta * betaScore;
  }
  
  // Returns composite recommendations for a given set of stocks.
  export function getCompositeRecommendations(stocks, riskFreeRate = 0.02, weights = { sharpe: 0.7, beta: 0.3 }) {
    const scoredStocks = stocks.map(stock => {
      const compositeScore = calculateCompositeScore(stock, riskFreeRate, weights);
      return { ...stock, compositeScore };
    });
    return scoredStocks.sort((a, b) => b.compositeScore - a.compositeScore);
  }
  
  // Selects weights based on the user's risk tolerance.
  export function getWeightsForUser(riskTolerance) {
    switch (riskTolerance) {
      case 'low':
        return { sharpe: 0.5, beta: 0.5 };
      case 'medium':
        return { sharpe: 0.7, beta: 0.3 };
      case 'high':
        return { sharpe: 0.9, beta: 0.1 };
      default:
        return { sharpe: 0.7, beta: 0.3 };
    }
  }
  
  // Tailors recommendations based on user preferences.
  export function getUserBasedRecommendations(user, stocks, riskFreeRate = 0.02) {
    const weights = getWeightsForUser(user.riskTolerance);
    let filteredStocks = stocks;
    if (user.preferredSectors && user.preferredSectors.length > 0) {
      filteredStocks = stocks.filter(stock => user.preferredSectors.includes(stock.sector));
    }
    return getCompositeRecommendations(filteredStocks, riskFreeRate, weights);
  }