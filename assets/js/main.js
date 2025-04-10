import {
  getArticles,
  getArticleBySlug,
  getMarketData,
  getExpertOpinions,
} from './contentful.js';

// Load page content after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;

  if (path.includes('/articles/')) {
    const slug = path.split('/').pop().replace('.html', '');
    renderSingleArticle(slug);
  } else {
    const category = detectCategoryFromPath(path);
    renderFeaturedArticles();
    renderArticlesGrid(category);
    renderExpertOpinions();
  }
});

function detectCategoryFromPath(path) {
  if (path.includes('markets')) return 'Markets';
  if (path.includes('analysis')) return 'Analysis';
  if (path.includes('policy')) return 'Policy & Regulation';
  if (path.includes('opinion')) return 'Opinion';
  return null;
}

async function renderFeaturedArticles() {
  const container = document.getElementById('featured-articles-container');
  if (!container) return;

  const articles = await getArticles();
  container.innerHTML = '';

  if (articles.length === 0) {
    container.innerHTML = `<p>No featured articles available yet.</p>`;
    return;
  }

  const featured = articles[0];
  container.innerHTML = `
    <article class="featured-article">
      <div class="article-image" style="background-image: url('${featured.featuredImage}')"></div>
      <div class="article-content">
        <span class="article-category">${featured.category}</span>
        <h3 class="article-title">${featured.title}</h3>
        <div class="article-meta">
          <span class="article-author">By ${featured.author}</span>
          <span class="article-date">${formatDate(featured.date)}</span>
        </div>
        <p class="article-excerpt">${featured.excerpt}</p>
        <a href="/articles/${featured.slug}.html" class="article-link">Read Analysis</a>
      </div>
    </article>
  `;
}

async function renderArticlesGrid(category) {
  const container = document.getElementById('articles-grid-container');
  if (!container) return;

  const articles = await getArticles(category);
  container.innerHTML = '';

  if (articles.length === 0) {
    container.innerHTML = `<p>No articles available yet in this category.</p>`;
    return;
  }

  articles.forEach(article => {
    container.innerHTML += `
      <article class="article-card">
        <div class="article-image" style="background-image: url('${article.featuredImage}')"></div>
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

async function renderExpertOpinions() {
  const container = document.getElementById('expert-opinions-container');
  if (!container) return;

  const opinions = await getExpertOpinions();
  container.innerHTML = '';

  if (opinions.length === 0) {
    container.innerHTML = `<p>Expert opinions coming soon.</p>`;
    return;
  }

  opinions.forEach(opinion => {
    container.innerHTML += `
      <div class="opinion-card">
        <div class="opinion-image">
          <img src="${opinion.image}" alt="${opinion.author}" />
        </div>
        <blockquote class="opinion-quote">${opinion.quote}</blockquote>
        <div class="opinion-author">
          <span class="author-name">${opinion.author}</span>
          <span class="author-title">${opinion.title}</span>
        </div>
      </div>
    `;
  });
}

async function renderSingleArticle(slug) {
  const container = document.getElementById('article-container');
  if (!container) return;

  const article = await getArticleBySlug(slug);
  container.innerHTML = '';

  if (!article) {
    container.innerHTML = `
      <div class="no-content-message">
        <h2>Article Not Found</h2>
        <p>The article you’re looking for doesn’t exist or has been removed.</p>
        <a href="/" class="btn btn-primary">Return to Homepage</a>
      </div>
    `;
    return;
  }

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
        <img src="${article.featuredImage}" alt="${article.title}" />
      </div>
      <div class="article-content">${article.content}</div>
    </article>
  `;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
}
