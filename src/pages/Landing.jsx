import React from "react"
import './style.css'


const Landing = () => {
    return( 
        <div>
            <div class="grid-background"></div>
            <nav class="navbar">
                <a href="#" class="logo">BullRun</a>
                <div class="nav-links">
                    <a href="#swipe">Swipe</a>
                    <a href="#portfolio">Portfolio</a>
                    <a href="#leaderboard">Leaderboard</a>
                    <a href="#settings">Settings</a>
                </div>
                <a href="#" class="button">Sign Up/Log In</a>
            </nav>
            <section class="hero">
                <h1>Compete Against your Friends <br/> to Build the Best Portfolio</h1>
                <p>Start Swiping to Build Generational Wealth</p>
                <a href="#" class="button">Build Portfolio</a>
            </section>
        </div>
    )
}

export default LandingPage;