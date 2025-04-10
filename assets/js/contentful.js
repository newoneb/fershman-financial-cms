// Contentful integration for Fershman Financial
// This file handles fetching and displaying content from Contentful CMS

// Import Contentful SDK
const contentful = window.contentful || {};

// Initialize Contentful client
const contentfulClient = {
  // Space and access token provided by environment variables in production
  spaceId: process.env.CONTENTFUL_SPACE_ID || 'jkx7dn6qj8zy',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || 'Bxoz6UQiiLQ0xdpzzvfpVSEScWh-u0t9OZKklXmisbM',
  client: null,
  
  // Initialize the client
  init() {
    console.log('Contentful client initializing...');
    
    try {
      // Create Contentful client
      this.client = contentful.createClient({
        space: this.spaceId,
        accessToken: this.accessToken
      });
      
      console.log('Contentful client initialized successfully with:');
      console.log(`Space ID: ${this.spaceId}`);
      console.log(`Access Token: ${this.accessToken.substring(0, 5)}...`);
    } catch (error) {
      console.error('Error initializing Contentful client:', error);
      this.client = null;
    }
  },
  
  // Fetch articles by category
  async getArticles(category = null) {
    if (!this.client) {
      console.error('Contentful client not initialized');
      return [];
    }
    
    try {
      const query = {
        content_type: 'article',
        order: '-fields.publicationDate'
      };
      
      if (category) {
        query['fields.category'] = category;
      }
      
      const response = await this.client.getEntries(query);
      
      if (response.items && response.items.length > 0) {
        return response.items.map(item => this.formatArticle(item));
      } else {
        console.log(`No articles found${category ? ` for category: ${category}` : ''}`);
        return [];
      }
    } catch (error) {
      console.error('Error fetching articles from Contentful:', error);
      return [];
    }
  },
  
  // Fetch a single article by slug
  async getArticleBySlug(slug) {
    if (!this.client) {
      console.error('Contentful client not initialized');
      return null;
    }
    
    if (!slug) {
      console.error('No slug provided for article lookup');
      return null;
    }
    
    try {
      const response = await this.client.getEntries({
        content_type: 'article',
        'fields.slug': slug
      });
      
      if (response.items && response.items.length > 0) {
        return this.formatArticle(response.items[0]);
      } else {
        console.log(`No article found with slug: ${slug}`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching article with slug ${slug} from Contentful:`, error);
      return null;
    }
  },
  
  // Fetch market data
  async getMarketData() {
    if (!this.client) {
      console.error('Contentful client not initialized');
      return [];
    }
    
    try {
      const response = await this.client.getEntries({
        content_type: 'marketData'
      });
      
      if (response.items && response.items.length > 0) {
        return response.items.map(item => this.formatMarketData(item));
      } else {
        console.log('No market data found');
        return [];
      }
    } catch (error) {
      console.error('Error fetching market data from Contentful:', error);
      return [];
    }
  },
  
  // Fetch expert opinions
  async getExpertOpinions() {
    if (!this.client) {
      console.error('Contentful client not initialized');
      return [];
    }
    
    try {
      const response = await this.client.getEntries({
        content_type: 'expertOpinion'
      });
      
      if (response.items && response.items.length > 0) {
        return response.items.map(item => this.formatExpertOpinion(item));
      } else {
        console.log('No expert opinions found');
        return [];
      }
    } catch (error) {
      console.error('Error fetching expert opinions from Contentful:', error);
      return [];
    }
  },
  
  // Format article data from Contentful
  formatArticle(item) {
    if (!item || !item.fields) {
      console.error('Invalid article data from Contentful');
      return null;
    }
    
    try {
      const fields = item.fields;
      
      // Extract and format the summary content
      let summary = '';
      if (fields.summary && fields.summary.content) {
        summary = this.formatRichText(fields.summary);
      }
      
      // Extract and format the main content
      let content = '';
      if (fields.contentBody && fields.contentBody.content) {
        content = this.formatRichText(fields.contentBody);
      }
      
      // Get featured image URL
      let featuredImageUrl = '';
      if (fields.featuredImage && fields.featuredImage.fields && fields.featuredImage.fields.file) {
        featuredImageUrl = 'https:' + fields.featuredImage.fields.file.url;
      }
      
      return {
        id: item.sys.id,
        title: fields.title || 'Untitled Article',
        slug: fields.slug || '',
        category: fields.category || 'Uncategorized',
        author: fields.author || 'Fershman Financial Staff',
        date: fields.publicationDate ? new Date(fields.publicationDate) : new Date(),
        excerpt: summary,
        content: content,
        featuredImage: featuredImageUrl,
        premium: fields.premium || false
      };
    } catch (error) {
      console.error('Error formatting article data:', error);
      return null;
    }
  },
  
  // Format rich text content from Contentful
  formatRichText(richTextField) {
    if (!richTextField || !richTextField.content) {
      return '';
    }
    
    try {
      // Simple rich text to HTML conversion
      let html = '';
      
      const processNode = (node) => {
        if (node.nodeType === 'text') {
          let text = node.value;
          if (node.marks && node.marks.length > 0) {
            node.marks.forEach(mark => {
              if (mark.type === 'bold') {
                text = `<strong>${text}</strong>`;
              } else if (mark.type === 'italic') {
                text = `<em>${text}</em>`;
              } else if (mark.type === 'underline') {
                text = `<u>${text}</u>`;
              } else if (mark.type === 'code') {
                text = `<code>${text}</code>`;
              }
            });
          }
          return text;
        } else if (node.nodeType === 'paragraph') {
          return `<p>${node.content.map(processNode).join('')}</p>`;
        } else if (node.nodeType === 'heading-1') {
          return `<h1>${node.content.map(processNode).join('')}</h1>`;
        } else if (node.nodeType === 'heading-2') {
          return `<h2>${node.content.map(processNode).join('')}</h2>`;
        } else if (node.nodeType === 'heading-3') {
          return `<h3>${node.content.map(processNode).join('')}</h3>`;
        } else if (node.nodeType === 'heading-4') {
          return `<h4>${node.content.map(processNode).join('')}</h4>`;
        } else if (node.nodeType === 'heading-5') {
          return `<h5>${node.content.map(processNode).join('')}</h5>`;
        } else if (node.nodeType === 'heading-6') {
          return `<h6>${node.content.map(processNode).join('')}</h6>`;
        } else if (node.nodeType === 'unordered-list') {
          return `<ul>${node.content.map(processNode).join('')}</ul>`;
        } else if (node.nodeType === 'ordered-list') {
          return `<ol>${node.content.map(processNode).join('')}</ol>`;
        } else if (node.nodeType === 'list-item') {
          return `<li>${node.content.map(processNode).join('')}</li>`;
        } else if (node.nodeType === 'blockquote') {
          return `<blockquote>${node.content.map(processNode).join('')}</blockquote>`;
        } else if (node.nodeType === 'hr') {
          return '<hr>';
        } else if (node.nodeType === 'hyperlink') {
          return `<a href="${node.data.uri}" target="_blank">${node.content.map(processNode).join('')}</a>`;
        } else if (node.nodeType === 'embedded-asset-block') {
          if (node.data && node.data.target && node.data.target.fields) {
            const asset = node.data.target.fields;
            if (asset.file && asset.file.url) {
              return `<img src="https:${asset.file.url}" alt="${asset.title || 'Image'}" class="article-embedded-image">`;
            }
          }
          return '';
        } else if (node.content && Array.isArray(node.content)) {
          return node.content.map(processNode).join('');
        }
        return '';
      };
      
      richTextField.content.forEach(node => {
        html += processNode(node);
      });
      
      return html;
    } catch (error) {
      console.error('Error formatting rich text:', error);
      return '';
    }
  },
  
  // Format market data from Contentful
  formatMarketData(item) {
    if (!item || !item.fields) {
      return null;
    }
    
    try {
      const fields = item.fields;
      return {
        id: item.sys.id,
        symbol: fields.symbol || '',
        name: fields.name || '',
        value: fields.value || 0,
        change: fields.change || 0,
        changePercent: fields.changePercent || 0,
        direction: fields.direction || 'neutral'
      };
    } catch (error) {
      console.error('Error formatting market data:', error);
      return null;
    }
  },
  
  // Format expert opinion from Contentful
  formatExpertOpinion(item) {
    if (!item || !item.fields) {
      return null;
    }
    
    try {
      const fields = item.fields;
      
      // Get expert image URL
      let imageUrl = '';
      if (fields.image && fields.image.fields && fields.image.fields.file) {
        imageUrl = 'https:' + fields.image.fields.file.url;
      }
      
      return {
        id: item.sys.id,
        quote: fields.quote || '',
        author: fields.author || '',
        title: fields.title || '',
        image: imageUrl
      };
    } catch (error) {
      console.error('Error formatting expert opinion:', error);
      return null;
    }
  }
};

// Initialize Contentful client when the script loads
document.addEventListener('DOMContentLoaded', function() {
  contentfulClient.init();
  
  // Load content based on the current page
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
  
  // Load expert opinions
  await loadExpertOpinions();
}

// Load featured articles
async function loadFeaturedArticles(category = null) {
  const container = document.getElementById('featured-articles-container');
  if (!container) return;
  
  // Show loading state
  container.innerHTML = '<div class="contentful-loading"><p>Loading featured articles...</p></div>';
  
  const articles = await contentfulClient.getArticles(category);
  
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
  
  // Display featured articles (in a real implementation, we would filter for featured flag)
  articles.slice(0, 1).forEach(article => {
    container.innerHTML += `
      <article class="featured-article fade-in">
        <div class="article-image" style="background-image: url('${article.featuredImage}');"></div>
        <div class="article-content">
          <span class="article-category">${article.category}</span>
          <h3 class="article-title">${article.title}</h3>
          <div class="article-meta">
            <span class="article-author">By ${article.author}</span>
            <span class="article-date">${formatDate(article.date)}</span>
          </div>
          <div class="article-excerpt">${article.excerpt}</div>
          <a href="/articles/${article.slug}.html" class="article-link">Read Analysis</a>
        </div>
      </article>
    `;
  });
}

// Load articles grid
async function loadArticlesGrid(category = null) {
  const container = document.getElementById('articles-grid-container');
  if (!container) return;
  
  // Show loading state
  container.innerHTML = '<div class="contentful-loading"><p>Loading latest articles...</p></div>';
  
  const articles = await contentfulClient.getArticles(category);
  
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
        <div class="article-image" style="background-image: url('${article.featuredImage}');"></div>
        <div class="article-content">
          <span class="article-category">${article.category}</span>
          <h3 class="article-title">${article.title}</h3>
          <div class="article-meta">
            <span class="article-date">${formatDate(article.date)}</span>
          </div>
          <div class="article-excerpt">${article.excerpt}</div>
          <a href="/articles/${article.slug}.html" class="article-link">Read Analysis</a>
        </div>
      </article>
    `;
  });
}

// Load expert opinions
async function loadExpertOpinions() {
  const container = document.getElementById('expert-opinions-container');
  if (!container) return;
  
  // Show loading state
  container.innerHTML = '<div class="contentful-loading"><p>Loading expert opinions...</p></div>';
  
  const opinions = await contentfulClient.getExpertOpinions();
  
  // Clear loading message
  container.innerHTML = '';
  
  if (opinions.length === 0) {
    container.innerHTML = `
      <div class="no-content-message">
        <p>Expert opinions coming soon. Check back for updates.</p>
      </div>
    `;
    return;
  }
  
  // Display expert opinions
  opinions.forEach(opinion => {
    container.innerHTML += `
      <div class="opinion-card">
        <div class="opinion-image">
          <img src="${opinion.image}" alt="${opinion.author}">
        </div>
        <div class="opinion-content">
          <blockquote class="opinion-quote">${opinion.quote}</blockquote>
          <div class="opinion-author">
            <span class="author-name">${opinion.author}</span>
            <span class="author-title">${opinion.title}</span>
          </div>
        </div>
      </div>
    `;
  });
}

// Load a single article
async function loadArticle(slug) {
  const container = document.getElementById('article-container');
  if (!container) return;
  
  // Show loading state
  container.innerHTML = '<div class="contentful-loading"><p>Loading article...</p></div>';
  
  const article = await contentfulClient.getArticleBySlug(slug);
  
  // Clear loading message
  container.innerHTML = '';
  
  if (!article) {
    container.innerHTML = `
      <div class="no-content-message">
        <h2>Article Not Found</h2>
        <p>The article you're looking for is not available or may have been removed.</p>
        <a href="/" class="btn btn-primary">Return to Homepage</a>
      </div>
    `;
    return;
  }
  
  // Update page title
  document.title = `${article.title} | Fershman Financial`;
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', article.excerpt.replace(/<[^>]*>/g, '').substring(0, 160));
  }
  
  // Display article
  container.innerHTML = `
    <article class="article-full">
      <div class="article-header">
        <div class="article-category">${article.category}</div>
        <h1 class="article-title">${article.title}</h1>
        <div class="article-meta">
          <span class="article-author">By ${article.author}</span>
          <span class="article-date">${formatDate(article.date)}</span>
        </div>
      </div>
      <div class="article-featured-image" style="background-image: url('${article.featuredImage}');">
        <div class="image-overlay"></div>
      </div>
      <div class="article-content">
        <div class="article-body">
          <p class="article-lead">${article.excerpt}</p>
          ${article.content}
        </div>
      </div>
    </article>
  `;
  
  // Initialize article-specific features
  if (typeof initArticleFeatures === 'function') {
    initArticleFeatures();
  }
}

// Format date
function formatDate(date) {
  if (!date) return '';
  
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
}
  
  // Load content based on the current page
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
  await loadFeaturedArticles();
  
  // Load articles grid
  await loadArticlesGrid(category);
  
  // Load expert opinions
  await loadExpertOpinions();
}

// Load featured articles
async function loadFeaturedArticles() {
  const container = document.getElementById('featured-articles-container');
  if (!container) return;
  
  const articles = await contentfulClient.getArticles();
  
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
  
  // Display featured articles (in a real implementation, we would filter for featured flag)
  articles.slice(0, 1).forEach(article => {
    container.innerHTML += `
      <article class="featured-article fade-in">
        <div class="article-image" style="background-image: url('${article.featuredImage}');"></div>
        <div class="article-content">
          <span class="article-category">${article.category}</span>
          <h3 class="article-title">${article.title}</h3>
          <div class="article-meta">
            <span class="article-author">By ${article.author}</span>
            <span class="article-date">${formatDate(article.date)}</span>
          </div>
          <p class="article-excerpt">${article.excerpt}</p>
          <a href="/articles/${article.slug}.html" class="article-link">Read Analysis</a>
        </div>
      </article>
    `;
  });
}

// Load articles grid
async function loadArticlesGrid(category = null) {
  const container = document.getElementById('articles-grid-container');
  if (!container) return;
  
  const articles = await contentfulClient.getArticles(category);
  
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
  
  // Display articles
  articles.forEach(article => {
    container.innerHTML += `
      <article class="article-card fade-in">
        <div class="article-image" style="background-image: url('${article.featuredImage}');"></div>
        <div class="article-content">
          <span class="article-category">${article.category}</span>
          <h3 class="article-title">${article.title}</h3>
          <div class="article-meta">
            <span class="article-date">${formatDate(article.date)}</span>
          </div>
          <p class="article-excerpt">${article.excerpt}</p>
          <a href="/articles/${article.slug}.html" class="article-link">Read Analysis</a>
        </div>
      </article>
    `;
  });
}

// Load expert opinions
async function loadExpertOpinions() {
  const container = document.getElementById('expert-opinions-container');
  if (!container) return;
  
  const opinions = await contentfulClient.getExpertOpinions();
  
  // Clear loading message
  container.innerHTML = '';
  
  if (opinions.length === 0) {
    container.innerHTML = `
      <div class="no-content-message">
        <p>Expert opinions coming soon. Check back for updates.</p>
      </div>
    `;
    return;
  }
  
  // Display expert opinions
  opinions.forEach(opinion => {
    container.innerHTML += `
      <div class="opinion-card">
        <div class="opinion-image">
          <img src="${opinion.image}" alt="${opinion.author}">
        </div>
        <div class="opinion-content">
          <blockquote class="opinion-quote">${opinion.quote}</blockquote>
          <div class="opinion-author">
            <span class="author-name">${opinion.author}</span>
            <span class="author-title">${opinion.title}</span>
          </div>
        </div>
      </div>
    `;
  });
}

// Load a single article
async function loadArticle(slug) {
  const container = document.getElementById('article-container');
  if (!container) return;
  
  const article = await contentfulClient.getArticleBySlug(slug);
  
  // Clear loading message
  container.innerHTML = '';
  
  if (!article) {
    container.innerHTML = `
      <div class="no-content-message">
        <h2>Article Not Found</h2>
        <p>The article you're looking for is not available or may have been removed.</p>
        <a href="/" class="btn btn-primary">Return to Homepage</a>
      </div>
    `;
    return;
  }
  
  // Display article
  container.innerHTML = `
    <article class="article-full">
      <div class="article-header">
        <div class="article-category">${article.category}</div>
        <h1 class="article-title">${article.title}</h1>
        <div class="article-meta">
          <span class="article-author">By ${article.author}</span>
          <span class="article-date">${formatDate(article.date)}</span>
        </div>
      </div>
      <div class="article-featured-image">
        <img src="${article.featuredImage}" alt="${article.title}">
      </div>
      <div class="article-content">
        ${article.content}
      </div>
    </article>
  `;
}

// Format date
function formatDate(date) {
  if (!date) return '';
  
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
}
