import React from "react"
import './style.css'


const LandingPage = () => {
    return( 
        <div>
            <div class="grid-background"></div>
            <nav class="navbar">
                <a href="/" class="logo">BullRun</a>
                <div class="nav-links">
                    <a href="signin">Swipe</a>
                    <a href="signin">Portfolio</a>
                    <a href="signin">Leaderboard</a>
                </div>
                <a href="/signin" class="button">Sign Up/Log In</a>
            </nav>
            <section class="hero">
                <h1>Compete Against your Friends <br/> to Build the Best Portfolio</h1>
                <p>Start Swiping to Build Generational Wealth</p>
                <a href="signin" class="button">Build Portfolio</a>
            </section>
        </div>
    )
}

export default LandingPage;