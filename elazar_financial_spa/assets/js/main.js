/* Main JavaScript for Fershman Financial */

// Initialize mouse follower effect
function initMouseFollower() {
  const follower = document.querySelector('.mouse-follower');
  if (!follower) return;
  
  document.addEventListener('mousemove', (e) => {
    follower.style.left = e.clientX + 'px';
    follower.style.top = e.clientY + 'px';
  });
  
  // Add hover effect for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .article-card, .featured-article, .nav-link');
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      follower.classList.add('hover');
    });
    element.addEventListener('mouseleave', () => {
      follower.classList.remove('hover');
    });
  });
}

// Initialize theme toggle
function initThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  if (!themeToggle) return;
  
  // Check for saved theme preference or use default
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.body.classList.add(currentTheme);
  
  // Update icon based on current theme
  updateThemeIcon(currentTheme);
  
  // Toggle theme on click
  themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('dark')) {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      localStorage.setItem('theme', 'light');
      updateThemeIcon('light');
    } else {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      updateThemeIcon('dark');
    }
  });
  
  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
      icon.className = 'fas fa-sun';
    } else {
      icon.className = 'fas fa-moon';
    }
  }
}

// Initialize mobile navigation
function initMobileNavigation() {
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarLinks = document.querySelector('.navbar-links');
  
  if (!navbarToggle || !navbarLinks) return;
  
  navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarLinks.classList.toggle('active');
  });
  
  // Close mobile menu when a link is clicked
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbarToggle.classList.remove('active');
      navbarLinks.classList.remove('active');
    });
  });
}

// Initialize ticker animation
function initTickerAnimation() {
  const ticker = document.querySelector('.ticker');
  if (!ticker) return;
  
  // Clone ticker items for continuous scrolling
  const tickerItems = ticker.innerHTML;
  ticker.innerHTML = tickerItems + tickerItems;
  
  // Start animation
  ticker.classList.add('animate');
  
  // Pause animation on hover
  ticker.addEventListener('mouseenter', () => {
    ticker.classList.remove('animate');
  });
  
  ticker.addEventListener('mouseleave', () => {
    ticker.classList.add('animate');
  });
}

// Initialize charts
function initCharts() {
  // Market Performance Chart
  const marketPerformanceChart = document.getElementById('market-performance-chart');
  if (marketPerformanceChart) {
    new Chart(marketPerformanceChart, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'S&P 500',
            data: [4500, 4450, 4600, 4700, 4650, 4800, 4900, 5000, 4950, 5100, 5200, 5300],
            borderColor: '#ef291d',
            backgroundColor: 'rgba(239, 41, 29, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'NASDAQ',
            data: [14000, 13800, 14200, 14500, 14300, 14800, 15000, 15200, 15100, 15500, 15700, 16000],
            borderColor: '#3366cc',
            backgroundColor: 'rgba(51, 102, 204, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'DOW',
            data: [35000, 34800, 35200, 35500, 35300, 35800, 36000, 36200, 36100, 36500, 36700, 37000],
            borderColor: '#33cc33',
            backgroundColor: 'rgba(51, 204, 51, 0.1)',
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
              color: document.body.classList.contains('dark') ? '#FFFFF0' : '#000000'
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
              color: document.body.classList.contains('dark') ? 'rgba(255, 255, 240, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              color: document.body.classList.contains('dark') ? '#FFFFF0' : '#000000'
            }
          },
          y: {
            grid: {
              color: document.body.classList.contains('dark') ? 'rgba(255, 255, 240, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              color: document.body.classList.contains('dark') ? '#FFFFF0' : '#000000'
            }
          }
        }
      }
    });
  }
  
  // Sector Performance Chart
  const sectorPerformanceChart = document.getElementById('sector-performance-chart');
  if (sectorPerformanceChart) {
    new Chart(sectorPerformanceChart, {
      type: 'bar',
      data: {
        labels: ['Technology', 'Healthcare', 'Financials', 'Consumer Discretionary', 'Industrials', 'Energy', 'Materials', 'Utilities', 'Real Estate', 'Consumer Staples', 'Communication Services'],
        datasets: [
          {
            label: 'YTD Performance (%)',
            data: [15.2, 8.7, 6.3, 9.1, 5.8, -2.4, 3.2, 1.5, 4.7, 2.9, 7.6],
            backgroundColor: [
              '#ef291d',
              '#3366cc',
              '#33cc33',
              '#ffcc00',
              '#ff9900',
              '#cc66ff',
              '#ff6666',
              '#66ccff',
              '#99cc00',
              '#ff99cc',
              '#999999'
            ]
          }
        ]
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
                return context.raw + '%';
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: document.body.classList.contains('dark') ? 'rgba(255, 255, 240, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              color: document.body.classList.contains('dark') ? '#FFFFF0' : '#000000'
            }
          },
          y: {
            grid: {
              color: document.body.classList.contains('dark') ? 'rgba(255, 255, 240, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              color: document.body.classList.contains('dark') ? '#FFFFF0' : '#000000',
              callback: function(value) {
                return value + '%';
              }
            }
          }
        }
      }
    });
  }
  
  // Economic Indicators Chart
  const economicIndicatorsChart = document.getElementById('economic-indicators-chart');
  if (economicIndicatorsChart) {
    new Chart(economicIndicatorsChart, {
      type: 'line',
      data: {
        labels: ['2020 Q1', '2020 Q2', '2020 Q3', '2020 Q4', '2021 Q1', '2021 Q2', '2021 Q3', '2021 Q4', '2022 Q1', '2022 Q2', '2022 Q3', '2022 Q4', '2023 Q1', '2023 Q2', '2023 Q3', '2023 Q4', '2024 Q1', '2024 Q2', '2024 Q3', '2024 Q4'],
        datasets: [
          {
            label: 'GDP Growth (%)',
            data: [-5.1, -31.2, 33.8, 4.5, 6.3, 6.7, 2.3, 6.9, -1.6, -0.6, 3.2, 2.6, 2.0, 2.1, 4.9, 3.3, 1.6, 2.8, 3.1, 3.4],
            borderColor: '#ef291d',
            backgroundColor: 'rgba(239, 41, 29, 0.1)',
            tension: 0.4,
            yAxisID: 'y'
          },
          {
            label: 'Inflation Rate (%)',
            data: [2.1, 0.4, 1.3, 1.4, 2.6, 4.8, 5.3, 7.0, 8.0, 8.6, 8.2, 7.1, 6.0, 4.0, 3.7, 3.4, 3.1, 3.0, 2.8, 2.6],
            borderColor: '#3366cc',
            backgroundColor: 'rgba(51, 102, 204, 0.1)',
            tension: 0.4,
            yAxisID: 'y'
          },
          {
            label: 'Unemployment Rate (%)',
            data: [3.5, 13.0, 8.8, 6.7, 6.0, 5.9, 4.8, 3.9, 3.6, 3.6, 3.5, 3.5, 3.4, 3.6, 3.8, 3.7, 3.8, 3.9, 3.8, 3.7],
            borderColor: '#33cc33',
            backgroundColor: 'rgba(51, 204, 51, 0.1)',
            tension: 0.4,
            yAxisID: 'y'
          },
          {
            label: 'Federal Funds Rate (%)',
            data: [0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.50, 1.75, 3.25, 4.50, 5.00, 5.25, 5.50, 5.50, 5.50, 5.25, 5.00, 4.75],
            borderColor: '#ffcc00',
            backgroundColor: 'rgba(255, 204, 0, 0.1)',
            tension: 0.4,
            yAxisID: 'y'
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
              color: document.body.classList.contains('dark') ? '#FFFFF0' : '#000000'
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.raw + '%';
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: document.body.classList.contains('dark') ? 'rgba(255, 255, 240, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              color: document.body.classList.contains('dark') ? '#FFFFF0' : '#000000'
            }
          },
          y: {
            grid: {
              color: document.body.classList.contains('dark') ? 'rgba(255, 255, 240, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              color: document.body.classList.contains('dark') ? '#FFFFF0' : '#000000',
              callback: function(value) {
                return value + '%';
              }
            }
          }
        }
      }
    });
  }
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Hide loader after content is loaded
  setTimeout(() => {
    document.querySelector('.loader').classList.add('hidden');
  }, 1500);
  
  // Initialize features
  initMouseFollower();
  initThemeToggle();
  initMobileNavigation();
  initTickerAnimation();
  initCharts();
});
