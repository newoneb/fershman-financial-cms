// contentful.js — Fershman Financial

// Dynamically initialize Contentful client
const contentfulClient = contentful.createClient({
  space: window.CONTENTFUL_SPACE_ID || 'jkx7dn6qj8zy',
  accessToken: window.CONTENTFUL_ACCESS_TOKEN || 'Bxoz6UQiiLQ0xdpzzvfpVSEScWh-u0t9OZKklXmisbM',
});

// Format article
function formatArticle(item) {
  const f = item.fields;
  return {
    id: item.sys.id,
    title: f.title,
    slug: f.slug,
    category: f.category,
    author: f.author,
    date: f.publicationDate,
    excerpt: f.summary?.content?.[0]?.content?.[0]?.value || '',
    content: f.contentBody?.content?.map(p => `<p>${p.content?.[0]?.value}</p>`).join('') || '',
    featuredImage: f.featuredImage?.fields?.file?.url || '',
  };
}

// Format market data
function formatMarketData(item) {
  const f = item.fields;
  return {
    symbol: f.symbol,
    value: f.value,
    changePercent: f.changePercentage,
    direction: f.direction,
  };
}

// Format expert opinion
function formatExpertOpinion(item) {
  const f = item.fields;
  return {
    quote: f.quoteText?.content?.[0]?.content?.[0]?.value || '',
    author: f.authorName,
    title: f.authorTitle,
    image: f.authorImage?.fields?.file?.url || '',
  };
}

// Fetch articles
async function getArticles(category = null) {
  const query = {
    content_type: 'article',
    order: '-fields.publicationDate',
  };
  if (category) {
    query['fields.category'] = category;
  }

  try {
    const res = await contentfulClient.getEntries(query);
    return res.items.map(formatArticle);
  } catch (e) {
    console.error('Error fetching articles:', e);
    return [];
  }
}

// Fetch article by slug
async function getArticleBySlug(slug) {
  try {
    const res = await contentfulClient.getEntries({
      content_type: 'article',
      'fields.slug': slug,
      limit: 1,
    });
    return res.items.length ? formatArticle(res.items[0]) : null;
  } catch (e) {
    console.error('Error fetching article by slug:', e);
    return null;
  }
}

// Fetch market data
async function getMarketData() {
  try {
    const res = await contentfulClient.getEntries({
      content_type: 'marketData',
    });
    return res.items.map(formatMarketData);
  } catch (e) {
    console.error('Error fetching market data:', e);
    return [];
  }
}

// Fetch expert opinions
async function getExpertOpinions() {
  try {
    const res = await contentfulClient.getEntries({
      content_type: 'expertOpinion',
    });
    return res.items.map(formatExpertOpinion);
  } catch (e) {
    console.error('Error fetching expert opinions:', e);
    return [];
  }
}

// Make available globally
window.FFContentful = {
  getArticles,
  getArticleBySlug,
  getMarketData,
  getExpertOpinions,
};
