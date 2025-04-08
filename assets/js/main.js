/**
 * Fershman Financial - Main JavaScript
 * Implements interactive elements and animations for the premium financial journal
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loader
    initLoader();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize mouse follower
    initMouseFollower();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize 3D effects
    init3DEffects();
    
    // Initialize market ticker
    initMarketTicker();
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize charts if they exist
    initCharts();
});

/**
 * Initialize page loader
 */
function initLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;
    
    // Hide loader after page is loaded
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('hidden');
            // Enable scroll after loader is hidden
            document.body.style.overflow = 'auto';
        }, 1000);
    });
    
    // Disable scroll while loader is visible
    document.body.style.overflow = 'hidden';
}

/**
 * Initialize navigation functionality
 */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarLinks = document.querySelector('.navbar-links');
    
    if (!navbar) return;
    
    // Add scrolled class to navbar when scrolling
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Toggle mobile menu
    if (navbarToggle && navbarLinks) {
        navbarToggle.addEventListener('click', function() {
            navbarLinks.classList.toggle('active');
            navbarToggle.classList.toggle('active');
        });
    }
    
    // Set active nav link based on current page
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPage.includes(linkPath) && linkPath !== '/') {
            link.classList.add('active');
        } else if (currentPage === '/' && linkPath === '/') {
            link.classList.add('active');
        }
    });
}

/**
 * Initialize mouse follower effect
 */
function initMouseFollower() {
    const mouseFollower = document.querySelector('.mouse-follower');
    if (!mouseFollower) return;
    
    // Only show on desktop
    if (window.innerWidth > 992) {
        mouseFollower.style.display = 'block';
        
        document.addEventListener('mousemove', function(e) {
            mouseFollower.style.left = e.clientX + 'px';
            mouseFollower.style.top = e.clientY + 'px';
        });
        
        // Enlarge on hover over links and buttons
        const interactiveElements = document.querySelectorAll('a, button, .article-card, .featured-article, .data-card, .opinion-quote');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                mouseFollower.style.width = '50px';
                mouseFollower.style.height = '50px';
                mouseFollower.style.backgroundColor = 'rgba(239, 41, 29, 0.3)';
            });
            
            element.addEventListener('mouseleave', function() {
                mouseFollower.style.width = '30px';
                mouseFollower.style.height = '30px';
                mouseFollower.style.backgroundColor = 'rgba(239, 41, 29, 0.2)';
            });
        });
    }
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    // Animate elements when they come into view
    const animatedElements = document.querySelectorAll('.fade-in, .article-card, .featured-article, .data-card, .opinion-quote, .team-member, .value-card');
    
    if (animatedElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroSection && heroContent) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < heroSection.offsetHeight) {
                heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
            }
        });
    }
}

/**
 * Initialize 3D effects
 */
function init3DEffects() {
    // 3D hover effect for cards
    const cards = document.querySelectorAll('.article-card, .featured-article, .data-card, .opinion-quote, .team-member, .value-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            if (window.innerWidth <= 992) return;
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
    
    // Button hover effect
    const buttons = document.querySelectorAll('.hero-cta, .premium-button, .submit-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (window.innerWidth <= 992) return;
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

/**
 * Initialize market ticker
 */
function initMarketTicker() {
    const ticker = document.querySelector('.ticker');
    if (!ticker) return;
    
    // Clone ticker items to create continuous loop
    const tickerItems = ticker.querySelectorAll('.ticker-item');
    tickerItems.forEach(item => {
        const clone = item.cloneNode(true);
        ticker.appendChild(clone);
    });
    
    // Update ticker data every 30 seconds
    setInterval(updateTickerData, 30000);
}

/**
 * Update ticker data with random values (placeholder for API integration)
 */
function updateTickerData() {
    const tickerItems = document.querySelectorAll('.ticker-item');
    
    tickerItems.forEach(item => {
        const tickerChange = item.querySelector('.ticker-change');
        if (!tickerChange) return;
        
        // Generate random change value between -2 and 2
        const change = (Math.random() * 4 - 2).toFixed(2);
        const isPositive = parseFloat(change) >= 0;
        
        tickerChange.textContent = isPositive ? `+${change}%` : `${change}%`;
        tickerChange.classList.remove('up', 'down');
        tickerChange.classList.add(isPositive ? 'up' : 'down');
    });
}

/**
 * Initialize theme toggle
 */
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.remove('dark', 'light');
        document.body.classList.add(savedTheme);
        updateThemeIcon(savedTheme);
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', function() {
        const isDark = document.body.classList.contains('dark');
        const newTheme = isDark ? 'light' : 'dark';
        
        document.body.classList.remove('dark', 'light');
        document.body.classList.add(newTheme);
        
        // Save theme preference
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        updateThemeIcon(newTheme);
    });
}

/**
 * Update theme toggle icon based on current theme
 */
function updateThemeIcon(theme) {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    if (!icon) return;
    
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

/**
 * Initialize charts if they exist on the page
 */
function initCharts() {
    const chartContainers = document.querySelectorAll('.chart-container');
    if (chartContainers.length === 0) return;
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        // Load Chart.js dynamically
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = createCharts;
        document.head.appendChild(script);
    } else {
        createCharts();
    }
}

/**
 * Create charts using Chart.js
 */
function createCharts() {
    const chartContainers = document.querySelectorAll('.chart-container');
    
    chartContainers.forEach((container, index) => {
        const canvas = document.createElement('canvas');
        canvas.id = `chart-${index}`;
        container.appendChild(canvas);
        
        // Create different chart types based on index
        if (index % 3 === 0) {
            createLineChart(canvas.id);
        } else if (index % 3 === 1) {
            createBarChart(canvas.id);
        } else {
            createPieChart(canvas.id);
        }
    });
}

/**
 * Create a line chart
 */
function createLineChart(canvasId) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    // Generate random data
    const data = Array.from({length: 12}, () => Math.floor(Math.random() * 100));
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(239, 41, 29, 0.8)');
    gradient.addColorStop(1, 'rgba(239, 41, 29, 0)');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Market Performance',
                data: data,
                borderColor: '#ef291d',
                backgroundColor: gradient,
                borderWidth: 3,
                pointBackgroundColor: '#ef291d',
                pointBorderColor: '#fff',
                pointRadius: 4,
                tension: 0.3,
                fill: true
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
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#FFFFF0',
                    bodyColor: '#FFFFF0',
                    borderColor: '#ef291d',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: getComputedStyle(document.body).getPropertyValue('--text-secondary')
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: getComputedStyle(document.body).getPropertyValue('--text-secondary')
                    }
                }
            }
        }
    });
}

/**
 * Create a bar chart
 */
function createBarChart(canvasId) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    // Generate random data
    const data = Array.from({length: 6}, () => Math.floor(Math.random() * 100));
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025'],
            datasets: [{
                label: 'Quarterly Growth',
                data: data,
                backgroundColor: '#ef291d',
                borderRadius: 5,
                barThickness: 20
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
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#FFFFF0',
                    bodyColor: '#FFFFF0',
                    borderColor: '#ef291d',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: getComputedStyle(document.body).getPropertyValue('--text-secondary')
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: getComputedStyle(document.body).getPropertyValue('--text-secondary')
                    }
                }
            }
        }
    });
}

/**
 * Create a pie chart
 */
function createPieChart(canvasId) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Technology', 'Finance', 'Healthcare', 'Energy', 'Consumer Goods'],
            datasets: [{
                data: [30, 25, 20, 15, 10],
                backgroundColor: [
                    '#ef291d',
                    '#001F3F',
                    '#28a745',
                    '#ffc107',
                    '#6f42c1'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        color: getComputedStyle(document.body).getPropertyValue('--text-secondary')
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#FFFFF0',
                    bodyColor: '#FFFFF0',
                    borderColor: '#ef291d',
                    borderWidth: 1
                }
            }
        }
    });
}

/**
 * Initialize content from Contentful if available
 */
if (typeof contentful !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize Contentful renderer
        initContentfulRenderer();
    });
}

/**
 * Initialize Contentful content renderer
 */
function initContentfulRenderer() {
    // Check if contentful.js is loaded
    if (typeof contentRenderer === 'undefined') return;
    
    // Render featured articles
    if (document.querySelector('.featured-grid')) {
        contentRenderer.renderFeaturedArticles();
    }
    
    // Render articles by category
    const articleGrids = document.querySelectorAll('[data-category]');
    articleGrids.forEach(grid => {
        const category = grid.getAttribute('data-category');
        contentRenderer.renderArticlesByCategory(category, grid);
    });
    
    // Render market data
    if (document.querySelector('.ticker')) {
        contentRenderer.renderMarketData();
    }
    
    // Render expert opinions
    if (document.querySelector('.opinion-container')) {
        contentRenderer.renderExpertOpinions();
    }
    
    // Render article content if on article page
    if (document.querySelector('.article-body')) {
        const articleId = getArticleIdFromUrl();
        if (articleId) {
            contentRenderer.renderArticleContent(articleId);
        }
    }
}

/**
 * Get article ID from URL
 */
function getArticleIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

/**
 * Handle form submissions
 */
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const formContainer = form.parentElement;
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your submission has been received.';
            
            // Replace form with success message
            formContainer.innerHTML = '';
            formContainer.appendChild(successMessage);
        });
    });
});
