/**
 * Fershman Financial - Elite Economic Journal
 * Main JavaScript File
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoader();
    initMouseFollower();
    initNavbar();
    initHeroParallax();
    initMarketTicker();
    initDataVisualization();
    initScrollAnimations();
    initHoverEffects();
    initThemeToggle();
    init3DElements();
});

/**
 * Loader Animation
 */
function initLoader() {
    const loader = document.querySelector('.loader');
    
    // Hide loader after page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('hidden');
            // Enable scrolling on body
            document.body.style.overflow = 'auto';
        }, 1500);
    });
    
    // Disable scrolling while loader is active
    document.body.style.overflow = 'hidden';
}

/**
 * Mouse Follower Effect
 */
function initMouseFollower() {
    const mouseFollower = document.querySelector('.mouse-follower');
    const links = document.querySelectorAll('a, button, .nav-link, .cta-button');
    
    // Update mouse follower position
    document.addEventListener('mousemove', function(e) {
        // Add active class after first mouse movement
        if (!mouseFollower.classList.contains('active')) {
            mouseFollower.classList.add('active');
        }
        
        // Smooth follow with slight delay using CSS transform
        mouseFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
    
    // Enlarge follower when hovering over interactive elements
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            mouseFollower.classList.add('hover');
        });
        
        link.addEventListener('mouseleave', function() {
            mouseFollower.classList.remove('hover');
        });
    });
    
    // Hide follower when leaving window
    document.addEventListener('mouseleave', function() {
        mouseFollower.classList.remove('active');
    });
    
    // Show follower when entering window
    document.addEventListener('mouseenter', function() {
        mouseFollower.classList.add('active');
    });
}

/**
 * Navbar Functionality
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarLinks = document.querySelector('.navbar-links');
    
    // Change navbar style on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navbarToggle.addEventListener('click', function() {
        navbarToggle.classList.toggle('active');
        navbarLinks.classList.toggle('active');
        
        // Disable/enable scrolling when menu is open/closed
        if (navbarLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbarToggle.classList.remove('active');
            navbarLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

/**
 * Hero Parallax Effect
 */
function initHeroParallax() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('mousemove', function(e) {
        // Calculate mouse position relative to center of screen
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        // Apply subtle parallax effect to hero content
        heroContent.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
    });
    
    // Parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        hero.style.backgroundPosition = `center ${50 + scrollPosition * 0.05}%`;
    });
}

/**
 * Market Ticker Animation
 */
function initMarketTicker() {
    const ticker = document.querySelector('.ticker');
    
    // Clone ticker items to create continuous loop
    const tickerItems = document.querySelectorAll('.ticker-item');
    tickerItems.forEach(item => {
        const clone = item.cloneNode(true);
        ticker.appendChild(clone);
    });
    
    // Update ticker values periodically to simulate live data
    setInterval(function() {
        const tickerValues = document.querySelectorAll('.ticker-value');
        const tickerChanges = document.querySelectorAll('.ticker-change');
        
        tickerValues.forEach((value, index) => {
            // Generate random price change
            const currentValue = parseFloat(value.textContent.replace(',', ''));
            const change = (Math.random() - 0.45) * currentValue * 0.01; // Slightly biased towards up
            const newValue = currentValue + change;
            
            // Format new value
            let formattedValue;
            if (currentValue > 1000) {
                formattedValue = newValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            } else if (currentValue > 100) {
                formattedValue = newValue.toFixed(2);
            } else {
                formattedValue = newValue.toFixed(4);
            }
            
            // Calculate percentage change
            const percentChange = (change / currentValue * 100).toFixed(2);
            const changeText = `${percentChange > 0 ? '+' : ''}${percentChange}%`;
            
            // Update corresponding ticker change element
            const changeElement = tickerChanges[index];
            
            // Apply changes with animation
            setTimeout(() => {
                // Update value and change direction
                value.textContent = formattedValue;
                changeElement.textContent = changeText;
                
                // Update classes for styling
                if (change > 0) {
                    value.className = 'ticker-value up';
                    changeElement.className = 'ticker-change up';
                } else {
                    value.className = 'ticker-value down';
                    changeElement.className = 'ticker-change down';
                }
            }, index * 100); // Stagger updates for visual effect
        });
    }, 5000); // Update every 5 seconds
}

/**
 * Data Visualization Charts
 */
function initDataVisualization() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Initialize chart for active tab
            initChart(tabId);
        });
    });
    
    // Initialize default chart (first tab)
    initChart('market-trends');
    
    // Chart initialization function
    function initChart(chartId) {
        let ctx, chart, data, options;
        
        // Common chart options
        const commonOptions = {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            },
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
                    borderWidth: 1,
                    padding: 10,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('en-US', { 
                                    style: 'decimal',
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2 
                                }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            hover: {
                mode: 'nearest',
                intersect: false
            }
        };
        
        // Get canvas context
        ctx = document.getElementById(chartId + '-chart').getContext('2d');
        
        // Clear previous chart if exists
        if (window[chartId + 'Chart']) {
            window[chartId + 'Chart'].destroy();
        }
        
        // Create chart based on tab ID
        switch(chartId) {
            case 'market-trends':
                // Market trends line chart
                data = {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [
                        {
                            label: 'S&P 500',
                            data: [4766, 4515, 4530, 4545, 4158, 4300, 4500, 4650, 4800, 4900, 5000, 5100],
                            borderColor: '#ef291d',
                            backgroundColor: 'rgba(239, 41, 29, 0.1)',
                            borderWidth: 2,
                            pointRadius: 3,
                            pointBackgroundColor: '#ef291d',
                            tension: 0.4,
                            fill: true
                        },
                        {
                            label: 'NASDAQ',
                            data: [15645, 14316, 14220, 14261, 12775, 13300, 14000, 14500, 15000, 15500, 16000, 16500],
                            borderColor: '#1d72ef',
                            backgroundColor: 'rgba(29, 114, 239, 0.1)',
                            borderWidth: 2,
                            pointRadius: 3,
                            pointBackgroundColor: '#1d72ef',
                            tension: 0.4,
                            fill: true
                        },
                        {
                            label: 'DOW',
                            data: [36338, 35132, 34678, 34583, 33212, 34000, 35000, 36000, 37000, 38000, 39000, 40000],
                            borderColor: '#1def91',
                            backgroundColor: 'rgba(29, 239, 145, 0.1)',
                            borderWidth: 2,
                            pointRadius: 3,
                            pointBackgroundColor: '#1def91',
                            tension: 0.4,
                            fill: true
                        }
                    ]
                };
                
                options = {
                    ...commonOptions,
                    plugins: {
                        ...commonOptions.plugins,
                        tooltip: {
                            ...commonOptions.plugins.tooltip,
                            callbacks: {
                                ...commonOptions.plugins.tooltip.callbacks,
                                title: function(tooltipItems) {
                                    return '2025 - ' + tooltipItems[0].label;
                                }
                            }
                        }
                    }
                };
                
                chart = new Chart(ctx, {
                    type: 'line',
                    data: data,
                    options: options
                });
                
                window[chartId + 'Chart'] = chart;
                break;
                
            case 'sector-performance':
                // Sector performance bar chart
                data = {
                    labels: ['Technology', 'Healthcare', 'Financials', 'Consumer', 'Energy', 'Materials', 'Utilities', 'Real Estate'],
                    datasets: [
                        {
                            label: 'YTD Performance (%)',
                            data: [18.5, 12.3, 8.7, 6.2, -3.5, 5.1, 2.8, -1.9],
                            backgroundColor: function(context) {
                                const value = context.dataset.data[context.dataIndex];
                                return value >= 0 ? 'rgba(29, 239, 145, 0.7)' : 'rgba(239, 41, 29, 0.7)';
                            },
                            borderColor: function(context) {
                                const value = context.dataset.data[context.dataIndex];
                                return value >= 0 ? '#1def91' : '#ef291d';
                            },
                            borderWidth: 1,
                            borderRadius: 4
                        }
                    ]
                };
                
                options = {
                    ...commonOptions,
                    plugins: {
                        ...commonOptions.plugins,
                        tooltip: {
                            ...commonOptions.plugins.tooltip,
                            callbacks: {
                                ...commonOptions.plugins.tooltip.callbacks,
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += context.parsed.y + '%';
                                    }
                                    return label;
                                }
                            }
                        }
                    },
                    scales: {
                        ...commonOptions.scales,
                        y: {
                            ...commonOptions.scales.y,
                            grid: {
                                color: function(context) {
                                    if (context.tick.value === 0) {
                                        return 'rgba(255, 255, 255, 0.2)';
                                    }
                                    return 'rgba(255, 255, 255, 0.05)';
                                }
                            }
                        }
                    }
                };
                
                chart = new Chart(ctx, {
                    type: 'bar',
                    data: data,
                    options: options
                });
                
                window[chartId + 'Chart'] = chart;
                break;
                
            case 'economic-indicators':
                // Economic indicators mixed chart
                data = {
                    labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025'],
                    datasets: [
                        {
                            label: 'GDP Growth (%)',
                            data: [2.1, 2.3, 2.5, 2.4, 2.2, 2.6, 2.7, 2.5],
                            borderColor: '#1d72ef',
                            backgroundColor: 'rgba(29, 114, 239, 0.1)',
                            borderWidth: 2,
                            pointRadius: 4,
                            pointBackgroundColor: '#1d72ef',
                            tension: 0.4,
                            yAxisID: 'y',
                            type: 'line',
                            fill: true
                        },
                        {
                            label: 'Inflation Rate (%)',
                            data: [3.1, 2.9, 2.7, 2.5, 2.4, 2.3, 2.2, 2.1],
                            borderColor: '#ef291d',
                            backgroundColor: 'rgba(239, 41, 29, 0.7)',
                            borderWidth: 1,
                            borderRadius: 4,
                            yAxisID: 'y',
                            type: 'bar'
                        },
                        {
                            label: 'Unemployment Rate (%)',
                            data: [3.8, 3.7, 3.6, 3.5, 3.6, 3.7, 3.6, 3.5],
                            borderColor: '#1def91',
                            backgroundColor: 'transparent',
                            borderWidth: 3,
                            pointRadius: 5,
                            pointBackgroundColor: '#1def91',
                            tension: 0,
                            yAxisID: 'y1',
                            type: 'line',
                            dashed: true,
                            borderDash: [5, 5]
                        }
                    ]
                };
                
                options = {
                    ...commonOptions,
                    scales: {
                        x: {
                            ...commonOptions.scales.x
                        },
                        y: {
                            ...commonOptions.scales.y,
                            position: 'left',
                            title: {
                                display: true,
                                text: 'GDP & Inflation (%)',
                                color: 'rgba(255, 255, 255, 0.7)'
                            },
                            min: 0,
                            max: 5
                        },
                        y1: {
                            ...commonOptions.scales.y,
                            position: 'right',
                            title: {
                                display: true,
                                text: 'Unemployment (%)',
                                color: 'rgba(255, 255, 255, 0.7)'
                            },
                            grid: {
                                drawOnChartArea: false
                            },
                            min: 3,
                            max: 5
                        }
                    },
                    plugins: {
                        ...commonOptions.plugins,
                        tooltip: {
                            ...commonOptions.plugins.tooltip,
                            callbacks: {
                                ...commonOptions.plugins.tooltip.callbacks,
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += context.parsed.y + '%';
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                };
                
                chart = new Chart(ctx, {
                    type: 'line',
                    data: data,
                    options: options
                });
                
                window[chartId + 'Chart'] = chart;
                break;
        }
        
        // Add hover animation to charts
        const chartContainer = document.getElementById(chartId + '-chart');
        
        chartContainer.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.classList.add('chart-ripple');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    }
}

/**
 * Scroll Animations
 */
function initScrollAnimations() {
    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll(
        '.section-header, .analysis-card, .policy-card, .opinion-quote, .visualization-container, .subscription-content'
    );
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animation to child elements if needed
                if (entry.target.classList.contains('analysis-container') || 
                    entry.target.classList.contains('policy-container')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate');
                        }, 150 * index);
                    });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all animated elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .section-header, .analysis-card, .policy-card, .opinion-quote, .visualization-container, .subscription-content {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .section-header.animate, .analysis-card.animate, .policy-card.animate, .opinion-quote.animate, .visualization-container.animate, .subscription-content.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .chart-ripple {
            position: absolute;
            width: 10px;
            height: 10px;
            background-color: rgba(239, 41, 29, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 1s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Hover Effects
 */
function initHoverEffects() {
    // Add 3D hover effect to cards
    const cards = document.querySelectorAll('.analysis-card, .policy-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            // Apply 3D transform
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Add highlight effect
            const shine = this.querySelector('.card-shine') || document.createElement('div');
            if (!this.querySelector('.card-shine')) {
                shine.classList.add('card-shine');
                this.appendChild(shine);
            }
            
            // Position the highlight based on mouse
            shine.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)`;
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            const shine = this.querySelector('.card-shine');
            if (shine) {
                shine.remove();
            }
        });
    });
    
    // Add CSS for card shine effect
    const style = document.createElement('style');
    style.textContent = `
        .card-shine {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Theme Toggle
 */
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    });
}

/**
 * 3D Elements with Three.js
 */
function init3DElements() {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded. Skipping 3D elements.');
        return;
    }
    
    // Hero 3D Scene
    initHero3D();
    
    // Subscription 3D Scene
    initSubscription3D();
    
    // Hero 3D Scene
    function initHero3D() {
        const container = document.getElementById('hero-3d-scene');
        if (!container) return;
        
        // Create scene
        const scene = new THREE.Scene();
        
        // Create camera
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 5;
        
        // Create renderer
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);
        
        // Create lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
        
        // Create bull and bear models
        const bullBearGroup = new THREE.Group();
        scene.add(bullBearGroup);
        
        // Create bull (simplified)
        const bullMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xef291d,
            metalness: 0.8,
            roughness: 0.2
        });
        
        const bullBody = new THREE.Mesh(
            new THREE.CapsuleGeometry(0.5, 1, 4, 8),
            bullMaterial
        );
        bullBody.rotation.x = Math.PI / 2;
        bullBody.position.x = -1;
        
        const bullHead = new THREE.Mesh(
            new THREE.SphereGeometry(0.4, 16, 16),
            bullMaterial
        );
        bullHead.position.set(-1.8, 0, 0);
        
        const bullHorn1 = new THREE.Mesh(
            new THREE.ConeGeometry(0.1, 0.5, 16),
            bullMaterial
        );
        bullHorn1.rotation.z = -Math.PI / 4;
        bullHorn1.position.set(-2, 0.3, 0.2);
        
        const bullHorn2 = new THREE.Mesh(
            new THREE.ConeGeometry(0.1, 0.5, 16),
            bullMaterial
        );
        bullHorn2.rotation.z = -Math.PI / 4;
        bullHorn2.position.set(-2, 0.3, -0.2);
        
        bullBearGroup.add(bullBody, bullHead, bullHorn1, bullHorn2);
        
        // Create bear (simplified)
        const bearMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x1d72ef,
            metalness: 0.8,
            roughness: 0.2
        });
        
        const bearBody = new THREE.Mesh(
            new THREE.CapsuleGeometry(0.5, 1, 4, 8),
            bearMaterial
        );
        bearBody.rotation.x = Math.PI / 2;
        bearBody.position.x = 1;
        
        const bearHead = new THREE.Mesh(
            new THREE.SphereGeometry(0.4, 16, 16),
            bearMaterial
        );
        bearHead.position.set(1.8, 0, 0);
        
        const bearEar1 = new THREE.Mesh(
            new THREE.SphereGeometry(0.15, 16, 16),
            bearMaterial
        );
        bearEar1.position.set(1.9, 0.3, 0.2);
        
        const bearEar2 = new THREE.Mesh(
            new THREE.SphereGeometry(0.15, 16, 16),
            bearMaterial
        );
        bearEar2.position.set(1.9, 0.3, -0.2);
        
        bullBearGroup.add(bearBody, bearHead, bearEar1, bearEar2);
        
        // Create floating market data elements
        const dataGroup = new THREE.Group();
        scene.add(dataGroup);
        
        // Create market data cubes
        const cubeGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
        const cubeMaterials = [
            new THREE.MeshStandardMaterial({ color: 0xef291d, metalness: 0.8, roughness: 0.2 }),
            new THREE.MeshStandardMaterial({ color: 0x1d72ef, metalness: 0.8, roughness: 0.2 }),
            new THREE.MeshStandardMaterial({ color: 0x1def91, metalness: 0.8, roughness: 0.2 })
        ];
        
        // Create multiple cubes with different positions
        for (let i = 0; i < 15; i++) {
            const cube = new THREE.Mesh(
                cubeGeometry,
                cubeMaterials[i % cubeMaterials.length]
            );
            
            // Random positions in a spherical arrangement
            const radius = 3;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            
            cube.position.x = radius * Math.sin(phi) * Math.cos(theta);
            cube.position.y = radius * Math.sin(phi) * Math.sin(theta);
            cube.position.z = radius * Math.cos(phi);
            
            // Random rotation
            cube.rotation.x = Math.random() * Math.PI;
            cube.rotation.y = Math.random() * Math.PI;
            cube.rotation.z = Math.random() * Math.PI;
            
            dataGroup.add(cube);
        }
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            // Rotate bull and bear
            bullBearGroup.rotation.y += 0.005;
            
            // Rotate data group in opposite direction
            dataGroup.rotation.y -= 0.002;
            dataGroup.rotation.x += 0.001;
            
            // Animate individual cubes
            dataGroup.children.forEach((cube, index) => {
                cube.rotation.x += 0.01 + index * 0.001;
                cube.rotation.y += 0.01 - index * 0.001;
                
                // Pulse scale
                const time = Date.now() * 0.001;
                const scale = 1 + 0.1 * Math.sin(time + index);
                cube.scale.set(scale, scale, scale);
            });
            
            // Render scene
            renderer.render(scene, camera);
        }
        
        // Handle window resize
        window.addEventListener('resize', function() {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
        
        // Start animation loop
        animate();
        
        // Add mouse interaction
        container.addEventListener('mousemove', function(e) {
            const rect = container.getBoundingClientRect();
            const mouseX = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
            const mouseY = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;
            
            // Move camera slightly based on mouse position
            camera.position.x = mouseX * 2;
            camera.position.y = mouseY * 2;
            camera.lookAt(scene.position);
        });
    }
    
    // Subscription 3D Scene
    function initSubscription3D() {
        const container = document.getElementById('subscription-3d-scene');
        if (!container) return;
        
        // Create scene
        const scene = new THREE.Scene();
        
        // Create camera
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 5;
        
        // Create renderer
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);
        
        // Create lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
        
        // Create premium badge
        const badgeGroup = new THREE.Group();
        scene.add(badgeGroup);
        
        // Create badge base
        const badgeGeometry = new THREE.CylinderGeometry(2, 2, 0.2, 32);
        const badgeMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x001F3F,
            metalness: 0.9,
            roughness: 0.1
        });
        
        const badge = new THREE.Mesh(badgeGeometry, badgeMaterial);
        badgeGroup.add(badge);
        
        // Create badge rim
        const rimGeometry = new THREE.TorusGeometry(2, 0.1, 16, 100);
        const rimMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xef291d,
            metalness: 0.9,
            roughness: 0.1
        });
        
        const rim = new THREE.Mesh(rimGeometry, rimMaterial);
        rim.rotation.x = Math.PI / 2;
        badgeGroup.add(rim);
        
        // Create premium text
        const textGroup = new THREE.Group();
        textGroup.position.y = 0.15;
        badgeGroup.add(textGroup);
        
        // Create floating particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 200;
        
        const posArray = new Float32Array(particlesCount * 3);
        const scaleArray = new Float32Array(particlesCount);
        
        for (let i = 0; i < particlesCount * 3; i += 3) {
            // Position in a sphere
            const radius = 3 + Math.random() * 2;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            
            posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
            posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
            posArray[i + 2] = radius * Math.cos(phi);
            
            // Random scale
            scaleArray[i / 3] = Math.random() * 0.5 + 0.1;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.1,
            sizeAttenuation: true,
            color: 0xef291d,
            transparent: true,
            opacity: 0.8
        });
        
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            // Rotate badge
            badgeGroup.rotation.y += 0.005;
            
            // Animate particles
            const time = Date.now() * 0.001;
            particles.rotation.y = time * 0.1;
            
            // Update particle positions
            const positions = particles.geometry.attributes.position.array;
            const scales = particles.geometry.attributes.scale.array;
            
            for (let i = 0; i < positions.length; i += 3) {
                const ix = i / 3;
                
                // Oscillate particles
                positions[i + 1] += Math.sin(time + ix) * 0.01;
                
                // Pulse particle size
                scales[ix] = (Math.sin(time + ix) * 0.2 + 0.8) * (Math.random() * 0.5 + 0.1);
            }
            
            particles.geometry.attributes.position.needsUpdate = true;
            particles.geometry.attributes.scale.needsUpdate = true;
            
            // Render scene
            renderer.render(scene, camera);
        }
        
        // Handle window resize
        window.addEventListener('resize', function() {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
        
        // Start animation loop
        animate();
        
        // Add mouse interaction
        container.addEventListener('mousemove', function(e) {
            const rect = container.getBoundingClientRect();
            const mouseX = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
            const mouseY = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;
            
            // Move badge based on mouse position
            badgeGroup.rotation.x = mouseY * 0.5;
            badgeGroup.rotation.z = mouseX * 0.5;
        });
    }
}
