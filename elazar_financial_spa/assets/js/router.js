// Client-side router for Fershman Financial SPA
const Router = {
  routes: {},
  currentRoute: null,
  contentContainer: null,

  // Initialize the router
  init: function(contentContainerId) {
    this.contentContainer = document.getElementById(contentContainerId || 'app');
    
    // Handle initial route on page load
    window.addEventListener('DOMContentLoaded', () => {
      this.navigateTo(window.location.pathname);
    });
    
    // Handle browser back/forward navigation
    window.addEventListener('popstate', () => {
      this.navigateTo(window.location.pathname, false);
    });
    
    // Intercept link clicks for client-side navigation
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && e.target.href.includes(window.location.origin)) {
        e.preventDefault();
        const path = e.target.href.replace(window.location.origin, '');
        this.navigateTo(path);
      }
    });
  },

  // Register a route
  addRoute: function(path, callback) {
    this.routes[path] = callback;
    return this;
  },

  // Navigate to a specific route
  navigateTo: function(path, addToHistory = true) {
    console.log(`Navigating to: ${path}`);
    
    // Default to home if path is empty
    if (path === '') path = '/';
    
    // Handle trailing slash consistency
    if (path !== '/' && path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    
    // Update browser history
    if (addToHistory) {
      window.history.pushState({}, '', path);
    }
    
    // Store current route
    this.currentRoute = path;
    
    // Find matching route handler
    let matchedRoute = null;
    let params = {};
    
    // Check for exact route match
    if (this.routes[path]) {
      matchedRoute = this.routes[path];
    } else {
      // Check for dynamic routes with parameters
      for (const route in this.routes) {
        // Convert route pattern to regex
        if (route.includes(':')) {
          const routeParts = route.split('/');
          const pathParts = path.split('/');
          
          if (routeParts.length === pathParts.length) {
            let isMatch = true;
            const extractedParams = {};
            
            for (let i = 0; i < routeParts.length; i++) {
              if (routeParts[i].startsWith(':')) {
                // This is a parameter
                const paramName = routeParts[i].slice(1);
                extractedParams[paramName] = pathParts[i];
              } else if (routeParts[i] !== pathParts[i]) {
                // Static part doesn't match
                isMatch = false;
                break;
              }
            }
            
            if (isMatch) {
              matchedRoute = this.routes[route];
              params = extractedParams;
              break;
            }
          }
        }
      }
    }
    
    // If no route matched, try the 404 handler
    if (!matchedRoute && this.routes['404']) {
      matchedRoute = this.routes['404'];
    }
    
    // Execute the route handler if found
    if (matchedRoute) {
      // Show loader while content loads
      document.querySelector('.loader').classList.remove('hidden');
      
      // Execute route handler with parameters
      matchedRoute(params)
        .then(html => {
          // Update content
          this.contentContainer.innerHTML = html;
          
          // Hide loader
          setTimeout(() => {
            document.querySelector('.loader').classList.add('hidden');
          }, 500);
          
          // Initialize any scripts needed for the new content
          this.initCurrentPageScripts();
          
          // Scroll to top
          window.scrollTo(0, 0);
        })
        .catch(error => {
          console.error('Error loading route:', error);
          if (this.routes['error']) {
            this.routes['error'](error);
          }
        });
    } else {
      console.error('No route handler found for:', path);
    }
  },

  // Initialize scripts for the current page
  initCurrentPageScripts: function() {
    // Initialize mouse follower
    if (typeof initMouseFollower === 'function') {
      initMouseFollower();
    }
    
    // Initialize theme toggle
    if (typeof initThemeToggle === 'function') {
      initThemeToggle();
    }
    
    // Initialize mobile navigation
    if (typeof initMobileNavigation === 'function') {
      initMobileNavigation();
    }
    
    // Initialize ticker animation
    if (typeof initTickerAnimation === 'function' && document.querySelector('.ticker')) {
      initTickerAnimation();
    }
    
    // Initialize charts
    if (typeof initCharts === 'function') {
      initCharts();
    }
    
    // Initialize tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    if (tabButtons.length) {
      tabButtons.forEach(button => {
        button.addEventListener('click', () => {
          // Remove active class from all buttons and contents
          tabButtons.forEach(btn => btn.classList.remove('active'));
          document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
          
          // Add active class to clicked button and corresponding content
          button.classList.add('active');
          const tabId = button.getAttribute('data-tab');
          document.getElementById(tabId)?.classList.add('active');
        });
      });
    }
    
    // Initialize Contentful content if available
    if (window.contentRenderer) {
      // Check what page we're on based on the current route
      const path = Router.currentRoute;
      
      // Home page
      if (path === '/' || path === '') {
        if (typeof contentRenderer.renderFeaturedArticles === 'function') {
          contentRenderer.renderFeaturedArticles();
        }
        if (typeof contentRenderer.renderMarketTicker === 'function') {
          contentRenderer.renderMarketTicker();
        }
        if (typeof contentRenderer.renderExpertOpinions === 'function') {
          contentRenderer.renderExpertOpinions();
        }
      }
      
      // Category pages
      if (path === '/markets') {
        if (typeof contentRenderer.renderCategoryArticles === 'function') {
          contentRenderer.renderCategoryArticles('Markets', 'market-articles');
        }
        if (typeof contentRenderer.renderMarketTicker === 'function') {
          contentRenderer.renderMarketTicker();
        }
      }
      
      if (path === '/analysis') {
        if (typeof contentRenderer.renderCategoryArticles === 'function') {
          contentRenderer.renderCategoryArticles('Analysis', 'analysis-articles');
        }
        if (typeof contentRenderer.renderMarketTicker === 'function') {
          contentRenderer.renderMarketTicker();
        }
      }
      
      if (path === '/policy') {
        if (typeof contentRenderer.renderCategoryArticles === 'function') {
          contentRenderer.renderCategoryArticles('Policy & Regulation', 'policy-articles');
        }
        if (typeof contentRenderer.renderMarketTicker === 'function') {
          contentRenderer.renderMarketTicker();
        }
      }
      
      if (path === '/opinion') {
        if (typeof contentRenderer.renderExpertOpinions === 'function') {
          contentRenderer.renderExpertOpinions('opinion-articles');
        }
        if (typeof contentRenderer.renderMarketTicker === 'function') {
          contentRenderer.renderMarketTicker();
        }
      }
      
      // Article page
      if (path.startsWith('/articles/')) {
        const slug = path.split('/').pop();
        if (typeof contentRenderer.renderArticlePage === 'function') {
          contentRenderer.renderArticlePage(slug);
        }
        if (typeof contentRenderer.renderMarketTicker === 'function') {
          contentRenderer.renderMarketTicker();
        }
      }
    }
  }
};

// Templates for different pages
const Templates = {
  // Common layout elements
  getHeader: function(activePage = '') {
    return `
      <!-- Mouse Follower -->
      <div class="mouse-follower"></div>

      <!-- Navigation -->
      <nav class="navbar">
        <div class="navbar-container">
          <a href="/" class="navbar-logo">
            <img src="/assets/images/ELAZAR.png" alt="Fershman Financial" class="logo">
          </a>
          <div class="navbar-toggle">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="navbar-links">
            <a href="/" class="nav-link ${activePage === 'home' ? 'active' : ''}">Home</a>
            <a href="/markets" class="nav-link ${activePage === 'markets' ? 'active' : ''}">Markets</a>
            <a href="/analysis" class="nav-link ${activePage === 'analysis' ? 'active' : ''}">Analysis</a>
            <a href="/policy" class="nav-link ${activePage === 'policy' ? 'active' : ''}">Policy & Regulation</a>
            <a href="/opinion" class="nav-link ${activePage === 'opinion' ? 'active' : ''}">Opinion</a>
            <a href="/about" class="nav-link ${activePage === 'about' ? 'active' : ''}">About</a>
          </div>
          <div class="navbar-actions">
            <button class="theme-toggle">
              <i class="fas fa-moon"></i>
            </button>
          </div>
        </div>
      </nav>
    `;
  },
  
  getFooter: function() {
    return `
      <!-- Footer -->
      <footer class="footer">
        <div class="footer-container">
          <div class="footer-logo">
            <img src="/assets/images/ELAZAR.png" alt="Fershman Financial" class="logo">
            <p>Elite Economic Intelligence</p>
          </div>
          <div class="footer-links">
            <div class="footer-column">
              <h3>Navigation</h3>
              <a href="/">Home</a>
              <a href="/markets">Markets</a>
              <a href="/analysis">Analysis</a>
              <a href="/policy">Policy & Regulation</a>
              <a href="/opinion">Opinion</a>
              <a href="/about">About</a>
            </div>
            <div class="footer-column">
              <h3>Company</h3>
              <a href="/about">About</a>
              <a href="#">Our Team</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
            </div>
            <div class="footer-column">
              <h3>Legal</h3>
              <a href="#">Terms & Conditions</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Cookie Policy</a>
              <a href="#">Disclaimer</a>
            </div>
            <div class="footer-column">
              <h3>Connect</h3>
              <div class="social-icons">
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-linkedin-in"></i></a>
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
              </div>
              <div class="newsletter">
                <h4>Newsletter</h4>
                <div class="newsletter-form">
                  <input type="email" placeholder="Your email">
                  <button type="submit"><i class="fas fa-arrow-right"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 Fershman Financial. All rights reserved.</p>
        </div>
      </footer>
    `;
  },
  
  getTicker: function() {
    return `
      <!-- Market Ticker -->
      <div class="ticker-container">
        <div class="ticker">
          <!-- Ticker items will be populated dynamically -->
          <div class="ticker-item">
            <span class="ticker-symbol">S&P 500</span>
            <span class="ticker-value up">4,766.18</span>
            <span class="ticker-change up">+0.41%</span>
          </div>
          <div class="ticker-item">
            <span class="ticker-symbol">NASDAQ</span>
            <span class="ticker-value up">15,645.23</span>
            <span class="ticker-change up">+0.63%</span>
          </div>
          <div class="ticker-item">
            <span class="ticker-symbol">DOW</span>
            <span class="ticker-value down">36,338.30</span>
            <span class="ticker-change down">-0.16%</span>
          </div>
          <div class="ticker-item">
            <span class="ticker-symbol">BTC/USD</span>
            <span class="ticker-value up">46,219.50</span>
            <span class="ticker-change up">+1.27%</span>
          </div>
          <div class="ticker-item">
            <span class="ticker-symbol">EUR/USD</span>
            <span class="ticker-value down">1.1372</span>
            <span class="ticker-change down">-0.05%</span>
          </div>
          <div class="ticker-item">
            <span class="ticker-symbol">GOLD</span>
            <span class="ticker-value up">1,829.20</span>
            <span class="ticker-change up">+0.32%</span>
          </div>
          <div class="ticker-item">
            <span class="ticker-symbol">OIL</span>
            <span class="ticker-value up">75.21</span>
            <span class="ticker-change up">+0.87%</span>
          </div>
          <div class="ticker-item">
            <span class="ticker-symbol">10Y-T</span>
            <span class="ticker-value down">1.512</span>
            <span class="ticker-change down">-0.02%</span>
          </div>
        </div>
      </div>
    `;
  },
  
  // Page templates
  homePage: function() {
    return `
      ${this.getHeader('home')}
      
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <h1 class="hero-title">Beyond the Headlines.<br>Beyond the Markets.</h1>
          <p class="hero-subtitle">Elite economic intelligence for the modern investor.</p>
          <a href="#featured" class="cta-button">Explore Latest Insights</a>
        </div>
      </section>
      
      ${this.getTicker()}
      
      <!-- Featured Articles -->
      <section id="featured" class="section featured-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Featured Insights</h2>
            <a href="/markets" class="section-link">View All</a>
          </div>
          <div class="featured-grid" id="featured-articles">
            <!-- Featured articles will be populated dynamically -->
            <div class="featured-article main-article">
              <div class="article-image" style="background-image: url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
              <div class="article-content">
                <div class="article-category">Markets</div>
                <h3 class="article-title">Global Markets Rally as Central Banks Signal Coordinated Policy Shift</h3>
                <p class="article-excerpt">Major indices surge as Federal Reserve, ECB, and Bank of Japan announce synchronized approach to combat inflation while supporting economic growth.</p>
                <div class="article-meta">
                  <span class="article-author">By Jonathan Pierce</span>
                  <span class="article-date">April 5, 2025</span>
                </div>
                <a href="/articles/global-markets-rally" class="article-link">Read More</a>
              </div>
            </div>
            <div class="featured-article">
              <div class="article-image" style="background-image: url('https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
              <div class="article-content">
                <div class="article-category">Markets</div>
                <h3 class="article-title">Tech Sector Faces Valuation Reset Amid Rising Interest Rates</h3>
                <p class="article-excerpt">Investors reassess growth projections as borrowing costs increase, particularly impacting companies with distant profitability horizons.</p>
                <div class="article-meta">
                  <span class="article-author">By Rachel Kim</span>
                  <span class="article-date">April 4, 2025</span>
                </div>
                <a href="/articles/tech-sector-valuation-reset" class="article-link">Read More</a>
              </div>
            </div>
            <div class="featured-article">
              <div class="article-image" style="background-image: url('https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
              <div class="article-content">
                <div class="article-category">Markets</div>
                <h3 class="article-title">Emerging Markets Outperform as Dollar Weakens</h3>
                <p class="article-excerpt">Developing economies see capital inflows accelerate as currency pressures ease and commodity prices stabilize.</p>
                <div class="article-meta">
                  <span class="article-author">By Miguel Santos</span>
                  <span class="article-date">April 2, 2025</span>
                </div>
                <a href="/articles/emerging-markets-outperform" class="article-link">Read More</a>
              </div>
            </div>
            <div class="featured-article">
              <div class="article-image" style="background-image: url('https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
              <div class="article-content">
                <div class="article-category">Analysis</div>
                <h3 class="article-title">AI Revolution in Financial Analysis: Beyond the Hype</h3>
                <p class="article-excerpt">How artificial intelligence is transforming investment research and creating new opportunities for quantitative strategies.</p>
                <div class="article-meta">
                  <span class="article-author">By David Chen</span>
                  <span class="article-date">April 3, 2025</span>
                </div>
                <a href="/articles/ai-revolution-financial-analysis" class="article-link">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Market Visualization -->
      <section class="section visualization-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Market Visualization</h2>
          </div>
          <div class="visualization-container">
            <div class="tabs">
              <button class="tab-button active" data-tab="market-performance">Market Performance</button>
              <button class="tab-button" data-tab="sector-performance">Sector Performance</button>
              <button class="tab-button" data-tab="economic-indicators">Economic Indicators</button>
            </div>
            <div class="tab-content active" id="market-performance">
              <canvas id="market-performance-chart"></canvas>
            </div>
            <div class="tab-content" id="sector-performance">
              <canvas id="sector-performance-chart"></canvas>
            </div>
            <div class="tab-content" id="economic-indicators">
              <canvas id="economic-indicators-chart"></canvas>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Analysis Section -->
      <section class="section analysis-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Latest Analysis</h2>
            <a href="/analysis" class="section-link">View All</a>
          </div>
          <div class="analysis-container">
            <div class="analysis-card">
              <div class="card-image" style="background-image: url('https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
              <div class="card-content">
                <div class="card-category">Analysis</div>
                <h3 class="card-title">AI Revolution in Financial Analysis: Beyond the Hype</h3>
                <p class="card-excerpt">How artificial intelligence is transforming investment research and creating new opportunities for quantitative strategies.</p>
                <div class="card-meta">
                  <span class="card-author">By David Chen</span>
                  <span class="card-date">April 3, 2025</span>
                </div>
                <a href="/articles/ai-revolution-financial-analysis" class="card-link">Read More</a>
              </div>
            </div>
            <div class="analysis-card">
              <div class="card-image" style="background-image: url('https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
              <div class="card-content">
                <div class="card-category">Analysis</div>
                <h3 class="card-title">The Shifting Landscape of Global Supply Chains</h3>
                <p class="card-excerpt">How geopolitical tensions and pandemic lessons are reshaping manufacturing networks and creating new investment opportunities.</p>
                <div class="card-meta">
                  <span class="card-author">By Sarah Johnson</span>
                  <span class="card-date">March 29, 2025</span>
                </div>
                <a href="/articles/global-supply-chains" class="card-link">Read More</a>
              </div>
            </div>
            <div class="analysis-card">
              <div class="card-image" style="background-image: url('https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
              <div class="card-content">
                <div class="card-category">Analysis</div>
                <h3 class="card-title">ESG Investing: Beyond the Compliance Checkbox</h3>
                <p class="card-excerpt">Why environmental, social, and governance factors are becoming critical components of fundamental investment analysis.</p>
                <div class="card-meta">
                  <span class="card-author">By Emma Blackwell</span>
                  <span class="card-date">March 25, 2025</span>
                </div>
                <a href="/articles/esg-investing" class="card-link">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Policy Section -->
      <section class="section policy-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Policy & Regulation</h2>
            <a href="/policy" class="section-link">View All</a>
          </div>
          <div class="policy-container">
            <div class="policy-card">
              <div class="card-image" style="background-image: url('https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
              <div class="card-content">
                <div class="card-category">Policy & Regulation</div>
                <h3 class="card-title">Central Bank Digital Currencies: A Monetary Policy Revolution</h3>
                <p class="card-excerpt">How CBDCs will fundamentally transform monetary policy implementation, providing central banks with unprecedented precision in targeting economic outcomes.</p>
                <div class="card-meta">
                  <span class="card-author">By Robert Kiyosaki</span>
                  <span class="card-date">March 18, 2025</span>
                </div>
                <a href="/articles/cbdc-monetary-policy" class="card-link">Read More</a>
              </div>
            </div>
            <div class="policy-card">
              <div class="card-image" style="background-image: url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
              <div class="card-content">
                <div class="card-category">Policy & Regulation</div>
                <h3 class="card-title">The New Era of Financial Regulation: Beyond Traditional Banking</h3>
                <p class="card-excerpt">How regulators are adapting frameworks to address emerging risks in decentralized finance, digital assets, and non-bank financial intermediation.</p>
                <div class="card-meta">
                  <span class="card-author">By Jennifer Martinez</span>
                  <span class="card-date">March 15, 2025</span>
                </div>
                <a href="/articles/financial-regulation-new-era" class="card-link">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Opinion Section -->
      <section class="section opinion-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Expert Opinions</h2>
            <a href="/opinion" class="section-link">View All</a>
          </div>
          <div class="opinion-container" id="expert-opinions">
            <!-- Expert opinions will be populated dynamically -->
            <div class="opinion-quote">
              <div class="quote-mark">"</div>
              <p class="quote-text">The next decade will see a fundamental restructuring of global supply chains, with resilience prioritized over efficiency. Companies that fail to adapt will find themselves at a severe competitive disadvantage in an increasingly volatile world.</p>
              <div class="quote-author">
                <div class="author-image" style="background-image: url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
                <div class="author-details">
                  <h4 class="author-name">Dr. Michael Chen</h4>
                  <p class="author-title">Former Chief Economist, World Bank</p>
                </div>
              </div>
            </div>
            <div class="opinion-quote">
              <div class="quote-mark">"</div>
              <p class="quote-text">ESG investing is not merely a trend but a fundamental shift in how we evaluate corporate performance. The companies that thrive will be those that recognize sustainability as a core driver of long-term value creation rather than a compliance exercise.</p>
              <div class="quote-author">
                <div class="author-image" style="background-image: url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
                <div class="author-details">
                  <h4 class="author-name">Sarah Blackwell</h4>
                  <p class="author-title">Managing Director, Global Sustainable Finance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Subscription CTA -->
      <section class="section subscription-section">
        <div class="container">
          <div class="subscription-container">
            <div class="subscription-content">
              <h2 class="subscription-title">Join the Elite</h2>
              <p class="subscription-text">Get exclusive market insights and unfiltered capitalist analysis delivered directly to your inbox.</p>
              <div class="subscription-form">
                <input type="email" placeholder="Your email address">
                <button type="submit">Subscribe</button>
              </div>
              <p class="subscription-note">By subscribing, you agree to our <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a>.</p>
            </div>
          </div>
        </div>
      </section>
      
      ${this.getFooter()}
    `;
  },
  
  marketsPage: function() {
    return `
      ${this.getHeader('markets')}
      
      <!-- Page Header -->
      <section class="page-header">
        <div class="container">
          <h1 class="page-title">Markets</h1>
          <p class="page-description">In-depth coverage and analysis of global financial markets, trends, and investment opportunities.</p>
        </div>
      </section>
      
      ${this.getTicker()}
      
      <!-- Market Articles -->
      <section class="section articles-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Latest Market Articles</h2>
          </div>
          <div class="articles-grid" id="market-articles">
            <!-- Articles will be populated dynamically -->
            <div class="article-card">
              <div class="article-image" style="background-image: url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
              <div class="article-content">
                <div class="article-category">Markets</div>
                <h3 class="article-title">Global Markets Rally as Central Banks Signal Coordinated Policy Shift</h3>
                <p class="article-excerpt">Major indices surge as Federal Reserve, ECB, and Bank of Japan announce synchronized approach to combat inflation while supporting economic growth.</p>
                <div class="article-meta">
                  <span class="article-author">By Jonathan Pierce</span>
                  <span class="article-date">April 5, 2025</span>
                </div>
                <a href="/articles/global-markets-rally" class="article-link">Read More</a>
              </div>
            </div>
            <div class="article-card">
              <div class="article-image" style="background-image: url('https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
              <div class="article-content">
                <div class="article-category">Markets</div>
                <h3 class="article-title">Tech Sector Faces Valuation Reset Amid Rising Interest Rates</h3>
                <p class="article-excerpt">Investors reassess growth projections as borrowing costs increase, particularly impacting companies with distant profitability horizons.</p>
                <div class="article-meta">
                  <span class="article-author">By Rachel Kim</span>
                  <span class="article-date">April 4, 2025</span>
                </div>
                <a href="/articles/tech-sector-valuation-reset" class="article-link">Read More</a>
              </div>
            </div>
            <div class="article-card">
              <div class="article-image" style="background-image: url('https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
              <div class="article-content">
                <div class="article-category">Markets</div>
                <h3 class="article-title">Emerging Markets Outperform as Dollar Weakens</h3>
                <p class="article-excerpt">Developing economies see capital inflows accelerate as currency pressures ease and commodity prices stabilize.</p>
                <div class="article-meta">
                  <span class="article-author">By Miguel Santos</span>
                  <span class="article-date">April 2, 2025</span>
                </div>
                <a href="/articles/emerging-markets-outperform" class="article-link">Read More</a>
              </div>
            </div>
            <div class="article-card">
              <div class="article-image" style="background-image: url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
              <div class="article-content">
                <div class="article-category">Markets</div>
                <h3 class="article-title">Energy Transition Creates New Market Leaders</h3>
                <p class="article-excerpt">Traditional oil majors lose ground to renewable specialists as institutional investors reallocate capital toward sustainable energy solutions.</p>
                <div class="article-meta">
                  <span class="article-author">By Emma Johnson</span>
                  <span class="article-date">March 30, 2025</span>
                </div>
                <a href="/articles/energy-transition-market-leaders" class="article-link">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      ${this.getFooter()}
    `;
  },
  
  analysisPage: function() {
    return `
      ${this.getHeader('analysis')}
      
      <!-- Page Header -->
      <section class="page-header">
        <div class="container">
          <h1 class="page-title">Analysis</h1>
          <p class="page-description">Deep dives into market trends, economic indicators, and investment strategies from our expert analysts.</p>
        </div>
      </section>
      
      ${this.getTicker()}
      
      <!-- Analysis Articles -->
      <section class="section articles-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Latest Analysis</h2>
          </div>
          <div class="articles-grid" id="analysis-articles">
            <!-- Articles will be populated dynamically -->
            <div class="article-card">
              <div class="article-image" style="background-image: url('https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
              <div class="article-content">
                <div class="article-category">Analysis</div>
                <h3 class="article-title">AI Revolution in Financial Analysis: Beyond the Hype</h3>
                <p class="article-excerpt">How artificial intelligence is transforming investment research and creating new opportunities for quantitative strategies.</p>
                <div class="article-meta">
                  <span class="article-author">By David Chen</span>
                  <span class="article-date">April 3, 2025</span>
                </div>
                <a href="/articles/ai-revolution-financial-analysis" class="article-link">Read More</a>
              </div>
            </div>
            <div class="article-card">
              <div class="article-image" style="background-image: url('https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
              <div class="article-content">
                <div class="article-category">Analysis</div>
                <h3 class="article-title">The Shifting Landscape of Global Supply Chains</h3>
                <p class="article-excerpt">How geopolitical tensions and pandemic lessons are reshaping manufacturing networks and creating new investment opportunities.</p>
                <div class="article-meta">
                  <span class="article-author">By Sarah Johnson</span>
                  <span class="article-date">March 29, 2025</span>
                </div>
                <a href="/articles/global-supply-chains" class="article-link">Read More</a>
              </div>
            </div>
            <div class="article-card">
              <div class="article-image" style="background-image: url('https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
              <div class="article-content">
                <div class="article-category">Analysis</div>
                <h3 class="article-title">ESG Investing: Beyond the Compliance Checkbox</h3>
                <p class="article-excerpt">Why environmental, social, and governance factors are becoming critical components of fundamental investment analysis.</p>
                <div class="article-meta">
                  <span class="article-author">By Emma Blackwell</span>
                  <span class="article-date">March 25, 2025</span>
                </div>
                <a href="/articles/esg-investing" class="article-link">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      ${this.getFooter()}
    `;
  },
  
  policyPage: function() {
    return `
      ${this.getHeader('policy')}
      
      <!-- Page Header -->
      <section class="page-header">
        <div class="container">
          <h1 class="page-title">Policy & Regulation</h1>
          <p class="page-description">Insights on monetary policy, financial regulation, and government actions affecting markets and investments.</p>
        </div>
      </section>
      
      ${this.getTicker()}
      
      <!-- Policy Articles -->
      <section class="section articles-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Latest Policy & Regulation Articles</h2>
          </div>
          <div class="articles-grid" id="policy-articles">
            <!-- Articles will be populated dynamically -->
            <div class="article-card">
              <div class="article-image" style="background-image: url('https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
              <div class="article-content">
                <div class="article-category">Policy & Regulation</div>
                <h3 class="article-title">Central Bank Digital Currencies: A Monetary Policy Revolution</h3>
                <p class="article-excerpt">How CBDCs will fundamentally transform monetary policy implementation, providing central banks with unprecedented precision in targeting economic outcomes.</p>
                <div class="article-meta">
                  <span class="article-author">By Robert Kiyosaki</span>
                  <span class="article-date">March 18, 2025</span>
                </div>
                <a href="/articles/cbdc-monetary-policy" class="article-link">Read More</a>
              </div>
            </div>
            <div class="article-card">
              <div class="article-image" style="background-image: url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
              <div class="article-content">
                <div class="article-category">Policy & Regulation</div>
                <h3 class="article-title">The New Era of Financial Regulation: Beyond Traditional Banking</h3>
                <p class="article-excerpt">How regulators are adapting frameworks to address emerging risks in decentralized finance, digital assets, and non-bank financial intermediation.</p>
                <div class="article-meta">
                  <span class="article-author">By Jennifer Martinez</span>
                  <span class="article-date">March 15, 2025</span>
                </div>
                <a href="/articles/financial-regulation-new-era" class="article-link">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      ${this.getFooter()}
    `;
  },
  
  opinionPage: function() {
    return `
      ${this.getHeader('opinion')}
      
      <!-- Page Header -->
      <section class="page-header">
        <div class="container">
          <h1 class="page-title">Opinion</h1>
          <p class="page-description">Expert perspectives and thought leadership from renowned economists, investors, and industry leaders.</p>
        </div>
      </section>
      
      ${this.getTicker()}
      
      <!-- Opinion Articles -->
      <section class="section articles-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Expert Opinions</h2>
          </div>
          <div class="opinion-grid" id="opinion-articles">
            <!-- Opinions will be populated dynamically -->
            <div class="opinion-quote">
              <div class="quote-mark">"</div>
              <p class="quote-text">The next decade will see a fundamental restructuring of global supply chains, with resilience prioritized over efficiency. Companies that fail to adapt will find themselves at a severe competitive disadvantage in an increasingly volatile world.</p>
              <div class="quote-author">
                <div class="author-image" style="background-image: url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
                <div class="author-details">
                  <h4 class="author-name">Dr. Michael Chen</h4>
                  <p class="author-title">Former Chief Economist, World Bank</p>
                </div>
              </div>
            </div>
            <div class="opinion-quote">
              <div class="quote-mark">"</div>
              <p class="quote-text">ESG investing is not merely a trend but a fundamental shift in how we evaluate corporate performance. The companies that thrive will be those that recognize sustainability as a core driver of long-term value creation rather than a compliance exercise.</p>
              <div class="quote-author">
                <div class="author-image" style="background-image: url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
                <div class="author-details">
                  <h4 class="author-name">Sarah Blackwell</h4>
                  <p class="author-title">Managing Director, Global Sustainable Finance</p>
                </div>
              </div>
            </div>
            <div class="opinion-quote">
              <div class="quote-mark">"</div>
              <p class="quote-text">The era of abundant capital at ever-increasing valuations is over. We're entering a period where capital efficiency and sustainable unit economics will matter more than growth at all costs. This is a healthy reset for the technology ecosystem.</p>
              <div class="quote-author">
                <div class="author-image" style="background-image: url('https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
                <div class="author-details">
                  <h4 class="author-name">David Park</h4>
                  <p class="author-title">Partner, Horizon Ventures</p>
                </div>
              </div>
            </div>
            <div class="opinion-quote">
              <div class="quote-mark">"</div>
              <p class="quote-text">Central bank digital currencies represent the most significant evolution in monetary policy tools since the abandonment of the gold standard. They will fundamentally alter how central banks influence economic outcomes and manage financial stability.</p>
              <div class="quote-author">
                <div class="author-image" style="background-image: url('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
                <div class="author-details">
                  <h4 class="author-name">Robert Williams</h4>
                  <p class="author-title">Chief Market Strategist, Capital Research</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      ${this.getFooter()}
    `;
  },
  
  aboutPage: function() {
    return `
      ${this.getHeader('about')}
      
      <!-- Page Header -->
      <section class="page-header">
        <div class="container">
          <h1 class="page-title">About Fershman Financial</h1>
          <p class="page-description">Elite economic intelligence for the modern investor.</p>
        </div>
      </section>
      
      <!-- About Section -->
      <section class="section about-section">
        <div class="container">
          <div class="about-content">
            <div class="about-image">
              <img src="/assets/images/ELAZAR.png" alt="Fershman Financial" class="about-logo">
            </div>
            <div class="about-text">
              <h2>Our Mission</h2>
              <p>Fershman Financial was founded with a singular mission: to provide elite economic intelligence that goes beyond the headlines and beyond the markets. In a world of information overload and surface-level analysis, we deliver depth, insight, and clarity.</p>
              
              <h2>Our Approach</h2>
              <p>We believe that truly valuable financial intelligence requires both breadth and depth. Our team combines rigorous economic analysis with deep industry expertise to identify the trends, opportunities, and risks that others miss.</p>
              
              <p>Our content spans four key areas:</p>
              <ul>
                <li><strong>Markets:</strong> In-depth coverage of global financial markets, trends, and investment opportunities.</li>
                <li><strong>Analysis:</strong> Deep dives into market trends, economic indicators, and investment strategies.</li>
                <li><strong>Policy & Regulation:</strong> Insights on monetary policy, financial regulation, and government actions affecting markets.</li>
                <li><strong>Opinion:</strong> Expert perspectives from renowned economists, investors, and industry leaders.</li>
              </ul>
              
              <h2>Our Team</h2>
              <p>Fershman Financial brings together a diverse team of economists, market analysts, industry experts, and financial journalists. Our contributors have backgrounds at leading financial institutions, central banks, regulatory bodies, and academic institutions.</p>
              
              <h2>Our Values</h2>
              <p>We are committed to:</p>
              <ul>
                <li><strong>Independence:</strong> Our analysis is free from conflicts of interest and external influence.</li>
                <li><strong>Rigor:</strong> We apply the highest standards of economic and financial analysis.</li>
                <li><strong>Clarity:</strong> We translate complex concepts into clear, actionable insights.</li>
                <li><strong>Foresight:</strong> We focus not just on what is happening now, but what will happen next.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Team Section -->
      <section class="section team-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Our Leadership Team</h2>
          </div>
          <div class="team-grid">
            <div class="team-member">
              <div class="member-image" style="background-image: url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
              <div class="member-info">
                <h3 class="member-name">Dr. Michael Chen</h3>
                <p class="member-title">Editor-in-Chief</p>
                <p class="member-bio">Former Chief Economist at the World Bank with over 25 years of experience in global economic analysis and policy development.</p>
              </div>
            </div>
            <div class="team-member">
              <div class="member-image" style="background-image: url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
              <div class="member-info">
                <h3 class="member-name">Sarah Blackwell</h3>
                <p class="member-title">Managing Director, Markets</p>
                <p class="member-bio">Former Head of Global Equity Strategy at a leading investment bank with expertise in market trends and asset allocation.</p>
              </div>
            </div>
            <div class="team-member">
              <div class="member-image" style="background-image: url('https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
              <div class="member-info">
                <h3 class="member-name">David Park</h3>
                <p class="member-title">Director of Technology & Innovation</p>
                <p class="member-bio">Venture capital partner with deep expertise in technology trends, digital transformation, and emerging business models.</p>
              </div>
            </div>
            <div class="team-member">
              <div class="member-image" style="background-image: url('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
              <div class="member-info">
                <h3 class="member-name">Robert Williams</h3>
                <p class="member-title">Director of Policy & Regulation</p>
                <p class="member-bio">Former central bank economist with expertise in monetary policy, financial regulation, and macroprudential frameworks.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Contact Section -->
      <section class="section contact-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Contact Us</h2>
          </div>
          <div class="contact-container">
            <div class="contact-info">
              <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <p>info@fershman.com</p>
              </div>
              <div class="contact-item">
                <i class="fas fa-phone"></i>
                <p>+1 (212) 555-7890</p>
              </div>
              <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <p>350 Fifth Avenue, New York, NY 10118</p>
              </div>
            </div>
            <div class="contact-form">
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" placeholder="Your name">
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="Your email">
              </div>
              <div class="form-group">
                <label for="subject">Subject</label>
                <input type="text" id="subject" placeholder="Subject">
              </div>
              <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" placeholder="Your message"></textarea>
              </div>
              <button type="submit" class="submit-button">Send Message</button>
            </div>
          </div>
        </div>
      </section>
      
      ${this.getFooter()}
    `;
  },
  
  articlePage: function(slug) {
    // This is a template that will be populated with actual content from Contentful
    return `
      ${this.getHeader()}
      
      <!-- Article Header -->
      <section class="article-header">
        <div class="container">
          <div class="article-header-content">
            <span class="article-header-category">Category</span>
            <h1 class="article-header-title">Article Title</h1>
            <div class="article-header-meta">
              <div class="article-header-author">
                <div class="article-author-image" style="background-image: url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
                <div class="article-author-info">
                  <span class="article-author-name">Author Name</span>
                </div>
              </div>
              <span class="article-header-date">Publication Date</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Article Featured Image -->
      <div class="article-featured-image" style="background-image: url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>

      <!-- Article Body -->
      <section class="article-body">
        <div class="container">
          <div class="article-content">
            <p>Article content will be loaded dynamically from Contentful.</p>
          </div>
          <div class="article-tags">
            <!-- Tags will be populated dynamically -->
          </div>
          <div class="article-share">
            <h3>Share This Article</h3>
            <div class="share-buttons">
              <a href="#" class="share-button"><i class="fab fa-twitter"></i></a>
              <a href="#" class="share-button"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="share-button"><i class="fab fa-linkedin-in"></i></a>
              <a href="#" class="share-button"><i class="fas fa-envelope"></i></a>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Articles -->
      <section class="section related-articles">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Related Articles</h2>
          </div>
          <div class="related-grid" id="related-articles">
            <!-- Related articles will be populated dynamically -->
          </div>
        </div>
      </section>
      
      ${this.getFooter()}
    `;
  },
  
  notFoundPage: function() {
    return `
      ${this.getHeader()}
      
      <!-- 404 Section -->
      <section class="not-found-section">
        <div class="container">
          <div class="not-found-content">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            <a href="/" class="cta-button">Return to Homepage</a>
          </div>
        </div>
      </section>
      
      ${this.getFooter()}
    `;
  },
  
  errorPage: function(error) {
    return `
      ${this.getHeader()}
      
      <!-- Error Section -->
      <section class="error-section">
        <div class="container">
          <div class="error-content">
            <h1>Error</h1>
            <h2>Something went wrong</h2>
            <p>We encountered an error while loading this page. Please try again later.</p>
            <p class="error-details">${error ? error.message : 'Unknown error'}</p>
            <a href="/" class="cta-button">Return to Homepage</a>
          </div>
        </div>
      </section>
      
      ${this.getFooter()}
    `;
  }
};

// Initialize the router when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the router
  Router.init('app');
  
  // Define routes
  Router
    .addRoute('/', () => {
      document.title = 'Fershman Financial - Elite Economic Intelligence';
      return Promise.resolve(Templates.homePage());
    })
    .addRoute('/markets', () => {
      document.title = 'Markets - Fershman Financial';
      return Promise.resolve(Templates.marketsPage());
    })
    .addRoute('/analysis', () => {
      document.title = 'Analysis - Fershman Financial';
      return Promise.resolve(Templates.analysisPage());
    })
    .addRoute('/policy', () => {
      document.title = 'Policy & Regulation - Fershman Financial';
      return Promise.resolve(Templates.policyPage());
    })
    .addRoute('/opinion', () => {
      document.title = 'Opinion - Fershman Financial';
      return Promise.resolve(Templates.opinionPage());
    })
    .addRoute('/about', () => {
      document.title = 'About - Fershman Financial';
      return Promise.resolve(Templates.aboutPage());
    })
    .addRoute('/articles/:slug', (params) => {
      const slug = params.slug;
      document.title = `Article - Fershman Financial`;
      return Promise.resolve(Templates.articlePage(slug));
    })
    .addRoute('404', () => {
      document.title = 'Page Not Found - Fershman Financial';
      return Promise.resolve(Templates.notFoundPage());
    })
    .addRoute('error', (error) => {
      document.title = 'Error - Fershman Financial';
      return Promise.resolve(Templates.errorPage(error));
    });
});
