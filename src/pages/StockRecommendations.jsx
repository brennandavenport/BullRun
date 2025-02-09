import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const StockRecommendations = () => {
  // Retrieve the matched stock data and recommendation score passed via state from SwipeLearn.
  const location = useLocation();
  const { stockData, score } = location.state || {};

  const stockprice = {
     "NVDA": 129.84 ,
     "AAPL": 227.63 ,
     "SPY": 600.77 ,
     "MSFT": 409.75 ,
     "TSLA": 361.62 ,
     "NIO": 4.24 ,
     "XOM": 108.89 ,
     "BLK": 992.04 ,
     "LLY": 878.31 ,
     "SHW": 360.57 ,
  };

  // Local state to store the user-entered quantity.
  const [quantity, setQuantity] = useState("");

  // Fallback if no stock data is available.
  if (!stockData || score === undefined) {
    return (
      <div className="recommendation">
        <p>No stock data available. Please return to Swipe Learn.</p>
      </div>
    );
  }

  // Function to handle purchasing the stock.
  const handleBuyStock = async () => {
    // Validate the quantity input.
    if (!quantity || Number(quantity) <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    // Since your stockData does not include a price, we use a default price.
    const defaultPrice = 100; // Adjust as needed.
    const priceAtPurchase = defaultPrice;
    const totalAmount = (Number(quantity) * defaultPrice).toFixed(2);

    // Build the investment payload following the Investment JSON format.
    const investment = {
      stock_ticker: stockData.symbol,           // Using the symbol property from your stock data.
      amount_invested: 1000,             // Calculated total amount (as a string).
      time_bought: "2024-01-04",    // Current time in ISO format.
      price_at_purchase: stockprice[stockData.symbol], // Price at purchase as string.
      profile: localStorage.getItem("user"),    // Hard-coded profile id (update as needed).
      stock: stockData.id,                      // Using the id property from your stock data.
    };

    try {
      // Replace the URL with your actual endpoint.
      const response = await fetch("http://localhost:8000/main/investments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(investment),
      });
      console.log(investment)

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      alert("Stock purchased successfully!");
      console.log("Purchase result:", result);
    } catch (error) {
      console.error("Error purchasing stock:", error);
      alert("Failed to purchase stock. Please try again.");
    }
  };

  return (
    <div className="recommendation">
      <h2>
        Recommendation:{" "}
        {score >= 0.7
          ? "You matched with this stock!"
          : "You didn't match with this stock :("}
      </h2>
      <p>Score: {score.toFixed(2)}</p>
      
      {/* Display various stock data properties */}
      {stockData.symbol && <p>Stock: {stockData.symbol}</p>}
      {stockData.marketCap && <p>Market Cap: {stockData.marketCap}</p>}
      {stockData.sector && <p>Sector: {stockData.sector}</p>}
      {stockData.risk_level && <p>Risk Level: {stockData.risk_level}</p>}

      {/* Input for user to specify quantity */}
      <label style={{ display: "block", margin: "10px 0" }}>
        Quantity:
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          style={{ marginLeft: "5px" }}
        />
      </label>
      
      {/* Button that triggers the POST request to "buy" the stock */}
      <button onClick={handleBuyStock}>
        Buy Stock
      </button>
    </div>
  );
};

export default StockRecommendations;