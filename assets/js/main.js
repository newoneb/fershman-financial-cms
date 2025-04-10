// Main JavaScript file for Fershman Financial
// Handles animations, interactions, and dynamic content loading

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoader();
    initNavigation();
    initScrollAnimations();
    initMouseFollower();
    initTicker();
    initParallaxEffects();
    initHoverEffects();
    
    // If on article page, initialize article-specific features
    if (document.querySelector('.article-content')) {
        initArticleFeatures();
    }
});

// Loader Animation
function initLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;
    
    // Add active class to trigger animations
    loader.classList.add('active');
    
    // Hide loader after animations complete
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            // Trigger entrance animations for page content
            document.body.classList.add('content-visible');
        }, 500);
    }, 2000);
}

// Navigation Functionality
function initNavigation() {
    const navToggle = document.querySelector('.navbar-toggle');
    const navLinks = document.querySelector('.navbar-links');
    
    if (!navToggle || !navLinks) return;
    
    // Toggle mobile navigation
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });
    
    // Close mobile navigation when clicking a link
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Always close mobile nav when clicking a link
            if (window.innerWidth < 1024) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    });
    
    // Add scroll effect to navigation
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Add hover effect to nav links
    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            navItems.forEach(link => {
                if (link !== item) {
                    link.classList.add('dimmed');
                }
            });
        });
        
        item.addEventListener('mouseleave', () => {
            navItems.forEach(link => {
                link.classList.remove('dimmed');
            });
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Fade-in animations on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
    
    // Remove parallax scroll effect for headers to prevent early fade
    // This ensures content remains static and visible like regular sections
}

// Mouse Follower Effect
function initMouseFollower() {
    const follower = document.querySelector('.mouse-follower');
    if (!follower) return;
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Interactive elements that change follower state
    const interactiveElements = document.querySelectorAll('a, button, .article-card, .team-member, .value-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            follower.classList.add('active');
        });
        
        element.addEventListener('mouseleave', () => {
            follower.classList.remove('active');
        });
    });
    
    // Animate follower with smooth movement
    function updateFollower() {
        // Calculate distance between mouse and follower
        const dx = mouseX - followerX;
        const dy = mouseY - followerY;
        
        // Move follower toward mouse with easing
        followerX += dx * 0.1;
        followerY += dy * 0.1;
        
        // Apply position
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;
        
        requestAnimationFrame(updateFollower);
    }
    
    updateFollower();
}

// Market Ticker Animation
function initTicker() {
    const ticker = document.querySelector('.ticker');
    if (!ticker) return;
    
    // Set initial position
    let tickerPosition = 0;
    const tickerSpeed = 0.5;
    
    // Animate ticker
    function animateTicker() {
        tickerPosition -= tickerSpeed;
        
        // Reset position when first set of items is out of view
        const firstSetWidth = ticker.offsetWidth / 2;
        if (tickerPosition <= -firstSetWidth) {
            tickerPosition = 0;
        }
        
        ticker.style.transform = `translateX(${tickerPosition}px)`;
        requestAnimationFrame(animateTicker);
    }
    
    animateTicker();
    
    // Pause on hover
    ticker.addEventListener('mouseenter', () => {
        ticker.style.animationPlayState = 'paused';
    });
    
    ticker.addEventListener('mouseleave', () => {
        ticker.style.animationPlayState = 'running';
    });
    
    // Add hover effect to ticker items
    const tickerItems = document.querySelectorAll('.ticker-item');
    tickerItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('hovered');
        });
        
        item.addEventListener('mouseleave', () => {
            item.classList.remove('hovered');
        });
    });
}

// Parallax Effects
function initParallaxEffects() {
    // Hero section parallax
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const parallaxElements = heroSection.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.5;
                element.style.transform = `translateY(${scrollPosition * speed}px)`;
            });
        });
    }
    
    // Featured image parallax
    const featuredImage = document.querySelector('.article-featured-image');
    if (featuredImage) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const translateY = scrollPosition * 0.2;
            featuredImage.style.backgroundPosition = `center ${-translateY}px`;
        });
    }
}

// Hover Effects
function initHoverEffects() {
    // Article card hover effects
    const articleCards = document.querySelectorAll('.article-card');
    
    articleCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hovered');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hovered');
        });
        
        // 3D tilt effect
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            const rotateX = (mouseY / (cardRect.height / 2)) * -5;
            const rotateY = (mouseX / (cardRect.width / 2)) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn-primary, .article-link');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('hovered');
        });
        
        button.addEventListener('mouseleave', () => {
            button.classList.remove('hovered');
        });
    });
    
    // Footer link hover effects
    const footerLinks = document.querySelectorAll('.footer-links a');
    
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.classList.add('glow');
        });
        
        link.addEventListener('mouseleave', () => {
            link.classList.remove('glow');
        });
    });
    
    // Social icon hover effects
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.classList.add('glow');
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.classList.remove('glow');
        });
    });
}

// Article-specific features
function initArticleFeatures() {
    // Table of contents generation
    const articleBody = document.querySelector('.article-body');
    const headings = articleBody.querySelectorAll('h2');
    
    if (headings.length > 2) {
        const tocContainer = document.createElement('div');
        tocContainer.className = 'article-toc';
        tocContainer.innerHTML = '<h3>Table of Contents</h3><ul></ul>';
        
        const tocList = tocContainer.querySelector('ul');
        
        headings.forEach((heading, index) => {
            // Add ID to heading if not present
            if (!heading.id) {
                heading.id = `section-${index}`;
            }
            
            // Create TOC item
            const tocItem = document.createElement('li');
            const tocLink = document.createElement('a');
            tocLink.href = `#${heading.id}`;
            tocLink.textContent = heading.textContent;
            
            tocItem.appendChild(tocLink);
            tocList.appendChild(tocItem);
            
            // Scroll to section on click
            tocLink.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = tocLink.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            });
        });
        
        // Insert TOC after lead paragraph
        const leadParagraph = articleBody.querySelector('p.article-lead');
        if (leadParagraph) {
            leadParagraph.after(tocContainer);
        } else {
            articleBody.prepend(tocContainer);
        }
    }
    
    // Reading progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const fullHeight = document.body.offsetHeight;
        const scrolled = window.scrollY;
        
        const percentScrolled = (scrolled / (fullHeight - windowHeight)) * 100;
        progressBar.style.width = `${percentScrolled}%`;
    });
    
    // Estimated reading time
    const articleContent = document.querySelector('.article-body').textContent;
    const wordCount = articleContent.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute
    
    const metaBottom = document.querySelector('.article-meta-bottom');
    if (metaBottom) {
        const readingTimeElement = document.createElement('div');
        readingTimeElement.className = 'reading-time';
        readingTimeElement.innerHTML = `<i class="far fa-clock"></i> ${readingTime} min read`;
        
        metaBottom.appendChild(readingTimeElement);
    }
}
