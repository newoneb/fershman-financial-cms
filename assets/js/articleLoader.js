/**
 * Article Loader JavaScript
 * Loads and displays articles from markdown files for Fershman Financial
 */

document.addEventListener('DOMContentLoaded', function() {
    // Load articles from the content directory
    loadArticles();
});

// Function to load articles from the content directory
async function loadArticles() {
    try {
        // Fetch the index of articles
        const response = await fetch('/content/articles/index.json');
        if (!response.ok) {
            throw new Error('Failed to load articles index');
        }
        
        const articlesIndex = await response.json();
        
        // Get the current page type
        const currentPage = getCurrentPage();
        
        // Display articles based on the current page
        if (currentPage === 'home') {
            displayFeaturedArticles(articlesIndex);
            displayLatestArticles(articlesIndex);
            displayExpertOpinions(articlesIndex);
        } else if (currentPage === 'category') {
            const category = getCategoryFromUrl();
            displayCategoryArticles(articlesIndex, category);
        } else if (currentPage === 'article') {
            const slug = getSlugFromUrl();
            displaySingleArticle(slug);
        }
        
        // Hide any loading indicators
        hideLoadingIndicators();
        
    } catch (error) {
        console.error('Error loading articles:', error);
        displayErrorMessage();
    }
}

// Function to determine the current page type
function getCurrentPage() {
    const path = window.location.pathname;
    
    if (path === '/' || path === '/index.html') {
        return 'home';
    } else if (path.includes('/articles/')) {
        return 'article';
    } else if (path.includes('/pages/')) {
        return 'category';
    }
    
    return 'other';
}

// Function to get the category from the URL
function getCategoryFromUrl() {
    const path = window.location.pathname;
    
    if (path.includes('/markets.html')) {
        return 'Markets';
    } else if (path.includes('/analysis.html')) {
        return 'Analysis';
    } else if (path.includes('/policy.html')) {
        return 'Policy & Regulation';
    } else if (path.includes('/opinion.html')) {
        return 'Opinion';
    }
    
    // Default to Markets if no category is found to prevent null category
    return 'Markets';
}

// Function to get the article slug from the URL
function getSlugFromUrl() {
    const path = window.location.pathname;
    const matches = path.match(/\/articles\/(.+)\.html/);
    
    if (matches && matches.length > 1) {
        return matches[1];
    }
    
    return null;
}

// Function to display featured articles on the homepage
async function displayFeaturedArticles(articlesIndex) {
    const container = document.getElementById('featured-articles-container');
    if (!container) return;
    
    // Clear loading message
    container.innerHTML = '';
    
    // Get the most recent article as featured
    if (articlesIndex.articles && articlesIndex.articles.length > 0) {
        const featuredArticle = articlesIndex.articles[0];
        
        try {
            // Fetch the article data
            const response = await fetch(`/content/articles/${featuredArticle.slug}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load article: ${featuredArticle.slug}`);
            }
            
            const articleData = await response.json();
            
            // Create featured article HTML
            const articleHtml = `
                <div class="featured-article">
                    <div class="article-image" style="background-image: url('${articleData.featuredImage}')"></div>
                    <div class="article-content">
                        <div class="article-category">${articleData.category}</div>
                        <h3 class="article-title">${articleData.title}</h3>
                        <p class="article-excerpt">${articleData.summary}</p>
                        <div class="article-meta">
                            <div class="article-author">By ${articleData.author}</div>
                            <div class="article-date">${formatDate(articleData.date)}</div>
                        </div>
                        <a href="/articles/${articleData.slug}.html" class="article-link">Read Full Analysis</a>
                    </div>
                </div>
            `;
            
            container.innerHTML = articleHtml;
            
        } catch (error) {
            console.error('Error loading featured article:', error);
            displayNoContentMessage(container, 'No featured articles available.');
        }
    } else {
        displayNoContentMessage(container, 'No featured articles available.');
    }
}

// Function to display latest articles on the homepage
async function displayLatestArticles(articlesIndex) {
    const container = document.getElementById('articles-grid-container');
    if (!container) return;
    
    // Clear loading message
    container.innerHTML = '';
    
    // Get the latest articles (skip the first one if it's used as featured)
    if (articlesIndex.articles && articlesIndex.articles.length > 0) {
        const latestArticles = articlesIndex.articles.slice(1, 4); // Get 3 articles after the featured one
        
        if (latestArticles.length > 0) {
            const articlesGrid = document.createElement('div');
            articlesGrid.className = 'articles-grid';
            
            // Create article cards for each article
            for (const article of latestArticles) {
                try {
                    // Fetch the article data
                    const response = await fetch(`/content/articles/${article.slug}.json`);
                    if (!response.ok) {
                        throw new Error(`Failed to load article: ${article.slug}`);
                    }
                    
                    const articleData = await response.json();
                    
                    // Create article card HTML
                    const articleCard = document.createElement('div');
                    articleCard.className = 'article-card';
                    articleCard.innerHTML = `
                        <div class="article-image" style="background-image: url('${articleData.featuredImage}')"></div>
                        <div class="article-content">
                            <div class="article-category">${articleData.category}</div>
                            <h4 class="article-title">${articleData.title}</h4>
                            <p class="article-excerpt">${articleData.summary}</p>
                            <div class="article-meta">
                                <div class="article-date">${formatDate(articleData.date)}</div>
                            </div>
                            <a href="/articles/${articleData.slug}.html" class="article-link">Read More</a>
                        </div>
                    `;
                    
                    articlesGrid.appendChild(articleCard);
                    
                } catch (error) {
                    console.error('Error loading article:', error);
                    continue;
                }
            }
            
            container.appendChild(articlesGrid);
            
        } else {
            displayNoContentMessage(container, 'No recent articles available.');
        }
    } else {
        displayNoContentMessage(container, 'No recent articles available.');
    }
}

// Function to display expert opinions on the homepage
async function displayExpertOpinions(articlesIndex) {
    const container = document.getElementById('expert-opinions-container');
    if (!container) return;
    
    // Clear loading message
    container.innerHTML = '';
    
    // Get articles in the Opinion category
    if (articlesIndex.articles && articlesIndex.articles.length > 0) {
        const opinionArticles = articlesIndex.articles.filter(article => 
            article.category === 'Opinion'
        ).slice(0, 3); // Get up to 3 opinion articles
        
        if (opinionArticles.length > 0) {
            const opinionsGrid = document.createElement('div');
            opinionsGrid.className = 'opinion-grid';
            
            // Create opinion cards for each article
            for (const article of opinionArticles) {
                try {
                    // Fetch the article data
                    const response = await fetch(`/content/articles/${article.slug}.json`);
                    if (!response.ok) {
                        throw new Error(`Failed to load article: ${article.slug}`);
                    }
                    
                    const articleData = await response.json();
                    
                    // Create opinion card HTML
                    const opinionCard = document.createElement('div');
                    opinionCard.className = 'opinion-card';
                    opinionCard.innerHTML = `
                        <div class="opinion-content">
                            <h4 class="opinion-title">${articleData.title}</h4>
                            <p class="opinion-excerpt">${articleData.summary}</p>
                            <div class="opinion-author">
                                <div class="author-name">By ${articleData.author}</div>
                                <div class="author-date">${formatDate(articleData.date)}</div>
                            </div>
                            <a href="/articles/${articleData.slug}.html" class="opinion-link">Read Full Opinion</a>
                        </div>
                    `;
                    
                    opinionsGrid.appendChild(opinionCard);
                    
                } catch (error) {
                    console.error('Error loading opinion article:', error);
                    continue;
                }
            }
            
            container.appendChild(opinionsGrid);
            
        } else {
            displayNoContentMessage(container, 'No expert opinions available.');
        }
    } else {
        displayNoContentMessage(container, 'No expert opinions available.');
    }
}

// Function to display articles for a specific category
async function displayCategoryArticles(articlesIndex, category) {
    const container = document.getElementById('category-articles-container');
    if (!container) return;
    
    // Clear loading message
    container.innerHTML = '';
    
    // Get articles in the specified category
    if (articlesIndex.articles && articlesIndex.articles.length > 0) {
        // Strict category matching - only show articles that exactly match the current category
        const categoryArticles = articlesIndex.articles.filter(article => 
            article.category === category
        );
        
        console.log(`Filtering for category: ${category}, found ${categoryArticles.length} matching articles`);
        
        if (categoryArticles.length > 0) {
            const articlesGrid = document.createElement('div');
            articlesGrid.className = 'articles-grid';
            
            // Create article cards for each article
            for (const article of categoryArticles) {
                try {
                    // Fetch the article data
                    const response = await fetch(`/content/articles/${article.slug}.json`);
                    if (!response.ok) {
                        throw new Error(`Failed to load article: ${article.slug}`);
                    }
                    
                    const articleData = await response.json();
                    
                    // Double-check category match to ensure proper filtering
                    if (articleData.category !== category) {
                        console.log(`Skipping article ${articleData.title} with category ${articleData.category} (not ${category})`);
                        continue;
                    }
                    
                    // Create article card HTML
                    const articleCard = document.createElement('div');
                    articleCard.className = 'article-card';
                    articleCard.innerHTML = `
                        <div class="article-image" style="background-image: url('${articleData.featuredImage}')"></div>
                        <div class="article-content">
                            <div class="article-category">${articleData.category}</div>
                            <h4 class="article-title">${articleData.title}</h4>
                            <p class="article-excerpt">${articleData.summary}</p>
                            <div class="article-meta">
                                <div class="article-date">${formatDate(articleData.date)}</div>
                            </div>
                            <a href="/articles/${articleData.slug}.html" class="article-link">Read More</a>
                        </div>
                    `;
                    
                    articlesGrid.appendChild(articleCard);
                    
                } catch (error) {
                    console.error('Error loading article:', error);
                    continue;
                }
            }
            
            container.appendChild(articlesGrid);
            
        } else {
            displayNoContentMessage(container, `No articles available in the ${category} category.`);
        }
    } else {
        displayNoContentMessage(container, `No articles available in the ${category} category.`);
    }
}

// Function to display a single article
async function displaySingleArticle(slug) {
    const container = document.getElementById('article-content-container');
    if (!container || !slug) return;
    
    try {
        // Fetch the article data
        const response = await fetch(`/content/articles/${slug}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load article: ${slug}`);
        }
        
        const articleData = await response.json();
        
        // Fetch the article markdown content
        const markdownResponse = await fetch(`/content/articles/${slug}.md`);
        if (!markdownResponse.ok) {
            throw new Error(`Failed to load article markdown: ${slug}`);
        }
        
        const markdownContent = await markdownResponse.text();
        
        // Parse the markdown content
        const parsedContent = parseMarkdown(markdownContent);
        
        // Update the page title
        document.title = `${articleData.title} | Fershman Financial`;
        
        // Update article header
        const articleHeader = document.querySelector('.article-header');
        if (articleHeader) {
            articleHeader.innerHTML = `
                <div class="container">
                    <div class="article-category">${articleData.category}</div>
                    <h1 class="article-title">${articleData.title}</h1>
                    <div class="article-meta-top">
                        <div class="article-author">By ${articleData.author}</div>
                        <div class="article-date">${formatDate(articleData.date)}</div>
                    </div>
                </div>
            `;
        }
        
        // Update featured image
        const featuredImage = document.querySelector('.article-featured-image');
        if (featuredImage) {
            featuredImage.style.backgroundImage = `url('${articleData.featuredImage}')`;
        }
        
        // Update article content
        container.innerHTML = `
            <div class="article-lead">${articleData.summary}</div>
            <div class="markdown-content">${parsedContent}</div>
        `;
        
    } catch (error) {
        console.error('Error loading article:', error);
        displayErrorMessage(container);
    }
}

// Function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

// Function to display a no content message
function displayNoContentMessage(container, message) {
    container.innerHTML = `
        <div class="no-content-message">
            <p>${message}</p>
        </div>
    `;
}

// Function to display an error message
function displayErrorMessage(container) {
    if (container) {
        container.innerHTML = `
            <div class="error-message">
                <p>Sorry, there was an error loading the content. Please try again later.</p>
            </div>
        `;
    }
}

// Function to hide loading indicators
function hideLoadingIndicators() {
    const loaders = document.querySelectorAll('.content-loader');
    loaders.forEach(loader => {
        loader.style.display = 'none';
    });
}

// Function to parse markdown content
function parseMarkdown(markdown) {
    // If the markdownParser.js is loaded, use its parseMarkdown function
    if (typeof window.markdownToHtml === 'function') {
        return window.markdownToHtml(markdown);
    }
    
    // Simple fallback if markdownParser.js is not loaded
    let html = markdown;
    
    // Remove front matter if present
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
    html = html.replace(frontMatterRegex, '');
    
    // Convert line breaks to paragraphs
    html = '<p>' + html.replace(/\n\n/g, '</p><p>') + '</p>';
    
    return html;
}
