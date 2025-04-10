/**
 * contentful.js
 * Fershman Financial - Contentful Integration
 * 
 * This file handles fetching and formatting content from Contentful.
 * It uses the Contentful JavaScript SDK to query articles, market data,
 * and expert opinions.
 *
 * Environment variables:
 *   - CONTENTFUL_SPACE_ID
 *   - CONTENTFUL_ACCESS_TOKEN
 *
 * Ensure these are set in your deployment (e.g., via Netlify environment variables).
 * 
 * 【contentful.js†source】
 */

const contentful = require('contentful');

// Create Contentful client using environment variables, with fallbacks.
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID || 'your_space_id_placeholder',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || 'your_access_token_placeholder',
});

// Helper function to format an article entry from Contentful.
function formatArticle(item) {
  const fields = item.fields;
  return {
    id: item.sys.id,
    title: fields.title,
    slug: fields.slug,
    category: fields.category,
    author: fields.author,
    date: fields.publicationDate,
    excerpt: fields.excerpt,
    content: fields.content,
    featuredImage: fields.featuredImage ? fields.featuredImage.fields.file.url : '',
  };
}

// Helper function to format market data entries.
function formatMarketData(item) {
  const fields = item.fields;
  return {
    id: item.sys.id,
    symbol: fields.symbol,
    name: fields.name,
    value: fields.value,
    change: fields.change,
    changePercent: fields.changePercent,
    direction: fields.direction,
  };
}

// Helper function to format expert opinion entries.
function formatExpertOpinion(item) {
  const fields = item.fields;
  return {
    id: item.sys.id,
    quote: fields.quote,
    author: fields.author,
    title: fields.title,
    image: fields.image ? fields.image.fields.file.url : '',
  };
}

/**
 * Fetch articles from Contentful.
 * Optionally filter by category.
 */
async function getArticles(category = null) {
  const query = {
    content_type: 'article',
    order: '-fields.publicationDate'
  };

  if (category) {
    query['fields.category'] = category;
  }

  try {
    const response = await client.getEntries(query);
    return response.items.map(formatArticle);
  } catch (error) {
    console.error('Error fetching articles from Contentful:', error);
    return [];
  }
}

/**
 * Fetch a single article by its slug.
 */
async function getArticleBySlug(slug) {
  try {
    const response = await client.getEntries({
      content_type: 'article',
      'fields.slug': slug,
      limit: 1
    });
    if (response.items.length > 0) {
      return formatArticle(response.items[0]);
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    return null;
  }
}

/**
 * Fetch market data from Contentful.
 */
async function getMarketData() {
  try {
    const response = await client.getEntries({
      content_type: 'marketData'
    });
    return response.items.map(formatMarketData);
  } catch (error) {
    console.error('Error fetching market data from Contentful:', error);
    return [];
  }
}

/**
 * Fetch expert opinions from Contentful.
 */
async function getExpertOpinions() {
  try {
    const response = await client.getEntries({
      content_type: 'expertOpinion'
    });
    return response.items.map(formatExpertOpinion);
  } catch (error) {
    console.error('Error fetching expert opinions from Contentful:', error);
    return [];
  }
}

// Export the functions for use in other modules.
module.exports = {
  getArticles,
  getArticleBySlug,
  getMarketData,
  getExpertOpinions,
};
