import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "./Leaderboard.css";

const Leaderboard = () => {
  // State to store the leaderboard data
  const [leaderboardData, setLeaderboardData] = useState([]);

  // Fetch leaderboard data from the API
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/main/investments/get_leaderboard/");
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard data");
        }
        const data = await response.json();
        setLeaderboardData(data.leaderboard); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboard();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      <NavBar />
      <div className="page-content">
        <h1>Leaderboard</h1>
        <h2>Top 10 All Time</h2>
        <div className="leaderboard">
          {leaderboardData.map((player, index) => (
            <div key={player.user_id} className="player">
              <div className="info">
                <span className="rank">{index + 1}.</span>
                <span className="name">{player.name}</span>
              </div>
              <div className={`roi ${player.percentage_gain >= 0 ? "positive" : "negative"}`}>
                {player.percentage_gain >= 0 ? "+" : ""}
                {player.percentage_gain.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;