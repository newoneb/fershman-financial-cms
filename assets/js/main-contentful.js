/**
 * Fershman Financial - Elite Economic Journal
 * Main JavaScript File with Contentful Integration
 */

// Import Contentful functions
import { getArticles, getMarketData, getExpertOpinions, getFeaturedAnalysis } from './contentful.js';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', async function() {
    // Initialize all components
    initLoader();
    initMouseFollower();
    initNavbar();
    initHeroParallax();
    
    // Initialize components with Contentful data
    await initMarketTickerWithContentful();
    await initFeaturedAnalysisWithContentful();
    await initExpertOpinionsWithContentful();
    
    // Initialize other components
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
 * Market Ticker Animation with Contentful Data
 */
async function initMarketTickerWithContentful() {
    const ticker = document.querySelector('.ticker');
    
    try {
        // Fetch market data from Contentful
        const marketData = await getMarketData();
        
        if (marketData && marketData.length > 0) {
            // Clear existing ticker items
            ticker.innerHTML = '';
            
            // Create ticker items from Contentful data
            marketData.forEach(item => {
                const fields = item.fields;
                const tickerItem = document.createElement('div');
                tickerItem.className = 'ticker-item';
                
                const symbol = document.createElement('span');
                symbol.className = 'ticker-symbol';
                symbol.textContent = fields.symbol;
                
                const value = document.createElement('span');
                value.className = `ticker-value ${fields.direction}`;
                value.textContent = fields.value;
                
                const change = document.createElement('span');
                change.className = `ticker-change ${fields.direction}`;
                change.textContent = `${fields.direction === 'up' ? '+' : ''}${fields.changePercentage}%`;
                
                tickerItem.appendChild(symbol);
                tickerItem.appendChild(value);
                tickerItem.appendChild(change);
                
                ticker.appendChild(tickerItem);
            });
            
            // Clone ticker items to create continuous loop
            const tickerItems = document.querySelectorAll('.ticker-item');
            tickerItems.forEach(item => {
                const clone = item.cloneNode(true);
                ticker.appendChild(clone);
            });
        } else {
            // Fallback to default ticker if no data
            initMarketTicker();
        }
    } catch (error) {
        console.error('Error loading market data from Contentful:', error);
        // Fallback to default ticker
        initMarketTicker();
    }
}

/**
 * Default Market Ticker Animation (fallback)
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
 * Featured Analysis with Contentful Data
 */
async function initFeaturedAnalysisWithContentful() {
    const analysisContainer = document.querySelector('.analysis-container');
    
    if (!analysisContainer) return;
    
    try {
        // Fetch featured analysis from Contentful
        const featuredAnalysis = await getFeaturedAnalysis();
        
        if (featuredAnalysis && featuredAnalysis.length > 0) {
            // Clear existing content
            analysisContainer.innerHTML = '';
            
            // Create analysis cards from Contentful data
            featuredAnalysis.forEach(item => {
                const fields = item.fields;
                
                const card = document.createElement('div');
                card.className = 'analysis-card';
                
                const cardImage = document.createElement('div');
                cardImage.className = 'card-image';
                
                // Add premium badge if premium content
                if (fields.premiumStatus) {
                    const premiumBadge = document.createElement('div');
                    premiumBadge.className = 'premium-badge';
                    premiumBadge.textContent = 'Premium';
                    cardImage.appendChild(premiumBadge);
                }
                
                const cardContent = document.createElement('div');
                cardContent.className = 'card-content';
                
                const cardCategory = document.createElement('div');
                cardCategory.className = 'card-category';
                cardCategory.textContent = fields.category;
                
                const cardTitle = document.createElement('h3');
                cardTitle.className = 'card-title';
                cardTitle.textContent = fields.title;
                
                const cardExcerpt = document.createElement('p');
                cardExcerpt.className = 'card-excerpt';
                cardExcerpt.textContent = fields.summary;
                
                const cardMeta = document.createElement('div');
                cardMeta.className = 'card-meta';
                
                // Add author and date if available
                if (fields.author) {
                    const cardAuthor = document.createElement('span');
                    cardAuthor.className = 'card-author';
                    cardAuthor.textContent = `By ${fields.author}`;
                    cardMeta.appendChild(cardAuthor);
                }
                
                if (fields.date) {
                    const cardDate = document.createElement('span');
                    cardDate.className = 'card-date';
                    const date = new Date(fields.date);
                    cardDate.textContent = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                    cardMeta.appendChild(cardDate);
                }
                
                // Assemble card
                cardContent.appendChild(cardCategory);
                cardContent.appendChild(cardTitle);
                cardContent.appendChild(cardExcerpt);
                cardContent.appendChild(cardMeta);
                
                card.appendChild(cardImage);
                card.appendChild(cardContent);
                
                analysisContainer.appendChild(card);
            });
        }
    } catch (error) {
        console.error('Error loading featured analysis from Contentful:', error);
    }
}

/**
 * Expert Opinions with Contentful Data
 */
async function initExpertOpinionsWithContentful() {
    const opinionContainer = document.querySelector('.opinion-container');
    
    if (!opinionContainer) return;
    
    try {
        // Fetch expert opinions from Contentful
        const expertOpinions = await getExpertOpinions();
        
        if (expertOpinions && expertOpinions.length > 0) {
            // Clear existing content
            opinionContainer.innerHTML = '';
            
            // Create opinion quotes from Contentful data
            expertOpinions.forEach(item => {
                const fields = item.fields;
                
                const quote = document.createElement('div');
                quote.className = 'opinion-quote';
                
                const quoteMark = document.createElement('div');
                quoteMark.className = 'quote-mark';
                quoteMark.textContent = '"';
                
                const quoteText = document.createElement('blockquote');
                quoteText.className = 'quote-text';
                quoteText.textContent = fields.quoteText;
                
                const quoteAuthor = document.createElement('div');
                quoteAuthor.className = 'quote-author';
                
                const authorImage = document.createElement('div');
                authorImage.className = 'author-image';
                
                // Add author image if available
                if (fields.authorImage && fields.authorImage.fields && fields.authorImage.fields.file) {
                    authorImage.style.backgroundImage = `url(${fields.authorImage.fields.file.url})`;
                }
                
                const authorDetails = document.createElement('div');
                authorDetails.className = 'author-details';
                
                const authorName = document.createElement('span');
                authorName.className = 'author-name';
                authorName.textContent = fields.authorName;
                
                const authorTitle = document.createElement('span');
                authorTitle.className = 'author-title';
                authorTitle.textContent = fields.authorTitle;
                
                // Assemble quote
                authorDetails.appendChild(authorName);
                authorDetails.appendChild(authorTitle);
                
                quoteAuthor.appendChild(authorImage);
                quoteAuthor.appendChild(authorDetails);
                
                quote.appendChild(quoteMark);
                quote.appendChild(quoteText);
                quote.appendChild(quoteAuthor);
                
                opinionContainer.appendChild(quote);
            });
        }
    } catch (error) {
        console.error('Error loading expert opinions from Contentful:', error);
    }
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
        // Chart initialization code (unchanged)
        // ...
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
    // 3D elements initialization code (unchanged)
    // ...
}
