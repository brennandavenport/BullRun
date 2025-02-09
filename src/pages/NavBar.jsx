import './NavBar.css'
import { useState } from 'react';


const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleHover = () => setIsOpen(true);
    const handleLeave = () => setIsOpen(false);

    return (
        <div className="page-container">
            <div
                className={`sidebar ${isOpen ? "open" : ""}`}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
            >
                <div className={`nav-items ${isOpen ? "show" : ""}`}>
                <a href="/portfolio">Dashboard</a>
                <a href="/leaderboard">LeaderBoard</a>
                <a href="/swipe-learn">Learn</a>
                <a href="/settings">Settings</a>
                </div>
                <div className="sign-out">
                <a href="/">Sign out</a>
                </div>
            </div>
            <div className="content"></div>
        </div>
    )
}

export default NavBar;