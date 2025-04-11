/**
 * Market Data JavaScript
 * Displays realistic market data for Fershman Financial
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize market ticker
    initMarketTicker();
});

// Function to initialize the market ticker
function initMarketTicker() {
    const tickerContainer = document.querySelector('.ticker');
    if (!tickerContainer) return;
    
    // Clear any existing content
    tickerContainer.innerHTML = '';
    
    // Add market data items
    const marketData = getMarketData();
    
    // Create ticker items
    marketData.forEach(item => {
        const tickerItem = document.createElement('div');
        tickerItem.className = 'ticker-item';
        
        const changeClass = item.change > 0 ? 'positive' : 'negative';
        const changeSymbol = item.change > 0 ? '+' : '';
        
        tickerItem.innerHTML = `
            <div class="ticker-symbol">${item.symbol}</div>
            <div class="ticker-value">${item.value.toFixed(2)}</div>
            <div class="ticker-change ${changeClass}">${changeSymbol}${item.change.toFixed(2)}%</div>
        `;
        
        tickerContainer.appendChild(tickerItem);
    });
    
    // Clone the items for continuous scrolling
    const tickerItems = document.querySelectorAll('.ticker-item');
    tickerItems.forEach(item => {
        const clone = item.cloneNode(true);
        tickerContainer.appendChild(clone);
    });
}

// Function to get market data
function getMarketData() {
    // Realistic market data with symbols, values, and changes
    return [
        { symbol: 'S&P 500', value: 5428.67, change: 0.42 },
        { symbol: 'DOW', value: 38921.13, change: 0.31 },
        { symbol: 'NASDAQ', value: 17732.56, change: 0.58 },
        { symbol: 'FTSE 100', value: 8214.78, change: -0.17 },
        { symbol: 'DAX', value: 18342.19, change: 0.22 },
        { symbol: 'NIKKEI', value: 39876.45, change: 0.76 },
        { symbol: 'HANG SENG', value: 17654.32, change: -0.45 },
        { symbol: 'CRUDE OIL', value: 82.47, change: 1.23 },
        { symbol: 'GOLD', value: 2376.80, change: 0.65 },
        { symbol: 'BITCOIN', value: 68432.15, change: 2.87 },
        { symbol: 'EUR/USD', value: 1.0876, change: -0.12 },
        { symbol: 'USD/JPY', value: 151.23, change: 0.34 },
        { symbol: 'GBP/USD', value: 1.2654, change: -0.08 },
        { symbol: '10Y TREASURY', value: 4.32, change: 0.05 },
        { symbol: 'VIX', value: 16.78, change: -1.24 }
    ];
}
