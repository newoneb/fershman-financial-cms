// Contentful integration for Fershman Financial
const contentful = require('contentful');

// Initialize the Contentful client with environment variables
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Content renderer for different sections of the website
const contentRenderer = {
  // Render featured articles on the homepage
  renderFeaturedArticles: async function(containerId = 'featured-articles') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    try {
      const response = await client.getEntries({
        content_type: 'article',
        order: '-fields.publicationDate',
        limit: 4
      });
      
      if (response.items.length > 0) {
        let html = '';
        
        // First article gets the main-article class
        const mainArticle = response.items[0];
        html += `
          <div class="featured-article main-article">
            <div class="article-image" style="background-image: url('${mainArticle.fields.featuredImage?.fields?.file?.url || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'}')"></div>
            <div class="article-content">
              <div class="article-category">${mainArticle.fields.category || 'Markets'}</div>
              <h3 class="article-title">${mainArticle.fields.title}</h3>
              <p class="article-excerpt">${mainArticle.fields.summary || ''}</p>
              <div class="article-meta">
                <span class="article-author">By ${mainArticle.fields.author || 'Fershman Financial'}</span>
                <span class="article-date">${new Date(mainArticle.fields.publicationDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <a href="/articles/${mainArticle.fields.slug}" class="article-link">Read More</a>
            </div>
          </div>
        `;
        
        // Remaining articles
        for (let i = 1; i < response.items.length; i++) {
          const article = response.items[i];
          html += `
            <div class="featured-article">
              <div class="article-image" style="background-image: url('${article.fields.featuredImage?.fields?.file?.url || 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'}')"></div>
              <div class="article-content">
                <div class="article-category">${article.fields.category || 'Markets'}</div>
                <h3 class="article-title">${article.fields.title}</h3>
                <p class="article-excerpt">${article.fields.summary || ''}</p>
                <div class="article-meta">
                  <span class="article-author">By ${article.fields.author || 'Fershman Financial'}</span>
                  <span class="article-date">${new Date(article.fields.publicationDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <a href="/articles/${article.fields.slug}" class="article-link">Read More</a>
              </div>
            </div>
          `;
        }
        
        container.innerHTML = html;
      }
    } catch (error) {
      console.error('Error fetching featured articles:', error);
      // Use fallback content if there's an error
    }
  },
  
  // Render market ticker data
  renderMarketTicker: async function() {
    const tickerContainer = document.querySelector('.ticker');
    if (!tickerContainer) return;
    
    try {
      const response = await client.getEntries({
        content_type: 'marketData',
        order: 'fields.symbol'
      });
      
      if (response.items.length > 0) {
        let html = '';
        
        response.items.forEach(item => {
          const direction = item.fields.changePercentage > 0 ? 'up' : 'down';
          html += `
            <div class="ticker-item">
              <span class="ticker-symbol">${item.fields.symbol}</span>
              <span class="ticker-value ${direction}">${item.fields.value.toFixed(2)}</span>
              <span class="ticker-change ${direction}">${item.fields.changePercentage > 0 ? '+' : ''}${item.fields.changePercentage.toFixed(2)}%</span>
            </div>
          `;
        });
        
        tickerContainer.innerHTML = html;
        
        // Reinitialize ticker animation
        if (typeof initTickerAnimation === 'function') {
          initTickerAnimation();
        }
      }
    } catch (error) {
      console.error('Error fetching market data:', error);
      // Keep default ticker data if there's an error
    }
  },
  
  // Render expert opinions
  renderExpertOpinions: async function(containerId = 'expert-opinions') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    try {
      const response = await client.getEntries({
        content_type: 'expertOpinion',
        order: '-sys.createdAt'
      });
      
      if (response.items.length > 0) {
        let html = '';
        
        response.items.forEach(opinion => {
          html += `
            <div class="opinion-quote">
              <div class="quote-mark">"</div>
              <p class="quote-text">${opinion.fields.quoteText}</p>
              <div class="quote-author">
                <div class="author-image" style="background-image: url('${opinion.fields.authorImage?.fields?.file?.url || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'}')"></div>
                <div class="author-details">
                  <h4 class="author-name">${opinion.fields.authorName}</h4>
                  <p class="author-title">${opinion.fields.authorTitle}</p>
                </div>
              </div>
            </div>
          `;
        });
        
        container.innerHTML = html;
      }
    } catch (error) {
      console.error('Error fetching expert opinions:', error);
      // Keep default opinions if there's an error
    }
  },
  
  // Render articles by category
  renderCategoryArticles: async function(category, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    try {
      const response = await client.getEntries({
        content_type: 'article',
        'fields.category': category,
        order: '-fields.publicationDate'
      });
      
      if (response.items.length > 0) {
        let html = '';
        
        response.items.forEach(article => {
          html += `
            <div class="article-card">
              <div class="article-image" style="background-image: url('${article.fields.featuredImage?.fields?.file?.url || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'}')"></div>
              <div class="article-content">
                <div class="article-category">${article.fields.category}</div>
                <h3 class="article-title">${article.fields.title}</h3>
                <p class="article-excerpt">${article.fields.summary || ''}</p>
                <div class="article-meta">
                  <span class="article-author">By ${article.fields.author || 'Fershman Financial'}</span>
                  <span class="article-date">${new Date(article.fields.publicationDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <a href="/articles/${article.fields.slug}" class="article-link">Read More</a>
              </div>
            </div>
          `;
        });
        
        container.innerHTML = html;
      } else {
        container.innerHTML = `<div class="no-articles">No articles found in this category.</div>`;
      }
    } catch (error) {
      console.error(`Error fetching ${category} articles:`, error);
      // Keep default articles if there's an error
    }
  },
  
  // Render a single article page
  renderArticlePage: async function(slug) {
    try {
      const response = await client.getEntries({
        content_type: 'article',
        'fields.slug': slug
      });
      
      if (response.items.length > 0) {
        const article = response.items[0];
        
        // Update page title
        document.title = `${article.fields.title} - Fershman Financial`;
        
        // Update article header
        const headerCategory = document.querySelector('.article-header-category');
        if (headerCategory) headerCategory.textContent = article.fields.category || 'Markets';
        
        const headerTitle = document.querySelector('.article-header-title');
        if (headerTitle) headerTitle.textContent = article.fields.title;
        
        const authorName = document.querySelector('.article-author-name');
        if (authorName) authorName.textContent = article.fields.author || 'Fershman Financial';
        
        const headerDate = document.querySelector('.article-header-date');
        if (headerDate) headerDate.textContent = new Date(article.fields.publicationDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        
        // Update featured image
        const featuredImage = document.querySelector('.article-featured-image');
        if (featuredImage) {
          featuredImage.style.backgroundImage = `url('${article.fields.featuredImage?.fields?.file?.url || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'}')`;
        }
        
        // Update article content
        const articleContent = document.querySelector('.article-content');
        if (articleContent) {
          // For rich text content, you would need to use a rich text renderer
          // This is a simplified version that assumes content is HTML
          articleContent.innerHTML = article.fields.content || '<p>No content available for this article.</p>';
        }
        
        // Update article tags
        const articleTags = document.querySelector('.article-tags');
        if (articleTags && article.fields.tags) {
          let tagsHtml = '<h3>Tags</h3><div class="tags-list">';
          article.fields.tags.forEach(tag => {
            tagsHtml += `<span class="tag">${tag}</span>`;
          });
          tagsHtml += '</div>';
          articleTags.innerHTML = tagsHtml;
        }
        
        // Load related articles
        this.renderRelatedArticles(article.fields.category, article.sys.id);
      } else {
        // Article not found
        Router.navigateTo('/404');
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      // Navigate to error page
      Router.navigateTo('/error');
    }
  },
  
  // Render related articles
  renderRelatedArticles: async function(category, currentArticleId) {
    const container = document.getElementById('related-articles');
    if (!container) return;
    
    try {
      const response = await client.getEntries({
        content_type: 'article',
        'fields.category': category,
        order: '-fields.publicationDate',
        limit: 3
      });
      
      if (response.items.length > 0) {
        let html = '';
        
        // Filter out the current article
        const relatedArticles = response.items.filter(article => article.sys.id !== currentArticleId);
        
        relatedArticles.forEach(article => {
          html += `
            <div class="related-article">
              <div class="article-image" style="background-image: url('${article.fields.featuredImage?.fields?.file?.url || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'}')"></div>
              <div class="article-content">
                <div class="article-category">${article.fields.category}</div>
                <h3 class="article-title">${article.fields.title}</h3>
                <div class="article-meta">
                  <span class="article-date">${new Date(article.fields.publicationDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <a href="/articles/${article.fields.slug}" class="article-link">Read More</a>
              </div>
            </div>
          `;
        });
        
        container.innerHTML = html;
      }
    } catch (error) {
      console.error('Error fetching related articles:', error);
      // Keep container empty if there's an error
    }
  }
};

// Make contentRenderer available globally
window.contentRenderer = contentRenderer;

// Export the contentRenderer for use in other modules
module.exports = contentRenderer;
