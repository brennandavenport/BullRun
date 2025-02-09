import React from "react"
import NavBar from "./NavBar";
import InfoCardCarousel from "./InfoCardCarousel";
import './SwipeLearn.css'

const SwipeLearn = () => {
    return(
        <div className="header">
            <NavBar></NavBar>
            <div className="body">
                <div className="page-content">
                    <h1>Swipe Learn Page</h1>
                    <InfoCardCarousel></InfoCardCarousel>
                    <div className="buttons">
                        <button className="dislike">❌</button>
                        <button className="superlike">⭐</button>
                        <button className="like">💚</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SwipeLearn;