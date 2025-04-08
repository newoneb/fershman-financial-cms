// Contentful integration for Fershman Financial website

// Contentful client configuration
const contentfulClient = {
  // This will use environment variables when deployed
  spaceId: process.env.CONTENTFUL_SPACE_ID || 'YOUR_SPACE_ID',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || 'YOUR_ACCESS_TOKEN',
  
  // Initialize the client
  init() {
    // When running in a browser environment with bundled code
    if (typeof contentful !== 'undefined') {
      return contentful.createClient({
        space: this.spaceId,
        accessToken: this.accessToken
      });
    } 
    // When running in Node.js environment (build process)
    else if (typeof require !== 'undefined') {
      const contentful = require('contentful');
      return contentful.createClient({
        space: this.spaceId,
        accessToken: this.accessToken
      });
    }
    
    console.error('Contentful client could not be initialized');
    return null;
  },
  
  // Get client instance
  getClient() {
    if (!this.client) {
      this.client = this.init();
    }
    return this.client;
  }
};

// Article content type functions
const articleService = {
  // Fetch all articles
  async getAllArticles(limit = 100) {
    try {
      const client = contentfulClient.getClient();
      const response = await client.getEntries({
        content_type: 'article',
        order: '-fields.publicationDate',
        limit: limit
      });
      
      return this.formatArticles(response.items);
    } catch (error) {
      console.error('Error fetching all articles:', error);
      return [];
    }
  },
  
  // Fetch articles by category
  async getArticlesByCategory(category, limit = 12) {
    try {
      const client = contentfulClient.getClient();
      const response = await client.getEntries({
        content_type: 'article',
        'fields.category': category,
        order: '-fields.publicationDate',
        limit: limit
      });
      
      return this.formatArticles(response.items);
    } catch (error) {
      console.error(`Error fetching articles for category ${category}:`, error);
      return [];
    }
  },
  
  // Fetch featured articles
  async getFeaturedArticles(limit = 5) {
    try {
      const client = contentfulClient.getClient();
      const response = await client.getEntries({
        content_type: 'article',
        'fields.featured': true,
        order: '-fields.publicationDate',
        limit: limit
      });
      
      return this.formatArticles(response.items);
    } catch (error) {
      console.error('Error fetching featured articles:', error);
      return [];
    }
  },
  
  // Fetch a single article by slug
  async getArticleBySlug(slug) {
    try {
      const client = contentfulClient.getClient();
      const response = await client.getEntries({
        content_type: 'article',
        'fields.slug': slug,
        limit: 1
      });
      
      if (response.items.length === 0) {
        return null;
      }
      
      return this.formatArticle(response.items[0]);
    } catch (error) {
      console.error(`Error fetching article with slug ${slug}:`, error);
      return null;
    }
  },
  
  // Fetch related articles
  async getRelatedArticles(category, currentSlug, limit = 3) {
    try {
      const client = contentfulClient.getClient();
      const response = await client.getEntries({
        content_type: 'article',
        'fields.category': category,
        order: '-fields.publicationDate',
        limit: limit + 1 // Fetch one extra to filter out current article
      });
      
      // Filter out the current article
      const filteredItems = response.items.filter(item => 
        item.fields.slug !== currentSlug
      ).slice(0, limit);
      
      return this.formatArticles(filteredItems);
    } catch (error) {
      console.error(`Error fetching related articles for ${category}:`, error);
      return [];
    }
  },
  
  // Format a single article
  formatArticle(item) {
    if (!item || !item.fields) return null;
    
    const fields = item.fields;
    
    return {
      id: item.sys.id,
      title: fields.title || '',
      slug: fields.slug || '',
      category: fields.category || '',
      author: fields.author ? {
        name: fields.author.fields?.name || '',
        title: fields.author.fields?.title || '',
        image: fields.author.fields?.image?.fields?.file?.url || ''
      } : { name: '', title: '', image: '' },
      publicationDate: fields.publicationDate || '',
      formattedDate: this.formatDate(fields.publicationDate),
      excerpt: fields.excerpt || '',
      content: fields.content || '',
      featuredImage: fields.featuredImage?.fields?.file?.url || '',
      featured: fields.featured || false,
      premium: fields.premium || false,
      tags: fields.tags || [],
      metaDescription: fields.metaDescription || ''
    };
  },
  
  // Format multiple articles
  formatArticles(items) {
    return items.map(item => this.formatArticle(item)).filter(Boolean);
  },
  
  // Format date for display
  formatDate(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
};

// Market Data content type functions
const marketDataService = {
  // Fetch all market data
  async getMarketData() {
    try {
      const client = contentfulClient.getClient();
      const response = await client.getEntries({
        content_type: 'marketData',
        order: 'fields.order'
      });
      
      return this.formatMarketData(response.items);
    } catch (error) {
      console.error('Error fetching market data:', error);
      return [];
    }
  },
  
  // Format market data
  formatMarketData(items) {
    return items.map(item => {
      const fields = item.fields;
      return {
        id: item.sys.id,
        symbol: fields.symbol || '',
        value: fields.value || '',
        change: fields.change || '',
        direction: fields.direction || 'neutral',
        order: fields.order || 0
      };
    });
  }
};

// Expert Opinion content type functions
const opinionService = {
  // Fetch all expert opinions
  async getExpertOpinions(limit = 6) {
    try {
      const client = contentfulClient.getClient();
      const response = await client.getEntries({
        content_type: 'expertOpinion',
        order: '-fields.publicationDate',
        limit: limit
      });
      
      return this.formatOpinions(response.items);
    } catch (error) {
      console.error('Error fetching expert opinions:', error);
      return [];
    }
  },
  
  // Format opinions
  formatOpinions(items) {
    return items.map(item => {
      const fields = item.fields;
      return {
        id: item.sys.id,
        quote: fields.quote || '',
        authorName: fields.authorName || '',
        authorTitle: fields.authorTitle || '',
        authorImage: fields.authorImage?.fields?.file?.url || '',
        publicationDate: fields.publicationDate || '',
        formattedDate: this.formatDate(fields.publicationDate)
      };
    });
  },
  
  // Format date for display
  formatDate(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
};

// Featured Analysis content type functions
const analysisService = {
  // Fetch featured analysis
  async getFeaturedAnalysis(limit = 3) {
    try {
      const client = contentfulClient.getClient();
      const response = await client.getEntries({
        content_type: 'featuredAnalysis',
        order: '-fields.publicationDate',
        limit: limit
      });
      
      return this.formatAnalysis(response.items);
    } catch (error) {
      console.error('Error fetching featured analysis:', error);
      return [];
    }
  },
  
  // Format analysis
  formatAnalysis(items) {
    return items.map(item => {
      const fields = item.fields;
      return {
        id: item.sys.id,
        title: fields.title || '',
        category: fields.category || '',
        summary: fields.summary || '',
        articleLink: fields.articleLink?.fields?.slug ? 
          `/articles/${fields.articleLink.fields.slug}.html` : '#',
        premium: fields.premium || false,
        publicationDate: fields.publicationDate || '',
        formattedDate: this.formatDate(fields.publicationDate)
      };
    });
  },
  
  // Format date for display
  formatDate(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
};

// DOM manipulation functions to render content from Contentful
const contentRenderer = {
  // Render featured articles on homepage
  renderFeaturedArticles(containerId = 'featured-articles') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    articleService.getFeaturedArticles().then(articles => {
      if (articles.length === 0) {
        container.innerHTML = '<p>No featured articles found.</p>';
        return;
      }
      
      let html = '';
      
      // Main featured article
      const mainArticle = articles[0];
      html += `
        <div class="featured-article main-article">
          <div class="article-image" style="background-image: url('${mainArticle.featuredImage}')"></div>
          <div class="article-content">
            <div class="article-category">${mainArticle.category}</div>
            <h3 class="article-title">${mainArticle.title}</h3>
            <p class="article-excerpt">${mainArticle.excerpt}</p>
            <div class="article-meta">
              <span class="article-author">By ${mainArticle.author.name}</span>
              <span class="article-date">${mainArticle.formattedDate}</span>
            </div>
            <a href="articles/${mainArticle.slug}.html" class="article-link">Read More</a>
          </div>
        </div>
      `;
      
      // Secondary featured articles
      const secondaryArticles = articles.slice(1);
      secondaryArticles.forEach(article => {
        html += `
          <div class="featured-article">
            <div class="article-image" style="background-image: url('${article.featuredImage}')"></div>
            <div class="article-content">
              <div class="article-category">${article.category}</div>
              <h3 class="article-title">${article.title}</h3>
              <p class="article-excerpt">${article.excerpt}</p>
              <div class="article-meta">
                <span class="article-author">By ${article.author.name}</span>
                <span class="article-date">${article.formattedDate}</span>
              </div>
              <a href="articles/${article.slug}.html" class="article-link">Read More</a>
            </div>
          </div>
        `;
      });
      
      container.innerHTML = html;
    });
  },
  
  // Render category articles
  renderCategoryArticles(category, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    articleService.getArticlesByCategory(category).then(articles => {
      if (articles.length === 0) {
        container.innerHTML = `<p>No articles found in the ${category} category.</p>`;
        return;
      }
      
      let html = '';
      
      articles.forEach(article => {
        html += `
          <div class="article-card">
            <div class="article-image" style="background-image: url('${article.featuredImage}')"></div>
            <div class="article-content">
              <div class="article-category">${article.category}</div>
              <h3 class="article-title">${article.title}</h3>
              <p class="article-excerpt">${article.excerpt}</p>
              <div class="article-meta">
                <span class="article-author">By ${article.author.name}</span>
                <span class="article-date">${article.formattedDate}</span>
              </div>
              <a href="../articles/${article.slug}.html" class="article-link">Read More</a>
            </div>
          </div>
        `;
      });
      
      container.innerHTML = html;
    });
  },
  
  // Render expert opinions
  renderExpertOpinions(containerId = 'expert-opinions') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    opinionService.getExpertOpinions().then(opinions => {
      if (opinions.length === 0) {
        container.innerHTML = '<p>No expert opinions found.</p>';
        return;
      }
      
      let html = '';
      
      opinions.forEach(opinion => {
        html += `
          <div class="opinion-card">
            <div class="opinion-image" style="background-image: url('${opinion.authorImage}')"></div>
            <div class="opinion-content">
              <div class="opinion-author">
                <h3 class="author-name">${opinion.authorName}</h3>
                <p class="author-title">${opinion.authorTitle}</p>
              </div>
              <h3 class="opinion-title">${opinion.quote.substring(0, 60)}...</h3>
              <p class="opinion-excerpt">${opinion.quote}</p>
              <div class="opinion-meta">
                <span class="opinion-date">${opinion.formattedDate}</span>
              </div>
            </div>
          </div>
        `;
      });
      
      container.innerHTML = html;
    });
  },
  
  // Render market data ticker
  renderMarketTicker(containerId = 'market-ticker') {
    const container = document.querySelector('.ticker');
    if (!container) return;
    
    marketDataService.getMarketData().then(marketData => {
      if (marketData.length === 0) {
        container.innerHTML = '<div class="ticker-item">No market data available</div>';
        return;
      }
      
      let html = '';
      
      marketData.forEach(item => {
        html += `
          <div class="ticker-item">
            <span class="ticker-symbol">${item.symbol}</span>
            <span class="ticker-value ${item.direction}">${item.value}</span>
            <span class="ticker-change ${item.direction}">${item.change}</span>
          </div>
        `;
      });
      
      // Clone ticker items for continuous scrolling
      container.innerHTML = html + html;
    });
  },
  
  // Render a single article page
  renderArticlePage(slug) {
    if (!slug) return;
    
    articleService.getArticleBySlug(slug).then(article => {
      if (!article) {
        console.error(`Article with slug ${slug} not found`);
        return;
      }
      
      // Update page title and meta description
      document.title = `${article.title} | Fershman Financial`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', article.metaDescription || article.excerpt);
      }
      
      // Update article header
      const categoryElement = document.querySelector('.article-header-category');
      if (categoryElement) categoryElement.textContent = article.category;
      
      const titleElement = document.querySelector('.article-header-title');
      if (titleElement) titleElement.textContent = article.title;
      
      const authorNameElement = document.querySelector('.article-author-name');
      if (authorNameElement) authorNameElement.textContent = article.author.name;
      
      const dateElement = document.querySelector('.article-header-date');
      if (dateElement) dateElement.textContent = article.formattedDate;
      
      const authorImageElement = document.querySelector('.article-author-image');
      if (authorImageElement && article.author.image) {
        authorImageElement.style.backgroundImage = `url('${article.author.image}')`;
      }
      
      // Update featured image
      const featuredImageElement = document.querySelector('.article-featured-image');
      if (featuredImageElement && article.featuredImage) {
        featuredImageElement.style.backgroundImage = `url('${article.featuredImage}')`;
      }
      
      // Update article content
      const contentElement = document.querySelector('.article-content');
      if (contentElement) contentElement.innerHTML = article.content;
      
      // Update article tags
      const tagsElement = document.querySelector('.article-tags');
      if (tagsElement && article.tags.length > 0) {
        let tagsHtml = '';
        article.tags.forEach(tag => {
          tagsHtml += `<a href="#" class="article-tag">${tag}</a>`;
        });
        tagsElement.innerHTML = tagsHtml;
      }
      
      // Fetch and render related articles
      this.renderRelatedArticles(article.category, article.slug);
    });
  },
  
  // Render related articles
  renderRelatedArticles(category, currentSlug) {
    const container = document.getElementById('related-articles');
    if (!container) return;
    
    articleService.getRelatedArticles(category, currentSlug).then(articles => {
      if (articles.length === 0) {
        container.innerHTML = '<p>No related articles found.</p>';
        return;
      }
      
      let html = '';
      
      articles.forEach(article => {
        html += `
          <div class="article-card">
            <div class="article-image" style="background-image: url('${article.featuredImage}')"></div>
            <div class="article-content">
              <div class="article-category">${article.category}</div>
              <h3 class="article-title">${article.title}</h3>
              <p class="article-excerpt">${article.excerpt}</p>
              <div class="article-meta">
                <span class="article-author">By ${article.author.name}</span>
                <span class="article-date">${article.formattedDate}</span>
              </div>
              <a href="${article.slug}.html" class="article-link">Read More</a>
            </div>
          </div>
        `;
      });
      
      container.innerHTML = html;
    });
  }
};

// Initialize content on page load
document.addEventListener('DOMContentLoaded', () => {
  // Check what page we're on and render appropriate content
  const path = window.location.pathname;
  
  // Home page
  if (path === '/' || path.endsWith('index.html')) {
    contentRenderer.renderFeaturedArticles();
    contentRenderer.renderMarketTicker();
    contentRenderer.renderExpertOpinions();
  }
  
  // Category pages
  if (path.includes('/pages/markets.html')) {
    contentRenderer.renderCategoryArticles('Markets', 'market-articles');
    contentRenderer.renderMarketTicker();
  }
  
  if (path.includes('/pages/analysis.html')) {
    contentRenderer.renderCategoryArticles('Analysis', 'analysis-articles');
    contentRenderer.renderMarketTicker();
  }
  
  if (path.includes('/pages/policy.html')) {
    contentRenderer.renderCategoryArticles('Policy & Regulation', 'policy-articles');
    contentRenderer.renderMarketTicker();
  }
  
  if (path.includes('/pages/opinion.html')) {
    contentRenderer.renderExpertOpinions('opinion-articles');
    contentRenderer.renderMarketTicker();
  }
  
  // Article page
  if (path.includes('/articles/') && path.endsWith('.html')) {
    const slug = path.split('/').pop().replace('.html', '');
    contentRenderer.renderArticlePage(slug);
    contentRenderer.renderMarketTicker();
  }
});

// Export services for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    contentfulClient,
    articleService,
    marketDataService,
    opinionService,
    analysisService,
    contentRenderer
  };
}
