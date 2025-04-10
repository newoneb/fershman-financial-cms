// Article loader for Fershman Financial
// This file handles loading and displaying articles from markdown files

document.addEventListener('DOMContentLoaded', function() {
  // Initialize article loading based on the current page
  loadPageContent();
});

// Load content based on the current page
async function loadPageContent() {
  const currentPath = window.location.pathname;
  
  // Check if we're on an article page
  if (currentPath.includes('/articles/')) {
    const slug = currentPath.split('/').pop().replace('.html', '');
    await loadArticle(slug);
    return;
  }
  
  // Check if we're on a category page
  let category = null;
  if (currentPath.includes('/markets.html')) {
    category = 'Markets';
  } else if (currentPath.includes('/analysis.html')) {
    category = 'Analysis';
  } else if (currentPath.includes('/policy.html')) {
    category = 'Policy & Regulation';
  } else if (currentPath.includes('/opinion.html')) {
    category = 'Opinion';
  }
  
  // Load featured articles
  await loadFeaturedArticles(category);
  
  // Load articles grid
  await loadArticlesGrid(category);
}

// Load featured articles
async function loadFeaturedArticles(category = null) {
  const container = document.getElementById('featured-articles-container');
  if (!container) return;
  
  // Show loading state
  container.innerHTML = '<div class="loading"><p>Loading featured articles...</p></div>';
  
  try {
    // Fetch articles
    const articles = await fetchArticles(category);
    
    // Clear loading message
    container.innerHTML = '';
    
    if (articles.length === 0) {
      container.innerHTML = `
        <div class="no-content-message">
          <p>No featured articles available yet. Check back soon for updates.</p>
        </div>
      `;
      return;
    }
    
    // Display featured articles (first article)
    articles.slice(0, 1).forEach(article => {
      container.innerHTML += `
        <article class="featured-article fade-in">
          <div class="article-image" style="background-image: url('${article.thumbnail}');"></div>
          <div class="article-content">
            <span class="article-category">${article.category}</span>
            <h3 class="article-title">${article.title}</h3>
            <div class="article-meta">
              <span class="article-author">By ${article.author}</span>
              <span class="article-date">${formatDate(article.date)}</span>
            </div>
            <div class="article-excerpt">${article.summary}</div>
            <a href="/articles/${article.slug}.html" class="article-link">Read Analysis</a>
          </div>
        </article>
      `;
    });
  } catch (error) {
    console.error('Error loading featured articles:', error);
    container.innerHTML = `
      <div class="error-message">
        <p>Failed to load featured articles. Please try again later.</p>
      </div>
    `;
  }
}

// Load articles grid
async function loadArticlesGrid(category = null) {
  const container = document.getElementById('articles-grid-container');
  if (!container) return;
  
  // Show loading state
  container.innerHTML = '<div class="loading"><p>Loading latest articles...</p></div>';
  
  try {
    // Fetch articles
    const articles = await fetchArticles(category);
    
    // Clear loading message
    container.innerHTML = '';
    
    if (articles.length === 0) {
      container.innerHTML = `
        <div class="no-content-message">
          <p>No articles available in this category yet. Check back soon for updates.</p>
        </div>
      `;
      return;
    }
    
    // Skip the first article if it's already shown in featured section
    const startIndex = document.getElementById('featured-articles-container') ? 1 : 0;
    
    // Display articles
    articles.slice(startIndex).forEach(article => {
      container.innerHTML += `
        <article class="article-card fade-in">
          <div class="article-image" style="background-image: url('${article.thumbnail}');"></div>
          <div class="article-content">
            <span class="article-category">${article.category}</span>
            <h3 class="article-title">${article.title}</h3>
            <div class="article-meta">
              <span class="article-date">${formatDate(article.date)}</span>
            </div>
            <div class="article-excerpt">${article.summary}</div>
            <a href="/articles/${article.slug}.html" class="article-link">Read Analysis</a>
          </div>
        </article>
      `;
    });
  } catch (error) {
    console.error('Error loading articles grid:', error);
    container.innerHTML = `
      <div class="error-message">
        <p>Failed to load articles. Please try again later.</p>
      </div>
    `;
  }
}

// Load a single article
async function loadArticle(slug) {
  const container = document.getElementById('article-container');
  if (!container) return;
  
  // Show loading state
  container.innerHTML = '<div class="loading"><p>Loading article...</p></div>';
  
  try {
    // Fetch article by slug
    const article = await fetchArticleBySlug(slug);
    
    // Clear loading message
    container.innerHTML = '';
    
    if (!article) {
      container.innerHTML = `
        <div class="no-content-message">
          <h2>Article Not Found</h2>
          <p>The article you are looking for could not be found.</p>
          <p>Please check the URL or return to the <a href="/index.html">homepage</a>.</p>
        </div>
      `;
      return;
    }
    
    // Render article content
    renderArticle(article);
    
    // Initialize article features (TOC, reading time, etc.)
    if (typeof initArticleFeatures === 'function') {
      initArticleFeatures();
    }
    
    // Load related articles
    loadRelatedArticles(article.category, article.slug);
  } catch (error) {
    console.error('Error loading article:', error);
    container.innerHTML = `
      <div class="error-message">
        <h2>Error Loading Article</h2>
        <p>Failed to load the article. Please try again later.</p>
        <p>Return to the <a href="/index.html">homepage</a>.</p>
      </div>
    `;
  }
}

// Fetch articles (with optional category filter)
async function fetchArticles(category = null) {
  try {
    // Fetch the list of articles from the content directory
    const response = await fetch('/content/articles/index.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.status} ${response.statusText}`);
    }
    
    let articles = await response.json();
    
    // Filter by category if specified
    if (category) {
      articles = articles.filter(article => article.category === category);
    }
    
    // Sort by date (newest first)
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

// Fetch article by slug
async function fetchArticleBySlug(slug) {
  try {
    // Fetch the list of articles
    const articles = await fetchArticles();
    
    // Find the article with the matching slug
    const articleMeta = articles.find(article => article.slug === slug);
    if (!articleMeta) {
      return null;
    }
    
    // Fetch the full article content
    const response = await fetch(`/content/articles/${slug}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch article content: ${response.status} ${response.statusText}`);
    }
    
    const articleContent = await response.json();
    
    // Combine metadata with content
    return { ...articleMeta, ...articleContent };
  } catch (error) {
    console.error(`Error fetching article with slug ${slug}:`, error);
    return null;
  }
}

// Render article content
function renderArticle(article) {
  // Update page title
  document.title = `${article.title} | Fershman Financial`;
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    const description = article.summary.substring(0, 160);
    metaDescription.setAttribute('content', description);
  }
  
  // Update article header
  const articleHeader = document.querySelector('.article-header');
  if (articleHeader) {
    articleHeader.innerHTML = `
      <div class="container">
        <div class="article-meta-top">
          <a href="../pages/${getCategoryUrl(article.category)}" class="article-category">${article.category}</a>
          <span class="article-date">${formatDate(article.date)}</span>
        </div>
        <h1 class="article-title">${article.title}</h1>
        <div class="article-meta-bottom">
          <div class="article-author">
            <span>By <strong>${article.author}</strong></span>
          </div>
          <div class="article-share">
            <span>Share:</span>
            <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}" target="_blank" class="share-icon"><i class="fab fa-twitter"></i></a>
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}" target="_blank" class="share-icon"><i class="fab fa-linkedin-in"></i></a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" class="share-icon"><i class="fab fa-facebook-f"></i></a>
          </div>
        </div>
      </div>
    `;
  }
  
  // Update featured image
  const articleFeaturedImage = document.querySelector('.article-featured-image');
  if (articleFeaturedImage && article.thumbnail) {
    articleFeaturedImage.style.backgroundImage = `url('${article.thumbnail}')`;
  }
  
  // Update article body
  const articleBody = document.querySelector('.article-body');
  if (articleBody) {
    articleBody.innerHTML = `
      <p class="article-lead">${article.summary}</p>
      ${article.content}
    `;
  }
}

// Load related articles
async function loadRelatedArticles(category, currentSlug) {
  const relatedArticlesContainer = document.querySelector('.related-articles .related-articles-list');
  if (!relatedArticlesContainer) return;
  
  try {
    // Show loading state
    relatedArticlesContainer.innerHTML = '<div class="loading-placeholder"><div class="loading-shimmer"></div></div>';
    
    // Fetch articles in the same category
    const articles = await fetchArticles(category);
    
    // Filter out current article and limit to 3
    const relatedArticles = articles
      .filter(article => article.slug !== currentSlug)
      .slice(0, 3);
    
    if (relatedArticles.length === 0) {
      relatedArticlesContainer.innerHTML = '<p>No related articles found.</p>';
      return;
    }
    
    // Render related articles
    relatedArticlesContainer.innerHTML = '';
    relatedArticles.forEach(article => {
      relatedArticlesContainer.innerHTML += `
        <div class="related-article">
          <a href="/articles/${article.slug}.html">
            <div class="related-article-image" style="background-image: url('${article.thumbnail}');"></div>
            <div class="related-article-content">
              <h4>${article.title}</h4>
              <span class="related-article-date">${formatDate(article.date)}</span>
            </div>
          </a>
        </div>
      `;
    });
  } catch (error) {
    console.error('Error loading related articles:', error);
    relatedArticlesContainer.innerHTML = '<p>Failed to load related articles.</p>';
  }
}

// Get category URL from category name
function getCategoryUrl(category) {
  const categoryMap = {
    'Markets': 'markets.html',
    'Analysis': 'analysis.html',
    'Policy & Regulation': 'policy.html',
    'Opinion': 'opinion.html'
  };
  
  return categoryMap[category] || 'index.html';
}

// Format date
function formatDate(date) {
  if (!date) return '';
  
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
}
