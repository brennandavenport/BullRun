import React, { useState } from "react"
import NavBar from "./NavBar";
import InfoCardCarousel from "./InfoCardCarousel";
import './SwipeLearn.css'



const SwipeLearn = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const indexOfCompanies = [
       0,
       1,
       2,
       3,
       4,
       5,
       6,
       7,
       8,
       9,
    ];

    const nextItem = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % indexOfCompanies.length);
      };
    
    return(
        <div className="header">
            <NavBar></NavBar>
            <div className="body">
                <div className="page-content">
                    <h1>Swipe Learn Page</h1>
                    <InfoCardCarousel companyIndex = {currentIndex}></InfoCardCarousel>
                    <div className="buttons">
                        <button className="dislike" onClick={ nextItem }>❌</button>
                        <button className="superlike" onClick={ nextItem }>⭐</button>
                        <button className="like" onClick={ nextItem }>💚</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SwipeLearn;