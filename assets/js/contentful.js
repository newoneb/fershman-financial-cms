/**
 * Fershman Financial - Contentful Integration
 * Connects the website to Contentful CMS for dynamic content
 */

// Contentful client configuration
const contentfulClient = {
    // Initialize the client with environment variables
    init: function() {
        // Check if Contentful SDK is loaded
        if (typeof contentful === 'undefined') {
            console.error('Contentful SDK not loaded');
            return false;
        }
        
        try {
            // Create client using environment variables
            this.client = contentful.createClient({
                space: process.env.CONTENTFUL_SPACE_ID || 'YOUR_SPACE_ID',
                accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || 'YOUR_ACCESS_TOKEN',
            });
            return true;
        } catch (error) {
            console.error('Error initializing Contentful client:', error);
            return false;
        }
    },
    
    // Fetch entries with specified content type and options
    getEntries: async function(contentType, options = {}) {
        if (!this.client) {
            if (!this.init()) {
                return this.getFallbackData(contentType);
            }
        }
        
        try {
            const query = {
                content_type: contentType,
                ...options
            };
            
            const response = await this.client.getEntries(query);
            return response.items;
        } catch (error) {
            console.error(`Error fetching ${contentType} from Contentful:`, error);
            return this.getFallbackData(contentType);
        }
    },
    
    // Get a single entry by ID
    getEntry: async function(entryId) {
        if (!this.client) {
            if (!this.init()) {
                return null;
            }
        }
        
        try {
            return await this.client.getEntry(entryId);
        } catch (error) {
            console.error(`Error fetching entry ${entryId} from Contentful:`, error);
            return null;
        }
    },
    
    // Get fallback data when Contentful is not available
    getFallbackData: function(contentType) {
        console.log(`Using fallback data for ${contentType}`);
        
        const fallbackData = {
            'article': [
                {
                    fields: {
                        title: 'Global Markets Rally as Central Banks Signal Rate Cuts',
                        slug: 'global-markets-rally',
                        category: 'Markets',
                        publicationDate: '2025-04-01T09:00:00Z',
                        author: {
                            fields: {
                                name: 'Alexandra Chen',
                                title: 'Senior Market Analyst',
                                image: {
                                    fields: {
                                        file: {
                                            url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
                                        }
                                    }
                                }
                            }
                        },
                        featuredImage: {
                            fields: {
                                file: {
                                    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'
                                }
                            }
                        },
                        excerpt: 'Global markets surged today as major central banks signaled a coordinated approach to interest rate cuts, boosting investor confidence across all sectors.',
                        content: {
                            content: [
                                {
                                    nodeType: 'paragraph',
                                    content: [
                                        {
                                            nodeType: 'text',
                                            value: 'Global markets experienced a significant rally today as major central banks around the world signaled a coordinated approach to interest rate cuts in the coming months. The move, which aims to stimulate economic growth amid concerns of a slowdown, has boosted investor confidence across all sectors.',
                                            marks: []
                                        }
                                    ]
                                }
                            ]
                        },
                        isPremium: false
                    }
                },
                {
                    fields: {
                        title: 'Tech Sector Faces Valuation Reset Amid Rising Rates',
                        slug: 'tech-sector-valuation-reset',
                        category: 'Analysis',
                        publicationDate: '2025-03-28T10:30:00Z',
                        author: {
                            fields: {
                                name: 'Marcus Johnson',
                                title: 'Technology Sector Analyst',
                                image: {
                                    fields: {
                                        file: {
                                            url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
                                        }
                                    }
                                }
                            }
                        },
                        featuredImage: {
                            fields: {
                                file: {
                                    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71'
                                }
                            }
                        },
                        excerpt: 'Technology stocks are experiencing a significant valuation reset as investors reassess growth prospects in a higher interest rate environment.',
                        content: {
                            content: [
                                {
                                    nodeType: 'paragraph',
                                    content: [
                                        {
                                            nodeType: 'text',
                                            value: 'Technology stocks are experiencing a significant valuation reset as investors reassess growth prospects in a higher interest rate environment. The sector, which has been the primary driver of market gains over the past decade, is now facing headwinds as the cost of capital increases and profit expectations are adjusted downward.',
                                            marks: []
                                        }
                                    ]
                                }
                            ]
                        },
                        isPremium: true
                    }
                },
                {
                    fields: {
                        title: 'New Regulatory Framework Reshapes Financial Services Landscape',
                        slug: 'regulatory-framework-financial-services',
                        category: 'Policy & Regulation',
                        publicationDate: '2025-03-25T08:45:00Z',
                        author: {
                            fields: {
                                name: 'Sophia Williams',
                                title: 'Regulatory Affairs Correspondent',
                                image: {
                                    fields: {
                                        file: {
                                            url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f'
                                        }
                                    }
                                }
                            }
                        },
                        featuredImage: {
                            fields: {
                                file: {
                                    url: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e'
                                }
                            }
                        },
                        excerpt: 'A comprehensive new regulatory framework is set to transform the financial services industry, with significant implications for banks, insurers, and fintech companies.',
                        content: {
                            content: [
                                {
                                    nodeType: 'paragraph',
                                    content: [
                                        {
                                            nodeType: 'text',
                                            value: 'A comprehensive new regulatory framework is set to transform the financial services industry, with significant implications for banks, insurers, and fintech companies. The regulations, which will be phased in over the next 18 months, aim to enhance consumer protection while promoting innovation and competition in the sector.',
                                            marks: []
                                        }
                                    ]
                                }
                            ]
                        },
                        isPremium: false
                    }
                }
            ],
            'marketData': [
                {
                    fields: {
                        symbol: 'S&P 500',
                        value: '5,328.42',
                        changePercentage: 1.25,
                        direction: 'up'
                    }
                },
                {
                    fields: {
                        symbol: 'NASDAQ',
                        value: '16,742.31',
                        changePercentage: 1.73,
                        direction: 'up'
                    }
                },
                {
                    fields: {
                        symbol: 'DOW JONES',
                        value: '38,563.12',
                        changePercentage: 0.89,
                        direction: 'up'
                    }
                },
                {
                    fields: {
                        symbol: 'FTSE 100',
                        value: '8,124.76',
                        changePercentage: 0.65,
                        direction: 'up'
                    }
                },
                {
                    fields: {
                        symbol: 'DAX',
                        value: '18,356.92',
                        changePercentage: 1.12,
                        direction: 'up'
                    }
                },
                {
                    fields: {
                        symbol: 'NIKKEI 225',
                        value: '39,872.45',
                        changePercentage: -0.32,
                        direction: 'down'
                    }
                },
                {
                    fields: {
                        symbol: 'CRUDE OIL',
                        value: '82.47',
                        changePercentage: 2.15,
                        direction: 'up'
                    }
                },
                {
                    fields: {
                        symbol: 'GOLD',
                        value: '2,342.80',
                        changePercentage: 0.45,
                        direction: 'up'
                    }
                },
                {
                    fields: {
                        symbol: 'BITCOIN',
                        value: '68,523.17',
                        changePercentage: -1.87,
                        direction: 'down'
                    }
                },
                {
                    fields: {
                        symbol: 'EUR/USD',
                        value: '1.0842',
                        changePercentage: -0.23,
                        direction: 'down'
                    }
                }
            ],
            'expertOpinion': [
                {
                    fields: {
                        quote: 'The current market dynamics suggest we're entering a new phase of the economic cycle, where value may outperform growth for the first time in over a decade.',
                        authorName: 'Dr. Eleanor Hughes',
                        authorTitle: 'Chief Economist, Global Investments',
                        authorImage: {
                            fields: {
                                file: {
                                    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2'
                                }
                            }
                        }
                    }
                },
                {
                    fields: {
                        quote: 'Regulatory changes in the financial sector will create both challenges and opportunities. Institutions that can adapt quickly will find themselves with significant competitive advantages.',
                        authorName: 'Robert Chen',
                        authorTitle: 'Former Federal Reserve Governor',
                        authorImage: {
                            fields: {
                                file: {
                                    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
                                }
                            }
                        }
                    }
                },
                {
                    fields: {
                        quote: 'The integration of AI into financial services is not just a technological shift but a fundamental reimagining of how value is created and delivered in the industry.',
                        authorName: 'Dr. Amara Singh',
                        authorTitle: 'Director of FinTech Research',
                        authorImage: {
                            fields: {
                                file: {
                                    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956'
                                }
                            }
                        }
                    }
                }
            ],
            'featuredAnalysis': [
                {
                    fields: {
                        title: 'The Shifting Landscape of Global Trade',
                        category: 'Analysis',
                        summary: 'How geopolitical tensions and supply chain restructuring are reshaping international commerce',
                        linkToArticle: 'global-trade-landscape',
                        isPremium: true
                    }
                },
                {
                    fields: {
                        title: 'Central Bank Digital Currencies: The Future of Money',
                        category: 'Policy & Regulation',
                        summary: 'Examining the implications of CBDCs for monetary policy, financial stability, and consumer privacy',
                        linkToArticle: 'central-bank-digital-currencies',
                        isPremium: false
                    }
                }
            ]
        };
        
        return fallbackData[contentType] || [];
    }
};

// Content renderer for displaying Contentful data on the website
const contentRenderer = {
    // Render featured articles on the homepage
    renderFeaturedArticles: async function() {
        const featuredGrid = document.querySelector('.featured-grid');
        if (!featuredGrid) return;
        
        try {
            const articles = await contentfulClient.getEntries('article', {
                order: '-fields.publicationDate',
                limit: 1
            });
            
            if (articles && articles.length > 0) {
                const article = articles[0];
                const fields = article.fields;
                
                const featuredHtml = `
                    <div class="featured-article">
                        <div class="article-image" style="background-image: url('${fields.featuredImage?.fields?.file?.url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'}')"></div>
                        <div class="article-content">
                            <div class="article-category">${fields.category || 'Category'}</div>
                            <h3 class="article-title">${fields.title || 'Article Title'}</h3>
                            <p class="article-excerpt">${fields.excerpt || 'Article excerpt...'}</p>
                            <div class="article-meta">
                                <span class="article-author">By ${fields.author?.fields?.name || 'Author'}</span>
                                <span class="article-date">${this.formatDate(fields.publicationDate) || 'Date'}</span>
                            </div>
                            <a href="/articles/${fields.slug || '#'}.html" class="article-link">Read More</a>
                        </div>
                    </div>
                `;
                
                featuredGrid.innerHTML = featuredHtml;
            }
        } catch (error) {
            console.error('Error rendering featured articles:', error);
        }
    },
    
    // Render articles by category
    renderArticlesByCategory: async function(category, container) {
        if (!container) return;
        
        try {
            let query = {};
            if (category && category !== 'all') {
                query = {
                    'fields.category': category,
                    order: '-fields.publicationDate',
                    limit: 6
                };
            } else {
                query = {
                    order: '-fields.publicationDate',
                    limit: 6
                };
            }
            
            const articles = await contentfulClient.getEntries('article', query);
            
            if (articles && articles.length > 0) {
                let articlesHtml = '';
                
                articles.forEach(article => {
                    const fields = article.fields;
                    
                    articlesHtml += `
                        <div class="article-card">
                            <div class="article-image" style="background-image: url('${fields.featuredImage?.fields?.file?.url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'}')"></div>
                            <div class="article-content">
                                <div class="article-category">${fields.category || 'Category'}</div>
                                <h3 class="article-title">${fields.title || 'Article Title'}</h3>
                                <p class="article-excerpt">${fields.excerpt || 'Article excerpt...'}</p>
                                <div class="article-meta">
                                    <span class="article-date">${this.formatDate(fields.publicationDate) || 'Date'}</span>
                                </div>
                                <a href="/articles/${fields.slug || '#'}.html" class="article-link">Read More</a>
                            </div>
                        </div>
                    `;
                });
                
                container.innerHTML = articlesHtml;
            }
        } catch (error) {
            console.error(`Error rendering articles for category ${category}:`, error);
        }
    },
    
    // Render market data in the ticker
    renderMarketData: async function() {
        const ticker = document.querySelector('.ticker');
        if (!ticker) return;
        
        try {
            const marketData = await contentfulClient.getEntries('marketData');
            
            if (marketData && marketData.length > 0) {
                let tickerHtml = '';
                
                marketData.forEach(item => {
                    const fields = item.fields;
                    
                    tickerHtml += `
                        <div class="ticker-item">
                            <span class="ticker-symbol">${fields.symbol || 'SYMBOL'}</span>
                            <span class="ticker-value">${fields.value || '0.00'}</span>
                            <span class="ticker-change ${fields.direction || 'up'}">${fields.direction === 'up' ? '+' : ''}${fields.changePercentage || '0.00'}%</span>
                        </div>
                    `;
                });
                
                ticker.innerHTML = tickerHtml;
                
                // Clone ticker items for continuous loop
                const tickerItems = ticker.querySelectorAll('.ticker-item');
                tickerItems.forEach(item => {
                    const clone = item.cloneNode(true);
                    ticker.appendChild(clone);
                });
            }
        } catch (error) {
            console.error('Error rendering market data:', error);
        }
    },
    
    // Render expert opinions
    renderExpertOpinions: async function() {
        const opinionContainer = document.querySelector('.opinion-container');
        if (!opinionContainer) return;
        
        try {
            const opinions = await contentfulClient.getEntries('expertOpinion');
            
            if (opinions && opinions.length > 0) {
                let opinionsHtml = '';
                
                // Featured opinion (first one)
                if (opinions.length > 0) {
                    const featured = opinions[0].fields;
                    
                    opinionsHtml += `
                        <div class="opinion-quote featured-quote">
                            <div class="quote-mark">"</div>
                            <p class="quote-text">${featured.quote || 'Quote text'}</p>
                            <div class="quote-author">
                                <div class="author-image" style="background-image: url('${featured.authorImage?.fields?.file?.url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2'}')"></div>
                                <div class="author-details">
                                    <span class="author-name">${featured.authorName || 'Author Name'}</span>
                                    <span class="author-title">${featured.authorTitle || 'Author Title'}</span>
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                // Regular opinions (rest)
                for (let i = 1; i < opinions.length; i++) {
                    const opinion = opinions[i].fields;
                    
                    opinionsHtml += `
                        <div class="opinion-quote">
                            <div class="quote-mark">"</div>
                            <p class="quote-text">${opinion.quote || 'Quote text'}</p>
                            <div class="quote-author">
                                <div class="author-image" style="background-image: url('${opinion.authorImage?.fields?.file?.url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2'}')"></div>
                                <div class="author-details">
                                    <span class="author-name">${opinion.authorName || 'Author Name'}</span>
                                    <span class="author-title">${opinion.authorTitle || 'Author Title'}</span>
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                opinionContainer.innerHTML = opinionsHtml;
            }
        } catch (error) {
            console.error('Error rendering expert opinions:', error);
        }
    },
    
    // Render article content on article page
    renderArticleContent: async function(articleId) {
        const articleBody = document.querySelector('.article-body');
        const articleTitle = document.querySelector('.article-title');
        const articleCategory = document.querySelector('.article-category');
        const articleDate = document.querySelector('.article-date');
        const articleAuthorName = document.querySelector('.author-name');
        const articleAuthorTitle = document.querySelector('.author-title');
        const articleAuthorImage = document.querySelector('.author-image');
        const articleFeaturedImage = document.querySelector('.article-featured-image');
        
        if (!articleBody || !articleId) return;
        
        try {
            const article = await contentfulClient.getEntry(articleId);
            
            if (article && article.fields) {
                const fields = article.fields;
                
                // Update article metadata
                if (articleTitle) articleTitle.textContent = fields.title || 'Article Title';
                if (articleCategory) articleCategory.textContent = fields.category || 'Category';
                if (articleDate) articleDate.textContent = this.formatDate(fields.publicationDate) || 'Date';
                if (articleAuthorName) articleAuthorName.textContent = fields.author?.fields?.name || 'Author Name';
                if (articleAuthorTitle) articleAuthorTitle.textContent = fields.author?.fields?.title || 'Author Title';
                if (articleAuthorImage) {
                    articleAuthorImage.style.backgroundImage = `url('${fields.author?.fields?.image?.fields?.file?.url || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'}')`;
                }
                if (articleFeaturedImage) {
                    articleFeaturedImage.style.backgroundImage = `url('${fields.featuredImage?.fields?.file?.url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'}')`;
                }
                
                // Render article content
                if (fields.content) {
                    articleBody.innerHTML = this.renderRichText(fields.content);
                }
                
                // Check if premium content
                if (fields.isPremium) {
                    this.handlePremiumContent(articleBody);
                }
            }
        } catch (error) {
            console.error('Error rendering article content:', error);
        }
    },
    
    // Render related articles
    renderRelatedArticles: async function(articleId, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        try {
            const articles = await contentfulClient.getEntries('article', {
                order: '-fields.publicationDate',
                limit: 3
            });
            
            if (articles && articles.length > 0) {
                let relatedHtml = '';
                
                articles.forEach(article => {
                    const fields = article.fields;
                    
                    relatedHtml += `
                        <div class="sidebar-article">
                            <a href="/articles/${fields.slug || '#'}.html">
                                <div class="sidebar-article-image" style="background-image: url('${fields.featuredImage?.fields?.file?.url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'}')"></div>
                                <div class="sidebar-article-content">
                                    <h4>${fields.title || 'Article Title'}</h4>
                                    <span class="sidebar-article-date">${this.formatDate(fields.publicationDate) || 'Date'}</span>
                                </div>
                            </a>
                        </div>
                    `;
                });
                
                container.innerHTML = relatedHtml;
            }
        } catch (error) {
            console.error('Error rendering related articles:', error);
        }
    },
    
    // Handle premium content display
    handlePremiumContent: function(container) {
        // Check if user has premium access
        const hasPremiumAccess = localStorage.getItem('premiumAccess') === 'true';
        
        if (!hasPremiumAccess) {
            // Create premium overlay
            const overlay = document.createElement('div');
            overlay.className = 'premium-overlay';
            overlay.innerHTML = `
                <span class="premium-badge">Premium</span>
                <h3 class="premium-message">This article is exclusive to premium subscribers</h3>
                <a href="#" class="premium-button">Upgrade to Premium</a>
            `;
            
            // Add blur effect to content
            container.classList.add('premium-content');
            container.appendChild(overlay);
            
            // Add event listener to premium button
            const premiumButton = overlay.querySelector('.premium-button');
            premiumButton.addEventListener('click', function(e) {
                e.preventDefault();
                // Redirect to subscription page or show subscription modal
                console.log('Upgrade to premium clicked');
            });
        }
    },
    
    // Format date for display
    formatDate: function(dateString) {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        
        return date.toLocaleDateString('en-US', options);
    },
    
    // Render Contentful rich text
    renderRichText: function(richText) {
        if (!richText || !richText.content) return '';
        
        let html = '';
        
        richText.content.forEach(node => {
            switch (node.nodeType) {
                case 'paragraph':
                    html += `<p>${this.renderRichTextContent(node.content)}</p>`;
                    break;
                case 'heading-1':
                    html += `<h1>${this.renderRichTextContent(node.content)}</h1>`;
                    break;
                case 'heading-2':
                    html += `<h2>${this.renderRichTextContent(node.content)}</h2>`;
                    break;
                case 'heading-3':
                    html += `<h3>${this.renderRichTextContent(node.content)}</h3>`;
                    break;
                case 'heading-4':
                    html += `<h4>${this.renderRichTextContent(node.content)}</h4>`;
                    break;
                case 'heading-5':
                    html += `<h5>${this.renderRichTextContent(node.content)}</h5>`;
                    break;
                case 'heading-6':
                    html += `<h6>${this.renderRichTextContent(node.content)}</h6>`;
                    break;
                case 'unordered-list':
                    html += `<ul>${this.renderRichTextList(node.content)}</ul>`;
                    break;
                case 'ordered-list':
                    html += `<ol>${this.renderRichTextList(node.content)}</ol>`;
                    break;
                case 'blockquote':
                    html += `<blockquote>${this.renderRichTextContent(node.content)}</blockquote>`;
                    break;
                case 'hr':
                    html += '<hr>';
                    break;
                case 'embedded-asset-block':
                    if (node.data && node.data.target && node.data.target.fields) {
                        const asset = node.data.target.fields;
                        html += `<div class="article-image"><img src="${asset.file.url}" alt="${asset.title || ''}" /><div class="image-caption">${asset.description || ''}</div></div>`;
                    }
                    break;
                default:
                    console.warn('Unsupported node type:', node.nodeType);
            }
        });
        
        return html;
    },
    
    // Render rich text content (inline elements)
    renderRichTextContent: function(content) {
        if (!content) return '';
        
        let html = '';
        
        content.forEach(node => {
            if (node.nodeType === 'text') {
                let text = node.value;
                
                // Apply marks (bold, italic, etc.)
                if (node.marks && node.marks.length > 0) {
                    node.marks.forEach(mark => {
                        switch (mark.type) {
                            case 'bold':
                                text = `<strong>${text}</strong>`;
                                break;
                            case 'italic':
                                text = `<em>${text}</em>`;
                                break;
                            case 'underline':
                                text = `<u>${text}</u>`;
                                break;
                            case 'code':
                                text = `<code>${text}</code>`;
                                break;
                        }
                    });
                }
                
                html += text;
            } else if (node.nodeType === 'hyperlink') {
                html += `<a href="${node.data.uri}" target="_blank">${this.renderRichTextContent(node.content)}</a>`;
            }
        });
        
        return html;
    },
    
    // Render rich text lists
    renderRichTextList: function(content) {
        if (!content) return '';
        
        let html = '';
        
        content.forEach(node => {
            if (node.nodeType === 'list-item') {
                html += `<li>${this.renderRichTextContent(node.content)}</li>`;
            }
        });
        
        return html;
    }
};

// Initialize Contentful client
document.addEventListener('DOMContentLoaded', function() {
    contentfulClient.init();
});
