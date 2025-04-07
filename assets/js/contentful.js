// Contentful integration
const contentful = require('contentful');

// Initialize the Contentful client
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Fetch articles
async function getArticles(category = null) {
  let query = {
    content_type: 'article',
    order: '-fields.publicationDate',
  };
  
  if (category) {
    query['fields.category'] = category;
  }
  
  try {
    const response = await client.getEntries(query);
    return response.items;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

// Fetch market data
async function getMarketData() {
  try {
    const response = await client.getEntries({
      content_type: 'marketData',
    });
    return response.items;
  } catch (error) {
    console.error('Error fetching market data:', error);
    return [];
  }
}

// Fetch expert opinions
async function getExpertOpinions() {
  try {
    const response = await client.getEntries({
      content_type: 'expertOpinion',
    });
    return response.items;
  } catch (error) {
    console.error('Error fetching expert opinions:', error);
    return [];
  }
}

// Fetch featured analysis
async function getFeaturedAnalysis() {
  try {
    const response = await client.getEntries({
      content_type: 'featuredAnalysis',
    });
    return response.items;
  } catch (error) {
    console.error('Error fetching featured analysis:', error);
    return [];
  }
}

// Export functions
module.exports = {
  getArticles,
  getMarketData,
  getExpertOpinions,
  getFeaturedAnalysis,
};
