// Main JavaScript file for Fershman Financial website

// DOM Elements
const loader = document.querySelector('.loader');
const mouseFollower = document.querySelector('.mouse-follower');
const themeToggle = document.querySelector('.theme-toggle');
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarLinks = document.querySelector('.navbar-links');
const body = document.body;

// Wait for page to load
window.addEventListener('load', () => {
    // Hide loader after page loads
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);
    
    // Initialize any components that need setup
    initMouseFollower();
    initThemeToggle();
    initMobileNavigation();
    initTickerAnimation();
    initCharts();
});

// Mouse follower effect
function initMouseFollower() {
    if (window.innerWidth > 1023) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            
            // Add a slight delay for smooth following effect
            setTimeout(() => {
                mouseFollower.style.left = `${clientX}px`;
                mouseFollower.style.top = `${clientY}px`;
            }, 50);
            
            // Expand follower when hovering over interactive elements
            const target = e.target;
            if (target.tagName === 'A' || target.tagName === 'BUTTON' || 
                target.closest('a') || target.closest('button')) {
                mouseFollower.style.width = '50px';
                mouseFollower.style.height = '50px';
                mouseFollower.style.backgroundColor = 'rgba(239, 41, 29, 0.3)';
            } else {
                mouseFollower.style.width = '30px';
                mouseFollower.style.height = '30px';
                mouseFollower.style.backgroundColor = 'rgba(239, 41, 29, 0.2)';
            }
        });
    }
}

// Theme toggle (dark/light mode)
function initThemeToggle() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        if (body.classList.contains('light-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Mobile navigation
function initMobileNavigation() {
    navbarToggle.addEventListener('click', () => {
        navbarToggle.classList.toggle('active');
        navbarLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar-toggle') && !e.target.closest('.navbar-links')) {
            navbarToggle.classList.remove('active');
            navbarLinks.classList.remove('active');
        }
    });
}

// Market ticker animation
function initTickerAnimation() {
    const ticker = document.querySelector('.ticker');
    if (!ticker) return;
    
    // Clone ticker items for continuous scrolling
    const tickerItems = ticker.innerHTML;
    ticker.innerHTML = tickerItems + tickerItems;
    
    // Update ticker data periodically (simulated for demo)
    setInterval(() => {
        updateTickerData();
    }, 5000);
}

// Simulated ticker data update
function updateTickerData() {
    const tickerItems = document.querySelectorAll('.ticker-item');
    if (!tickerItems.length) return;
    
    tickerItems.forEach(item => {
        const changeElement = item.querySelector('.ticker-change');
        const valueElement = item.querySelector('.ticker-value');
        
        if (changeElement && valueElement) {
            // Simulate random price changes
            const currentValue = parseFloat(valueElement.textContent.replace(/,/g, ''));
            const randomChange = (Math.random() * 2 - 1) * (currentValue * 0.01);
            const newValue = currentValue + randomChange;
            
            // Format the new value
            valueElement.textContent = newValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            
            // Update change percentage and direction
            const changePercent = (randomChange / currentValue * 100).toFixed(2);
            const isPositive = randomChange >= 0;
            
            changeElement.textContent = `${isPositive ? '+' : ''}${changePercent}%`;
            changeElement.className = `ticker-change ${isPositive ? 'up' : 'down'}`;
            valueElement.className = `ticker-value ${isPositive ? 'up' : 'down'}`;
        }
    });
}

// Initialize charts if they exist on the page
function initCharts() {
    // Market Performance Chart
    const marketChartElement = document.getElementById('market-performance-chart');
    if (marketChartElement) {
        const marketChart = new Chart(marketChartElement, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'S&P 500',
                        data: [4500, 4450, 4600, 4700, 4650, 4800, 4900, 5000, 4950, 5100, 5200, 5150],
                        borderColor: '#ef291d',
                        backgroundColor: 'rgba(239, 41, 29, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'NASDAQ',
                        data: [14000, 13800, 14200, 14500, 14300, 14800, 15200, 15500, 15300, 15800, 16000, 15800],
                        borderColor: '#4285F4',
                        backgroundColor: 'rgba(66, 133, 244, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'DOW',
                        data: [35000, 34800, 35500, 36000, 35800, 36500, 37000, 37500, 37200, 38000, 38500, 38300],
                        borderColor: '#34A853',
                        backgroundColor: 'rgba(52, 168, 83, 0.1)',
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: body.classList.contains('light-mode') ? '#000000' : '#FFFFF0'
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: body.classList.contains('light-mode') ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 240, 0.1)'
                        },
                        ticks: {
                            color: body.classList.contains('light-mode') ? '#000000' : '#FFFFF0'
                        }
                    },
                    y: {
                        grid: {
                            color: body.classList.contains('light-mode') ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 240, 0.1)'
                        },
                        ticks: {
                            color: body.classList.contains('light-mode') ? '#000000' : '#FFFFF0'
                        }
                    }
                }
            }
        });
        
        // Update chart colors when theme changes
        themeToggle.addEventListener('click', () => {
            const textColor = body.classList.contains('light-mode') ? '#000000' : '#FFFFF0';
            const gridColor = body.classList.contains('light-mode') ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 240, 0.1)';
            
            marketChart.options.plugins.legend.labels.color = textColor;
            marketChart.options.scales.x.grid.color = gridColor;
            marketChart.options.scales.x.ticks.color = textColor;
            marketChart.options.scales.y.grid.color = gridColor;
            marketChart.options.scales.y.ticks.color = textColor;
            
            marketChart.update();
        });
    }
    
    // Sector Performance Chart
    const sectorChartElement = document.getElementById('sector-performance-chart');
    if (sectorChartElement) {
        const sectorChart = new Chart(sectorChartElement, {
            type: 'bar',
            data: {
                labels: ['Technology', 'Healthcare', 'Financials', 'Consumer', 'Energy', 'Utilities', 'Materials', 'Real Estate'],
                datasets: [{
                    label: 'YTD Performance (%)',
                    data: [15.2, 8.7, 6.3, 4.1, -2.5, 1.8, 3.2, -1.5],
                    backgroundColor: [
                        '#ef291d',
                        '#4285F4',
                        '#FBBC05',
                        '#34A853',
                        '#EA4335',
                        '#5F6368',
                        '#1A73E8',
                        '#BDC1C6'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y > 0 ? '+' + context.parsed.y + '%' : context.parsed.y + '%';
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: body.classList.contains('light-mode') ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 240, 0.1)'
                        },
                        ticks: {
                            color: body.classList.contains('light-mode') ? '#000000' : '#FFFFF0'
                        }
                    },
                    y: {
                        grid: {
                            color: body.classList.contains('light-mode') ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 240, 0.1)'
                        },
                        ticks: {
                            color: body.classList.contains('light-mode') ? '#000000' : '#FFFFF0',
                            callback: function(value) {
                                return value > 0 ? '+' + value + '%' : value + '%';
                            }
                        }
                    }
                }
            }
        });
        
        // Update chart colors when theme changes
        themeToggle.addEventListener('click', () => {
            const textColor = body.classList.contains('light-mode') ? '#000000' : '#FFFFF0';
            const gridColor = body.classList.contains('light-mode') ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 240, 0.1)';
            
            sectorChart.options.scales.x.grid.color = gridColor;
            sectorChart.options.scales.x.ticks.color = textColor;
            sectorChart.options.scales.y.grid.color = gridColor;
            sectorChart.options.scales.y.ticks.color = textColor;
            
            sectorChart.update();
        });
    }
    
    // Economic Indicators Chart
    const economicChartElement = document.getElementById('economic-indicators-chart');
    if (economicChartElement) {
        const economicChart = new Chart(economicChartElement, {
            type: 'line',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024', '2025 (Projected)'],
                datasets: [
                    {
                        label: 'GDP Growth (%)',
                        data: [-3.5, 5.7, 2.1, 2.5, 2.3, 2.0],
                        borderColor: '#ef291d',
                        backgroundColor: 'rgba(239, 41, 29, 0.1)',
                        tension: 0.4,
                        fill: true,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Inflation Rate (%)',
                        data: [1.4, 7.0, 6.5, 3.1, 2.7, 2.3],
                        borderColor: '#4285F4',
                        backgroundColor: 'rgba(66, 133, 244, 0.1)',
                        tension: 0.4,
                        fill: true,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Unemployment Rate (%)',
                        data: [8.1, 5.4, 3.6, 3.7, 3.9, 4.0],
                        borderColor: '#FBBC05',
                        backgroundColor: 'rgba(251, 188, 5, 0.1)',
                        tension: 0.4,
                        fill: true,
                        yAxisID: 'y'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: body.classList.contains('light-mode') ? '#000000' : '#FFFFF0'
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: body.classList.contains('light-mode') ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 240, 0.1)'
                        },
                        ticks: {
                            color: body.classList.contains('light-mode') ? '#000000' : '#FFFFF0'
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        grid: {
                            color: body.classList.contains('light-mode') ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 240, 0.1)'
                        },
                        ticks: {
                            color: body.classList.contains('light-mode') ? '#000000' : '#FFFFF0'
                        }
                    }
                }
            }
        });
        
        // Update chart colors when theme changes
        themeToggle.addEventListener('click', () => {
            const textColor = body.classList.contains('light-mode') ? '#000000' : '#FFFFF0';
            const gridColor = body.classList.contains('light-mode') ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 240, 0.1)';
            
            economicChart.options.plugins.legend.labels.color = textColor;
            economicChart.options.scales.x.grid.color = gridColor;
            economicChart.options.scales.x.ticks.color = textColor;
            economicChart.options.scales.y.grid.color = gridColor;
            economicChart.options.scales.y.ticks.color = textColor;
            
            economicChart.update();
        });
    }
}

// Tab functionality for visualization section
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length && tabContents.length) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const tabId = button.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
});

// Contentful Integration
// This section will be populated with Contentful API calls
// when the CMS integration is implemented

// Function to fetch articles from Contentful
async function fetchArticles(category = null, limit = 6) {
    try {
        // This will be replaced with actual Contentful API calls
        console.log(`Fetching articles for category: ${category}, limit: ${limit}`);
        
        // For now, return mock data
        return mockArticles.filter(article => {
            if (category) {
                return article.category.toLowerCase() === category.toLowerCase();
            }
            return true;
        }).slice(0, limit);
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
}

// Function to fetch market data from Contentful
async function fetchMarketData() {
    try {
        // This will be replaced with actual Contentful API calls
        console.log('Fetching market data');
        
        // For now, return mock data
        return mockMarketData;
    } catch (error) {
        console.error('Error fetching market data:', error);
        return [];
    }
}

// Function to render articles on the page
function renderArticles(articles, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let html = '';
    
    articles.forEach(article => {
        html += `
            <div class="article-card">
                <div class="article-image" style="background-image: url('${article.imageUrl}')"></div>
                <div class="article-content">
                    <div class="article-category">${article.category}</div>
                    <h3 class="article-title">${article.title}</h3>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <div class="article-meta">
                        <span class="article-author">By ${article.author}</span>
                        <span class="article-date">${article.date}</span>
                    </div>
                    <a href="${article.url}" class="article-link">Read More</a>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Mock data for development (will be replaced with Contentful data)
const mockArticles = [
    {
        title: 'Global Markets Rally as Central Banks Signal Coordinated Policy Shift',
        category: 'Markets',
        excerpt: 'Major indices surge as Federal Reserve, ECB, and Bank of Japan announce synchronized approach to combat inflation while supporting economic growth.',
        author: 'Jonathan Pierce',
        date: 'April 5, 2025',
        imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        url: 'articles/global-markets-rally.html'
    },
    {
        title: 'Tech Sector Faces Valuation Reset Amid Rising Interest Rates',
        category: 'Markets',
        excerpt: 'Investors reassess growth projections as borrowing costs increase, particularly impacting companies with distant profitability horizons.',
        author: 'Rachel Kim',
        date: 'April 4, 2025',
        imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        url: 'articles/tech-sector-valuation-reset.html'
    },
    {
        title: 'Emerging Markets Outperform as Dollar Weakens',
        category: 'Markets',
        excerpt: 'Developing economies see capital inflows accelerate as currency pressures ease and commodity prices stabilize.',
        author: 'Miguel Santos',
        date: 'April 2, 2025',
        imageUrl: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        url: 'articles/emerging-markets-outperform.html'
    },
    {
        title: 'Energy Transition Creates New Market Leaders',
        category: 'Markets',
        excerpt: 'Traditional oil majors lose ground to renewable specialists as institutional investors reallocate capital toward sustainable energy solutions.',
        author: 'Emma Johnson',
        date: 'March 30, 2025',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        url: 'articles/energy-transition-market-leaders.html'
    },
    {
        title: 'AI Revolution in Financial Analysis: Beyond the Hype',
        category: 'Analysis',
        excerpt: 'How artificial intelligence is transforming investment research and creating new opportunities for quantitative strategies.',
        author: 'David Chen',
        date: 'April 3, 2025',
        imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        url: 'articles/ai-revolution-financial-analysis.html'
    },
    {
        title: 'Central Bank Digital Currencies: A Monetary Policy Revolution',
        category: 'Policy',
        excerpt: 'How CBDCs will fundamentally transform monetary policy implementation, providing central banks with unprecedented precision in targeting economic outcomes.',
        author: 'Robert Kiyosaki',
        date: 'March 18, 2025',
        imageUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        url: 'articles/cbdc-monetary-policy.html'
    }
];

const mockMarketData = [
    { symbol: 'S&P 500', value: '4,766.18', change: '+0.41%', direction: 'up' },
    { symbol: 'NASDAQ', value: '15,645.23', change: '+0.63%', direction: 'up' },
    { symbol: 'DOW', value: '36,338.30', change: '-0.16%', direction: 'down' },
    { symbol: 'BTC/USD', value: '46,219.50', change: '+1.27%', direction: 'up' },
    { symbol: 'EUR/USD', value: '1.1372', change: '-0.05%', direction: 'down' },
    { symbol: 'GOLD', value: '1,829.20', change: '+0.32%', direction: 'up' },
    { symbol: 'OIL', value: '75.21', change: '+0.87%', direction: 'up' },
    { symbol: '10Y-T', value: '1.512', change: '-0.02%', direction: 'down' }
];

// Initialize page with mock data if needed
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on a page that needs articles
    const articlesContainer = document.getElementById('featured-articles') || 
                             document.getElementById('market-articles') ||
                             document.getElementById('analysis-articles') ||
                             document.getElementById('policy-articles') ||
                             document.getElementById('opinion-articles');
    
    if (articlesContainer) {
        const category = articlesContainer.getAttribute('data-category');
        fetchArticles(category).then(articles => {
            renderArticles(articles, articlesContainer.id);
        });
    }
});
