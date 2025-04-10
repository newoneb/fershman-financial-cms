// Dynamic article routing for Fershman Financial
// This file handles creating dynamic article pages from Contentful content

document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on the article template page
  if (window.location.pathname.includes('/articles/')) {
    initDynamicArticle();
  }
});

// Initialize dynamic article page
async function initDynamicArticle() {
  // Get article slug from URL
  const slug = getArticleSlugFromUrl();
  
  if (!slug) {
    showArticleError('Invalid article URL');
    return;
  }
  
  // Show loading state
  showArticleLoading();
  
  try {
    // Fetch article data from Contentful
    const article = await contentfulClient.getArticleBySlug(slug);
    
    if (!article) {
      showArticleError('Article not found');
      return;
    }
    
    // Render article content
    renderArticle(article);
    
    // Initialize article features (TOC, reading time, etc.)
    if (typeof initArticleFeatures === 'function') {
      initArticleFeatures();
    }
  } catch (error) {
    console.error('Error loading article:', error);
    showArticleError('Failed to load article');
  }
}

// Get article slug from URL
function getArticleSlugFromUrl() {
  const path = window.location.pathname;
  const pathParts = path.split('/');
  const filename = pathParts[pathParts.length - 1];
  
  // Remove .html extension if present
  return filename.replace('.html', '');
}

// Show article loading state
function showArticleLoading() {
  const articleHeader = document.querySelector('.article-header');
  const articleFeaturedImage = document.querySelector('.article-featured-image');
  const articleBody = document.querySelector('.article-body');
  
  if (articleHeader) {
    articleHeader.innerHTML = '<div class="loading-placeholder"><div class="loading-shimmer"></div></div>';
  }
  
  if (articleFeaturedImage) {
    articleFeaturedImage.innerHTML = '<div class="loading-placeholder full-width"><div class="loading-shimmer"></div></div>';
  }
  
  if (articleBody) {
    articleBody.innerHTML = `
      <div class="loading-placeholder"><div class="loading-shimmer"></div></div>
      <div class="loading-placeholder"><div class="loading-shimmer"></div></div>
      <div class="loading-placeholder"><div class="loading-shimmer"></div></div>
    `;
  }
}

// Show article error message
function showArticleError(message) {
  const articleHeader = document.querySelector('.article-header');
  const articleFeaturedImage = document.querySelector('.article-featured-image');
  const articleBody = document.querySelector('.article-body');
  
  // Hide featured image
  if (articleFeaturedImage) {
    articleFeaturedImage.style.display = 'none';
  }
  
  // Update header with error message
  if (articleHeader) {
    articleHeader.innerHTML = `
      <div class="container">
        <h1 class="article-title">Article Not Found</h1>
      </div>
    `;
  }
  
  // Show error message in body
  if (articleBody) {
    articleBody.innerHTML = `
      <div class="container">
        <div class="error-message">
          <p>${message || 'The article you are looking for could not be found.'}</p>
          <p>Please check the URL or return to the <a href="/index.html">homepage</a>.</p>
        </div>
      </div>
    `;
  }
  
  // Update page title
  document.title = 'Article Not Found | Fershman Financial';
}

// Render article content
function renderArticle(article) {
  // Update page title
  document.title = `${article.title} | Fershman Financial`;
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    const description = article.excerpt.replace(/<[^>]*>/g, '').substring(0, 160);
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
  if (articleFeaturedImage && article.featuredImage) {
    articleFeaturedImage.style.backgroundImage = `url('${article.featuredImage}')`;
  }
  
  // Update article body
  const articleBody = document.querySelector('.article-body');
  if (articleBody) {
    articleBody.innerHTML = `
      <p class="article-lead">${article.excerpt}</p>
      ${article.content}
    `;
  }
  
  // Load related articles if available
  loadRelatedArticles(article.category, article.slug);
}

// Load related articles
async function loadRelatedArticles(category, currentSlug) {
  const relatedArticlesContainer = document.querySelector('.related-articles .related-articles-list');
  if (!relatedArticlesContainer) return;
  
  try {
    // Show loading state
    relatedArticlesContainer.innerHTML = '<div class="loading-placeholder"><div class="loading-shimmer"></div></div>';
    
    // Fetch articles in the same category
    const articles = await contentfulClient.getArticles(category);
    
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
            <div class="related-article-image" style="background-image: url('${article.featuredImage}');"></div>
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
