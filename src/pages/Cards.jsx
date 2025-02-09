import React from "react";

const Card = ( { state }) => {
    fetch('card.json')
        .then(response => response.json()) // Parse the JSON file
        .then(data => {
            // Accessing the JSON data after it's loaded
            const companyName = data.company;
            console.log("Company Name:", companyName);

            const mainData = data.data.find(item => item.type === "main").data;
            console.log("Main Data:", mainData);

            const price = mainData.price;
            console.log("Price:", price);
            
            // You can continue using the same approach to access stats, financial, etc.
        })
        .catch(error => {
            console.error("Error loading the JSON file:", error);
        });

    return (
        <div>
            {state}
        </div>
    )
}

export default Card;