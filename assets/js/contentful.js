// Contentful integration for Fershman Financial
// This file handles fetching and displaying content from Contentful CMS

// Initialize Contentful client
const contentfulClient = {
  // Space and access token will be provided by environment variables in production
  spaceId: process.env.CONTENTFUL_SPACE_ID || 'your_space_id',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || 'your_access_token',
  
  // Initialize the client
  init() {
    // In a real implementation, this would use the Contentful SDK
    console.log('Contentful client initialized with:');
    console.log(`Space ID: ${this.spaceId}`);
    console.log(`Access Token: ${this.accessToken.substring(0, 5)}...`);
    
    // Check if we're in development mode with placeholder content
    this.usePlaceholders = !process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN;
    
    if (this.usePlaceholders) {
      console.log('Using placeholder content (Contentful credentials not provided)');
    }
  },
  
  // Fetch articles by category
  async getArticles(category = null) {
    if (this.usePlaceholders) {
      // Instead of returning placeholder articles, return empty array with message
      return [];
    }
    
    try {
      // In production, this would use the Contentful SDK to fetch real content
      // const query = {
      //   content_type: 'article',
      //   order: '-fields.publicationDate'
      // };
      // 
      // if (category) {
      //   query['fields.category'] = category;
      // }
      // 
      // const response = await contentful.createClient({
      //   space: this.spaceId,
      //   accessToken: this.accessToken
      // }).getEntries(query);
      // 
      // return response.items.map(item => this.formatArticle(item));
      
      // For now, return empty array
      return [];
    } catch (error) {
      console.error('Error fetching articles from Contentful:', error);
      return [];
    }
  },
  
  // Fetch a single article by slug
  async getArticleBySlug(slug) {
    if (this.usePlaceholders) {
      return null;
    }
    
    try {
      // In production, this would use the Contentful SDK
      // const response = await contentful.createClient({
      //   space: this.spaceId,
      //   accessToken: this.accessToken
      // }).getEntries({
      //   content_type: 'article',
      //   'fields.slug': slug
      // });
      // 
      // if (response.items.length > 0) {
      //   return this.formatArticle(response.items[0]);
      // }
      
      // For now, return null to indicate no article found
      return null;
    } catch (error) {
      console.error('Error fetching article from Contentful:', error);
      return null;
    }
  },
  
  // Fetch market data
  async getMarketData() {
    if (this.usePlaceholders) {
      return [];
    }
    
    try {
      // In production, this would use the Contentful SDK
      // const response = await contentful.createClient({
      //   space: this.spaceId,
      //   accessToken: this.accessToken
      // }).getEntries({
      //   content_type: 'marketData'
      // });
      // 
      // return response.items.map(item => this.formatMarketData(item));
      
      // For now, return empty array
      return [];
    } catch (error) {
      console.error('Error fetching market data from Contentful:', error);
      return [];
    }
  },
  
  // Fetch expert opinions
  async getExpertOpinions() {
    if (this.usePlaceholders) {
      return [];
    }
    
    try {
      // In production, this would use the Contentful SDK
      // const response = await contentful.createClient({
      //   space: this.spaceId,
      //   accessToken: this.accessToken
      // }).getEntries({
      //   content_type: 'expertOpinion'
      // });
      // 
      // return response.items.map(item => this.formatExpertOpinion(item));
      
      // For now, return empty array
      return [];
    } catch (error) {
      console.error('Error fetching expert opinions from Contentful:', error);
      return [];
    }
  },
  
  // Format article data from Contentful
  formatArticle(item) {
    // In production, this would transform Contentful response to our format
    // const fields = item.fields;
    // return {
    //   id: item.sys.id,
    //   title: fields.title,
    //   slug: fields.slug,
    //   category: fields.category,
    //   author: fields.author,
    //   date: new Date(fields.publicationDate),
    //   excerpt: fields.excerpt,
    //   content: fields.content,
    //   featuredImage: fields.featuredImage?.fields?.file?.url,
    //   premium: fields.premium || false
    // };
    
    // For now, return null
    return null;
  },
  
  // Format market data from Contentful
  formatMarketData(item) {
    // In production, this would transform Contentful response to our format
    // const fields = item.fields;
    // return {
    //   id: item.sys.id,
    //   symbol: fields.symbol,
    //   name: fields.name,
    //   value: fields.value,
    //   change: fields.change,
    //   changePercent: fields.changePercent,
    //   direction: fields.direction
    // };
    
    // For now, return null
    return null;
  },
  
  // Format expert opinion from Contentful
  formatExpertOpinion(item) {
    // In production, this would transform Contentful response to our format
    // const fields = item.fields;
    // return {
    //   id: item.sys.id,
    //   quote: fields.quote,
    //   author: fields.author,
    //   title: fields.title,
    //   image: fields.image?.fields?.file?.url
    // };
    
    // For now, return null
    return null;
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
