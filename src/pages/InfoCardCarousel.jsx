import React, { useState } from 'react';
import './InfoCardCarousel.css'
import Card from './Cards';


const InfoCardCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const textItems = [
      <Card state="AAPL"></Card>,
      <Card state="AAPL"></Card>,
      <Card state="AAPL"></Card>,
      <Card state="AAPL"></Card>,
    ];
  
    const nextCard = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % textItems.length);
    };
  
    const prevCard = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? textItems.length - 1 : prevIndex - 1
      );
    };
  
    return (
      <div className="info-content">
        <div className="buttons">
            <button className="prev" onClick={prevCard}>⬅️</button>
            <button className="next" onClick={nextCard}>➡️</button> 
        </div>
        <div className="text-item">{textItems[currentIndex]}</div>
      </div>
    );
}

export default InfoCardCarousel;


