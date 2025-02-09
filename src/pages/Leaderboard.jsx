import React from "react"
import NavBar from "./NavBar";
import './Leaderboard.css'

const Leaderboard = () => {
    return(
        <div>
          <NavBar></NavBar>
          <div className="page-content">
            <h1>Leaderboard</h1>
            <h2>Top 10 All Time</h2>
            <div class="leaderboard">
                <div class="player">
                    <div class="info">
                        <span class="rank">1.</span>
                        <span class="name">Rich Baby Daddy </span>
                    </div>
                    <div class="roi positive">+25.3%</div>
                </div>
                <div class="player">
                    <div class="info">
                        <span class="rank">2.</span>
                        <span class="name">Arjun</span>
                    </div>
                    <div class="roi positive">+18.7%</div>
                </div>
                <div class="player">
                    <div class="info">
                        <span class="rank">3.</span>
                        <span class="name">Brennan</span>
                    </div>
                    <div class="roi negative">-1023432.2%</div>
                </div>
            </div>
          </div>
        </div>  
    )
}

export default Leaderboard;
