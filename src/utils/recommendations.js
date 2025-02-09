function recommendStock(userPreferences, stock) {
    // Initialize the score
    let score = 0;

    // Risk matching
    if (userPreferences.risk === stock.risk) {
        score += 0.3;
    } else if (
        (userPreferences.risk === 'low' && stock.risk === 'medium') ||
        (userPreferences.risk === 'medium' && stock.risk === 'high') ||
        (userPreferences.risk === 'high' && stock.risk === 'medium')
    ) {
        score += 0.2;
    } else {
        score += 0.1;
    }

    // Sector matching
    if (userPreferences.sector === stock.sector) {
        score += 0.3;
    } else {
        score += 0.1;
    }

    // Timeframe matching (using volatility as a proxy)
    if (userPreferences.timeframe === 'short' && stock.volatility === 'high') {
        score += 0.2;
    } else if (userPreferences.timeframe === 'long' && stock.volatility === 'low') {
        score += 0.2;
    } else {
        score += 0.1;
    }

    // Market cap matching
    if (userPreferences.marketCap === stock.marketCap) {
        score += 0.2;
    } else {
        score += 0.1;
    }

    // Ensure the score is between 0 and 1
    score = Math.min(Math.max(score, 0), 1);

    return score;
}

// Example usage:
const userPreferences = {
    risk: 'medium',
    sector: 'tech',
    timeframe: 'long',
    marketCap: 'large'
};

const stock = {
    risk: 'medium',
    sector: 'tech',
    volatility: 'low',
    marketCap: 'large'
};

const score = recommendStock(userPreferences, stock);
console.log(`Stock Score: ${score}`);

if (score >= 0.7) {
    console.log('This stock is a positive recommendation!');
} else {
    console.log('This stock is not recommended.');
}