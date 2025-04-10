// Market data for Fershman Financial
// This file handles displaying market data in the ticker and charts

document.addEventListener('DOMContentLoaded', function() {
  // Initialize market data
  initMarketData();
});

// Initialize market data
function initMarketData() {
  // Load ticker data
  loadTickerData();
  
  // Load chart data if charts exist on the page
  if (document.querySelector('.chart-container')) {
    loadChartData();
  }
}

// Load ticker data
function loadTickerData() {
  const tickerContainer = document.querySelector('.ticker');
  if (!tickerContainer) return;
  
  // Show loading state
  tickerContainer.innerHTML = '<div class="loading"><p>Loading market data...</p></div>';
  
  // Use placeholder market data
  const marketData = getPlaceholderMarketData();
  
  // Clear loading message
  tickerContainer.innerHTML = '';
  
  // Display market data in ticker
  marketData.forEach(item => {
    const changeClass = item.change > 0 ? 'positive' : (item.change < 0 ? 'negative' : 'neutral');
    const changeSymbol = item.change > 0 ? '+' : '';
    
    tickerContainer.innerHTML += `
      <div class="ticker-item ${changeClass}">
        <span class="ticker-symbol">${item.symbol}</span>
        <span class="ticker-value">${item.value.toFixed(2)}</span>
        <span class="ticker-change">${changeSymbol}${item.change.toFixed(2)} (${changeSymbol}${item.changePercent.toFixed(2)}%)</span>
      </div>
    `;
  });
}

// Load chart data
function loadChartData() {
  // This would typically load chart data and initialize charts
  // For now, we'll just show placeholder messages
  
  const chartContainers = document.querySelectorAll('.chart-container');
  
  chartContainers.forEach(container => {
    container.innerHTML = `
      <div class="chart-placeholder">
        <p>Interactive charts coming soon</p>
      </div>
    `;
  });
}

// Get placeholder market data
function getPlaceholderMarketData() {
  return [
    {
      symbol: 'S&P 500',
      name: 'S&P 500 Index',
      value: 5782.34,
      change: 23.45,
      changePercent: 0.41,
      direction: 'up'
    },
    {
      symbol: 'DJIA',
      name: 'Dow Jones Industrial Average',
      value: 38921.67,
      change: 156.78,
      changePercent: 0.40,
      direction: 'up'
    },
    {
      symbol: 'NASDAQ',
      name: 'NASDAQ Composite',
      value: 18213.89,
      change: 98.76,
      changePercent: 0.55,
      direction: 'up'
    },
    {
      symbol: 'BTC-USD',
      name: 'Bitcoin USD',
      value: 68432.21,
      change: -1243.56,
      changePercent: -1.78,
      direction: 'down'
    },
    {
      symbol: 'EUR-USD',
      name: 'Euro US Dollar',
      value: 1.0876,
      change: 0.0023,
      changePercent: 0.21,
      direction: 'up'
    },
    {
      symbol: 'US10Y',
      name: '10-Year Treasury Yield',
      value: 3.842,
      change: -0.028,
      changePercent: -0.72,
      direction: 'down'
    },
    {
      symbol: 'WTI',
      name: 'WTI Crude Oil',
      value: 82.34,
      change: 1.23,
      changePercent: 1.52,
      direction: 'up'
    },
    {
      symbol: 'GOLD',
      name: 'Gold',
      value: 2328.45,
      change: 12.30,
      changePercent: 0.53,
      direction: 'up'
    }
  ];
}
