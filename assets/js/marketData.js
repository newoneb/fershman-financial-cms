// Market Data JavaScript
// Provides realistic market ticker data for Fershman Financial

document.addEventListener('DOMContentLoaded', function() {
    // Market data with realistic values
    const marketData = [
        { symbol: 'S&P 500', value: '5,328.42', change: '+0.68%', direction: 'positive' },
        { symbol: 'DOW', value: '39,127.14', change: '+0.37%', direction: 'positive' },
        { symbol: 'NASDAQ', value: '16,742.39', change: '+1.12%', direction: 'positive' },
        { symbol: 'FTSE 100', value: '8,142.15', change: '-0.23%', direction: 'negative' },
        { symbol: 'DAX', value: '18,384.35', change: '+0.51%', direction: 'positive' },
        { symbol: 'NIKKEI', value: '39,523.55', change: '-0.82%', direction: 'negative' },
        { symbol: 'USD/EUR', value: '0.9237', change: '+0.14%', direction: 'positive' },
        { symbol: 'USD/GBP', value: '0.7842', change: '-0.21%', direction: 'negative' },
        { symbol: 'USD/JPY', value: '153.42', change: '+0.45%', direction: 'positive' },
        { symbol: 'GOLD', value: '2,342.80', change: '+1.23%', direction: 'positive' },
        { symbol: 'OIL', value: '82.47', change: '-1.87%', direction: 'negative' },
        { symbol: 'BTC', value: '68,234.15', change: '+2.34%', direction: 'positive' }
    ];

    // Function to populate the ticker
    function populateTicker() {
        const ticker = document.querySelector('.ticker');
        if (!ticker) return;

        // Clear existing content
        ticker.innerHTML = '';

        // Create ticker items
        marketData.forEach(item => {
            const tickerItem = document.createElement('div');
            tickerItem.className = 'ticker-item';

            const symbol = document.createElement('div');
            symbol.className = 'ticker-symbol';
            symbol.textContent = item.symbol;

            const value = document.createElement('div');
            value.className = 'ticker-value';
            value.textContent = item.value;

            const change = document.createElement('div');
            change.className = `ticker-change ${item.direction}`;
            change.textContent = item.change;

            tickerItem.appendChild(symbol);
            tickerItem.appendChild(value);
            tickerItem.appendChild(change);

            ticker.appendChild(tickerItem);
        });

        // Clone the ticker items for continuous scrolling
        const tickerItems = document.querySelectorAll('.ticker-item');
        tickerItems.forEach(item => {
            const clone = item.cloneNode(true);
            ticker.appendChild(clone);
        });
    }

    // Initialize the ticker
    populateTicker();

    // Update ticker data periodically with small random changes
    setInterval(() => {
        marketData.forEach(item => {
            // Generate a random change between -0.5% and +0.5%
            const randomChange = (Math.random() - 0.5) * 0.5;
            
            // Parse the current change value
            let currentChange = parseFloat(item.change.replace('%', '').replace('+', ''));
            
            // Apply the random change
            currentChange += randomChange;
            
            // Update the direction and format the change
            if (currentChange >= 0) {
                item.direction = 'positive';
                item.change = `+${currentChange.toFixed(2)}%`;
            } else {
                item.direction = 'negative';
                item.change = `${currentChange.toFixed(2)}%`;
            }
        });

        // Update the ticker display
        populateTicker();
    }, 60000); // Update every minute
});
