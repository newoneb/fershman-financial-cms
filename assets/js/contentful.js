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
      return this.getPlaceholderArticles(category);
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
      
      // For now, return placeholder content
      return this.getPlaceholderArticles(category);
    } catch (error) {
      console.error('Error fetching articles from Contentful:', error);
      return this.getPlaceholderArticles(category);
    }
  },
  
  // Fetch a single article by slug
  async getArticleBySlug(slug) {
    if (this.usePlaceholders) {
      return this.getPlaceholderArticleBySlug(slug);
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
      
      // For now, return placeholder content
      return this.getPlaceholderArticleBySlug(slug);
    } catch (error) {
      console.error('Error fetching article from Contentful:', error);
      return this.getPlaceholderArticleBySlug(slug);
    }
  },
  
  // Fetch market data
  async getMarketData() {
    if (this.usePlaceholders) {
      return this.getPlaceholderMarketData();
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
      
      // For now, return placeholder content
      return this.getPlaceholderMarketData();
    } catch (error) {
      console.error('Error fetching market data from Contentful:', error);
      return this.getPlaceholderMarketData();
    }
  },
  
  // Fetch expert opinions
  async getExpertOpinions() {
    if (this.usePlaceholders) {
      return this.getPlaceholderExpertOpinions();
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
      
      // For now, return placeholder content
      return this.getPlaceholderExpertOpinions();
    } catch (error) {
      console.error('Error fetching expert opinions from Contentful:', error);
      return this.getPlaceholderExpertOpinions();
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
    
    // For now, return placeholder content
    return item;
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
    
    // For now, return placeholder content
    return item;
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
    
    // For now, return placeholder content
    return item;
  },
  
  // Placeholder content for development
  getPlaceholderArticles(category = null) {
    let articles = [
      {
        id: 'article-1',
        title: 'Global Markets Rally as Central Banks Signal Rate Cuts',
        slug: 'global-markets-rally',
        category: 'Markets',
        author: 'Jonathan Wei',
        date: new Date('2025-04-05'),
        excerpt: 'Global equity markets surged to record highs as major central banks signaled a coordinated approach to interest rate cuts in response to cooling inflation data.',
        content: '<p class="article-lead">Global equity markets surged to record highs as major central banks signaled a coordinated approach to interest rate cuts in response to cooling inflation data.</p><p>The S&P 500 climbed 2.3% to close at an all-time high of 6,250, while the technology-heavy Nasdaq Composite jumped 3.1%. European markets followed suit, with the Stoxx Europe 600 gaining 2.7%, led by a strong performance in luxury goods and technology sectors.</p><h2>Coordinated Central Bank Action</h2><p>The rally was fueled by statements from the Federal Reserve, European Central Bank, and Bank of England suggesting that interest rate cuts could begin as early as September. Federal Reserve Chair Jerome Powell noted that "the disinflationary process appears to be on solid footing," signaling a potential pivot in monetary policy.</p><p>Markets have now priced in at least three 25-basis-point rate cuts by the Fed before year-end, with the ECB expected to move even more aggressively with a potential 50-basis-point cut at its next meeting.</p><h2>Sector Performance</h2><p>Technology stocks led the rally, with semiconductor companies posting particularly strong gains. Nvidia surged 7.5% to a new record high, while Advanced Micro Devices and Taiwan Semiconductor Manufacturing Company gained 5.8% and 4.9%, respectively.</p><p>Financial stocks also performed well, with major banks seeing significant upside as the yield curve steepened. JPMorgan Chase rose 3.2%, while Goldman Sachs added 4.1%.</p><h2>Market Implications</h2><p>The coordinated approach to monetary easing has significant implications for global asset allocation strategies. Lower interest rates typically benefit growth stocks and could fuel further gains in technology and consumer discretionary sectors.</p><p>"We're seeing a classic risk-on response to the prospect of easier monetary policy," said Elena Vasquez, Chief Economist at Fershman Financial. "However, investors should be cautious about potential inflation resurgence if central banks move too aggressively."</p><p>Bond markets also reacted strongly, with the 10-year Treasury yield falling 15 basis points to 3.85%, its lowest level in six months. Gold prices surged to $2,450 per ounce, reflecting increased demand for inflation hedges amid expectations of looser monetary policy.</p>',
        featuredImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        premium: false
      },
      {
        id: 'article-2',
        title: 'Tech Sector Faces Valuation Reset Amid AI Profitability Concerns',
        slug: 'tech-sector-valuation-reset',
        category: 'Analysis',
        author: 'Dr. Sarah Chen',
        date: new Date('2025-04-04'),
        excerpt: 'Technology stocks experienced their most significant correction in 18 months as investors reassess the timeline for artificial intelligence monetization and profitability.',
        content: '<p class="article-lead">Technology stocks experienced their most significant correction in 18 months as investors reassess the timeline for artificial intelligence monetization and profitability.</p><p>The Nasdaq Composite fell 8.5% over the past week, marking its worst performance since October 2023. The selloff was particularly pronounced in companies that had positioned themselves as leaders in the artificial intelligence revolution.</p><h2>AI Profitability Timeline Questioned</h2><p>The correction was triggered by a series of earnings reports that revealed significant capital expenditures on AI infrastructure without corresponding near-term revenue growth. Microsoft reported a 45% year-over-year increase in capital expenditures, primarily related to data center expansion for AI workloads, while its AI-specific revenue growth fell short of analyst expectations.</p><p>Similarly, Alphabet disclosed that its cloud division, which houses its AI services, saw margins contract by 320 basis points sequentially due to increased infrastructure investments. The company\'s CFO noted that "monetization of generative AI capabilities remains in early stages."</p><h2>Valuation Multiples Contract</h2><p>The reassessment of AI profitability timelines has led to a significant contraction in valuation multiples across the technology sector. The average forward price-to-earnings ratio for the Nasdaq 100 has declined from 32x to 27x in just one week.</p><p>Semiconductor companies, which had been among the market\'s best performers over the past 18 months, were particularly hard hit. Nvidia saw its stock price decline by 15%, while AMD and Broadcom fell 12% and 9%, respectively.</p><p>"The market is undergoing a necessary recalibration of expectations regarding the pace of AI monetization," said Dr. Alexander Mercer, Chief Investment Strategist at Fershman Financial. "This doesn\'t diminish the long-term transformative potential of AI, but it does suggest that the path to profitability may be longer and more capital-intensive than previously anticipated."</p><h2>Investment Implications</h2><p>The correction has significant implications for investment strategies in the technology sector. Analysts are increasingly differentiating between companies with proven AI monetization models and those still in the investment phase.</p><p>ServiceNow and Adobe, which have successfully integrated AI capabilities into their existing software platforms and demonstrated revenue uplift, have outperformed the broader technology sector during the correction.</p><p>Conversely, companies making speculative investments in AI without clear monetization strategies have experienced more significant declines. This trend suggests a market shift toward rewarding tangible AI results rather than ambitious future promises.</p><p>The valuation reset also has implications for private market valuations and venture capital funding in the AI space. Several planned IPOs for AI startups have reportedly been delayed as companies and their backers reassess appropriate valuation levels in the current environment.</p>',
        featuredImage: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
        premium: false
      },
      {
        id: 'article-3',
        title: 'Regulatory Framework for Digital Assets Takes Shape in Major Economies',
        slug: 'digital-assets-regulatory-framework',
        category: 'Policy & Regulation',
        author: 'Michael Harrington',
        date: new Date('2025-04-03'),
        excerpt: 'The United States, European Union, and Singapore unveiled coordinated regulatory frameworks for digital assets, providing clarity for institutional adoption while imposing stricter requirements on crypto firms.',
        content: '<p class="article-lead">The United States, European Union, and Singapore unveiled coordinated regulatory frameworks for digital assets, providing clarity for institutional adoption while imposing stricter requirements on crypto firms.</p><p>In a series of announcements that sent ripples through cryptocurrency markets, major global economies outlined comprehensive regulatory approaches to digital assets, signaling a new phase in the integration of cryptocurrencies into the traditional financial system.</p><h2>U.S. Regulatory Clarity Emerges</h2><p>The U.S. Securities and Exchange Commission and Commodity Futures Trading Commission jointly released a framework that clearly delineates their respective jurisdictions over digital assets. The framework establishes that most cryptocurrencies will be regulated as commodities, with only those specifically designed to represent ownership in a project or provide dividend-like returns classified as securities.</p><p>This long-awaited clarity triggered a rally in major cryptocurrencies, with Bitcoin surging 12% to $92,000 and Ethereum gaining 15% to reach $7,800.</p><p>"This regulatory framework strikes an appropriate balance between fostering innovation and ensuring investor protection," said SEC Chair Sarah Williams. "It provides a path for compliant operation of digital asset platforms while maintaining the integrity of our markets."</p><h2>European Union\'s Comprehensive Approach</h2><p>Simultaneously, the European Union finalized its Markets in Crypto-Assets (MiCA) implementation guidelines, establishing a unified regulatory approach across all 27 member states. The framework introduces licensing requirements for crypto service providers, mandates reserves for stablecoin issuers, and establishes disclosure requirements for token offerings.</p><p>The European Central Bank also announced plans to launch a wholesale central bank digital currency (CBDC) by 2026, designed specifically for interbank settlements and cross-border transactions.</p><h2>Singapore Positions as Crypto Hub</h2><p>Singapore\'s Monetary Authority unveiled an enhanced regulatory framework that explicitly positions the city-state as a global hub for compliant digital asset innovation. The framework introduces a licensing regime with three tiers based on the scale and risk profile of crypto businesses.</p><p>"Singapore is committed to fostering responsible innovation in digital assets while maintaining our reputation for regulatory excellence," said MAS Managing Director Lawrence Wong. "This framework provides regulatory certainty while upholding our high standards for investor protection and financial stability."</p><h2>Institutional Implications</h2><p>The coordinated regulatory approach has significant implications for institutional adoption of digital assets. BlackRock CEO Larry Fink noted that the regulatory clarity "removes a significant barrier to institutional participation in digital asset markets" and predicted that global allocations to cryptocurrencies could increase by $1.5 trillion over the next 24 months.</p><p>Banking giants JPMorgan Chase, Goldman Sachs, and HSBC all announced expanded digital asset services following the regulatory announcements, including custody solutions, trading services, and tokenized securities offerings.</p><p>However, the new frameworks also impose significant compliance burdens on crypto-native firms. Requirements for capital reserves, customer asset segregation, and comprehensive risk management frameworks will likely accelerate consolidation in the industry, with smaller players struggling to meet the new standards.</p>',
        featuredImage: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1509&q=80',
        premium: false
      },
      {
        id: 'article-4',
        title: 'The Inflation Narrative: Why Central Banks May Be Fighting Yesterday\'s War',
        slug: 'inflation-narrative-central-banks',
        category: 'Opinion',
        author: 'Dr. Elena Vasquez',
        date: new Date('2025-04-02'),
        excerpt: 'As central banks maintain restrictive monetary policies to combat inflation, structural economic changes suggest they may be addressing a threat that has already begun to recede.',
        content: '<p class="article-lead">As central banks maintain restrictive monetary policies to combat inflation, structural economic changes suggest they may be addressing a threat that has already begun to recede.</p><p>The narrative surrounding inflation has dominated economic discourse for the past three years. Central banks globally have responded with aggressive interest rate hikes, pushing monetary policy into restrictive territory not seen since the early 2000s. However, mounting evidence suggests that policymakers may be fighting yesterday\'s war, with structural forces already working to contain inflationary pressures.</p><h2>Supply Chain Normalization</h2><p>The post-pandemic inflation surge was largely driven by unprecedented supply chain disruptions coinciding with stimulus-fueled demand. Recent data indicates that these supply constraints have not only normalized but have actually overcorrected. The Global Supply Chain Pressure Index, maintained by the Federal Reserve Bank of New York, now registers at -0.5, indicating excess capacity in global logistics networks.</p><p>Container shipping rates have fallen 85% from their peak, while semiconductor lead times have contracted from 27 weeks to just 10 weeks. This supply chain normalization has already begun to feed through to consumer goods prices, with durable goods inflation turning negative in recent months.</p><h2>Labor Market Rebalancing</h2><p>The tight labor market that characterized the post-pandemic economy is showing clear signs of rebalancing. While headline unemployment rates remain low, labor force participation has recovered to pre-pandemic levels, and the ratio of job openings to unemployed workers has declined from 2.0 to 1.2 over the past year.</p><p>Wage growth, which peaked at 5.9% year-over-year in 2022, has moderated to 3.8% in the most recent data. When combined with productivity improvements, unit labor costs are now increasing at a pace consistent with central banks\' inflation targets.</p><h2>Technological Disinflation</h2><p>Perhaps most significantly, the accelerated adoption of artificial intelligence and automation technologies is creating a powerful disinflationary force that monetary policymakers have been slow to incorporate into their models.</p><p>A recent study by the National Bureau of Economic Research estimates that AI adoption could reduce labor costs by 2.5-3.0% annually over the next five years across service sectors, which account for over 70% of developed economy employment. This technological disinflation represents a structural shift rather than a cyclical factor.</p><h2>Policy Implications</h2><p>The combination of these factors suggests that central banks may be maintaining unnecessarily restrictive monetary policy. The lagged effects of previous rate hikes are still working their way through the economy, while structural disinflationary forces are gathering momentum.</p><p>The risk of policy error is significant. By focusing excessively on backward-looking inflation data, central banks may inadvertently overtighten, potentially triggering an unnecessary recession. The European Central Bank appears particularly vulnerable to this risk, given the eurozone\'s exposure to energy price normalization and its already weak growth trajectory.</p><p>A more appropriate policy approach would be to acknowledge the changing inflation dynamics and begin a measured normalization of interest rates. This would not represent capitulation in the inflation fight, but rather a recognition that the battle is shifting to a new phase that requires different tactics.</p><p>Markets have begun to price in this reality, with yield curves steepening and inflation expectations moderating. The question is whether central banks will recognize this changing landscape before policy becomes counterproductively restrictive.</p>',
        featuredImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        premium: false
      },
      {
        id: 'article-5',
        title: 'Sovereign Wealth Funds Shift Allocation Strategy Amid Geopolitical Fragmentation',
        slug: 'sovereign-wealth-funds-allocation',
        category: 'Markets',
        author: 'Dr. Alexander Mercer',
        date: new Date('2025-04-01'),
        excerpt: 'The world\'s largest sovereign wealth funds are fundamentally restructuring their investment approaches in response to increasing geopolitical tensions and the fragmentation of the global economy.',
        content: '<p class="article-lead">The world\'s largest sovereign wealth funds are fundamentally restructuring their investment approaches in response to increasing geopolitical tensions and the fragmentation of the global economy.</p><p>Sovereign wealth funds, which collectively manage over $10 trillion in assets, have long been stalwarts of global capital markets, typically pursuing diversified, long-term investment strategies with significant allocations to U.S. and European markets. However, a fundamental shift is underway as these institutions adapt to an increasingly fragmented geopolitical landscape.</p><h2>Regional Allocation Shifts</h2><p>Analysis of recent allocation changes across the fifteen largest sovereign wealth funds reveals a significant reorientation of capital flows. Funds from Gulf Cooperation Council (GCC) countries have reduced their North American equity allocations by approximately 18% over the past 24 months, while increasing exposure to emerging markets in Southeast Asia and Latin America.</p><p>Similarly, East Asian sovereign funds have decreased their holdings of U.S. Treasury securities by 23%, redirecting capital toward regional infrastructure projects and strategic resource investments across the Global South.</p><p>"We\'re witnessing the most significant restructuring of sovereign wealth fund allocations since the 2008 financial crisis," noted Jonathan Wei, Senior Market Analyst at Fershman Financial. "The difference is that the current shifts are driven by strategic geopolitical considerations rather than purely financial factors."</p><h2>Strategic Sector Focus</h2><p>Beyond geographical reallocation, sovereign funds are increasingly targeting investments in sectors deemed strategically important for national security and economic resilience. These include:</p><p>1. <strong>Critical minerals and materials</strong>: Investments in mining operations and processing facilities for rare earth elements, lithium, cobalt, and semiconductor materials have increased threefold since 2022.</p><p>2. <strong>Food security</strong>: Agricultural land acquisitions and investments in agricultural technology have become priority areas, particularly for funds from water-scarce regions.</p><p>3. <strong>Advanced manufacturing</strong>: Significant capital is flowing into reshoring and friendshoring initiatives, with particular focus on semiconductor fabrication, pharmaceutical production, and defense technologies.</p><p>4. <strong>Digital infrastructure</strong>: Data centers, fiber optic networks, and satellite communications systems have attracted substantial sovereign investment, often with explicit national security dimensions.</p><h2>Implications for Global Markets</h2><p>The reorientation of sovereign wealth fund allocations has significant implications for global capital markets and asset prices. U.S. Treasury auctions have seen reduced participation from traditional sovereign buyers, contributing to higher yields and increased volatility in government bond markets.</p><p>Conversely, emerging market equities and bonds have benefited from increased sovereign fund flows, providing a stabilizing counterbalance to more volatile retail and institutional capital.</p><p>Private market valuations are also being affected, with sovereign funds increasingly willing to pay strategic premiums for assets in priority sectors, regardless of near-term financial returns. This has created a two-tier valuation environment in private equity and venture capital, with strategically important assets commanding significantly higher multiples.</p><h2>Long-term Structural Shift</h2><p>Unlike tactical asset allocation changes, the current sovereign fund repositioning appears to represent a structural shift that will persist regardless of near-term market conditions or political developments.</p><p>"What we\'re seeing is not a cyclical adjustment but a fundamental rethinking of the role of sovereign wealth in a fragmented global order," explained Dr. Richard Keller, Chief Risk Strategist at Fershman Financial. "These institutions are increasingly prioritizing strategic resilience and national security considerations alongside—and sometimes above—pure financial returns."</p><p>This shift coincides with broader changes in the global economic architecture, including the rise of alternative payment systems, commodity-backed trading arrangements, and regional economic blocs. Together, these developments suggest an acceleration of the fragmentation of the global economic order that has prevailed since the end of the Cold War.</p><p>For investors, the implications are profound. Traditional portfolio construction approaches based on assumptions of continued global economic integration may need to be reassessed, with greater emphasis on scenario planning and geopolitical risk factors.</p>',
        featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80',
        premium: false
      },
      {
        id: 'article-6',
        title: 'The Commodities Supercycle: Separating Signal from Noise',
        slug: 'commodities-supercycle-analysis',
        category: 'Analysis',
        author: 'Dr. Alexander Mercer',
        date: new Date('2025-03-30'),
        excerpt: 'As commodities markets experience unprecedented volatility, distinguishing between cyclical fluctuations and structural trends has become essential for investors navigating the purported "commodities supercycle."',
        content: '<p class="article-lead">As commodities markets experience unprecedented volatility, distinguishing between cyclical fluctuations and structural trends has become essential for investors navigating the purported "commodities supercycle."</p><p>The narrative of a commodities supercycle—a decades-long period of above-trend price appreciation across natural resources—has gained significant traction among investors and market commentators. Proponents point to the confluence of energy transition demands, underinvestment in traditional extraction, and geopolitical fragmentation as catalysts for sustained price appreciation. However, a more nuanced analysis reveals a complex landscape where different commodity classes are driven by distinct fundamental factors.</p><h2>Energy Transition Metals: Structural Bull Case</h2><p>The strongest case for a structural bull market exists in metals essential to the energy transition. Copper, lithium, nickel, and rare earth elements face genuine supply constraints relative to projected demand growth from electric vehicles, renewable energy infrastructure, and grid modernization.</p><p>Copper is particularly illustrative of this dynamic. Current global production of 25 million metric tons annually would need to reach 50 million tons by 2035 to meet projected demand from electrification initiatives. However, declining ore grades, water constraints, and a dearth of new major discoveries suggest supply growth will struggle to exceed 2% annually over the next decade.</p><p>This fundamental supply-demand imbalance is reflected in copper\'s forward curve, which remains in backwardation despite recent price volatility—a signal that physical market tightness persists regardless of financial market fluctuations.</p><h2>Agricultural Commodities: Weather-Driven Volatility</h2><p>In contrast to industrial metals, agricultural commodities appear to be experiencing cyclical rather than structural price pressures. While climate change has increased weather-related volatility, technological advances in agriculture continue to drive productivity improvements that offset growing demand.</p><p>Satellite imagery analysis indicates that global grain production capacity has increased by 8% over the past five years, with particularly significant yield improvements in Brazil, India, and parts of Sub-Saharan Africa. These productivity gains suggest that agricultural price spikes are more likely to represent weather-driven anomalies rather than structural supply deficits.</p><p>This assessment is supported by the consistent contango structure in agricultural futures markets, indicating that market participants expect current elevated prices to moderate over time.</p><h2>Energy: Transition Tensions</h2><p>The energy complex presents perhaps the most complex picture, with contradictory forces at work. On one hand, underinvestment in traditional oil and gas production has created medium-term supply constraints, with global upstream investment running approximately 25% below the level needed to offset natural field declines.</p><p>On the other hand, accelerating adoption of electric vehicles and renewable energy technologies is beginning to bend the demand curve for hydrocarbons. Bloomberg New Energy Finance estimates that electric vehicles are now displacing approximately 1.5 million barrels per day of oil demand, a figure projected to reach 5 million barrels by 2030.</p><p>This tension between constrained supply and potentially peak demand creates a scenario where energy prices may experience significant volatility without a clear long-term directional trend—a pattern more consistent with a market in transition than a traditional supercycle.</p><h2>Investment Implications</h2><p>The heterogeneous nature of commodity market fundamentals suggests that broad-based commodity index investments may not be the optimal approach in the current environment. Instead, a more discriminating strategy focused on specific supply-constrained materials with clear structural demand drivers is likely to yield superior results.</p><p>Particularly compelling opportunities exist in the "minerals-to-infrastructure" value chain—companies involved in the production, processing, and integration of critical minerals into energy transition infrastructure. This segment benefits from both commodity price appreciation and the value-added component of infrastructure development.</p><p>Conversely, investments predicated on sustained appreciation across the broader commodities complex may be vulnerable to disappointment, as cyclical factors and technological disruption create divergent paths for different resource classes.</p><p>The commodities narrative requires careful disaggregation rather than broad-based acceptance or rejection. The evidence suggests we are experiencing not a comprehensive supercycle but rather a complex transition with both structural and cyclical elements at play across different resource categories.</p>',
        featuredImage: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1402&q=80',
        premium: false
      }
    ];
    
    // Filter by category if specified
    if (category) {
      articles = articles.filter(article => article.category === category);
    }
    
    return articles;
  },
  
  // Get a single placeholder article by slug
  getPlaceholderArticleBySlug(slug) {
    const articles = this.getPlaceholderArticles();
    return articles.find(article => article.slug === slug) || null;
  },
  
  // Placeholder market data
  getPlaceholderMarketData() {
    return [
      { symbol: 'SPX', name: 'S&P 500', value: 6250.75, change: 145.32, changePercent: 2.38, direction: 'up' },
      { symbol: 'IXIC', name: 'NASDAQ', value: 22456.89, change: 687.45, changePercent: 3.16, direction: 'up' },
      { symbol: 'DJI', name: 'Dow Jones', value: 41023.45, change: 423.78, changePercent: 1.04, direction: 'up' },
      { symbol: 'FTSE', name: 'FTSE 100', value: 8756.32, change: 234.56, changePercent: 2.75, direction: 'up' },
      { symbol: 'DAX', name: 'DAX', value: 18934.67, change: 345.78, changePercent: 1.86, direction: 'up' },
      { symbol: 'N225', name: 'Nikkei 225', value: 42567.89, change: -156.78, changePercent: -0.37, direction: 'down' },
      { symbol: 'BTC', name: 'Bitcoin', value: 92345.67, change: 11234.56, changePercent: 13.85, direction: 'up' },
      { symbol: 'ETH', name: 'Ethereum', value: 7823.45, change: 1023.45, changePercent: 15.05, direction: 'up' },
      { symbol: 'GOLD', name: 'Gold', value: 2450.30, change: 45.60, changePercent: 1.90, direction: 'up' },
      { symbol: 'OIL', name: 'Crude Oil', value: 82.45, change: -1.23, changePercent: -1.47, direction: 'down' },
      { symbol: 'EURUSD', name: 'EUR/USD', value: 1.1245, change: 0.0056, changePercent: 0.50, direction: 'up' },
      { symbol: 'USDJPY', name: 'USD/JPY', value: 142.67, change: -0.45, changePercent: -0.31, direction: 'down' }
    ];
  },
  
  // Placeholder expert opinions
  getPlaceholderExpertOpinions() {
    return [
      {
        id: 'opinion-1',
        quote: "The market's reaction to recent central bank communications suggests a significant shift in sentiment. Investors are increasingly focused on the pace of monetary easing rather than whether it will occur at all.",
        author: 'Dr. Elena Vasquez',
        title: 'Chief Economist',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80'
      },
      {
        id: 'opinion-2',
        quote: "The technology sector correction represents a healthy recalibration of expectations rather than a fundamental reassessment of AI's transformative potential. Companies with clear monetization strategies will emerge stronger.",
        author: 'Dr. Sarah Chen',
        title: 'Head of Technology Research',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1361&q=80'
      },
      {
        id: 'opinion-3',
        quote: "Regulatory clarity in digital assets will accelerate institutional adoption, but compliance costs will drive significant consolidation among crypto-native firms. Scale will become increasingly important for survival.",
        author: 'Michael Harrington',
        title: 'Policy & Regulation Editor',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'
      }
    ];
  }
};

// Initialize Contentful client when the script loads
document.addEventListener('DOMContentLoaded', function() {
  contentfulClient.init();
  
  // Determine what content to load based on the current page
  const currentPath = window.location.pathname;
  
  if (currentPath.includes('/pages/markets.html')) {
    loadCategoryPage('Markets');
  } else if (currentPath.includes('/pages/analysis.html')) {
    loadCategoryPage('Analysis');
  } else if (currentPath.includes('/pages/policy.html')) {
    loadCategoryPage('Policy & Regulation');
  } else if (currentPath.includes('/pages/opinion.html')) {
    loadCategoryPage('Opinion');
  } else if (currentPath.includes('/articles/')) {
    // Extract slug from URL
    const slug = currentPath.split('/').pop().replace('.html', '');
    loadArticlePage(slug);
  } else if (currentPath === '/' || currentPath.includes('/index.html')) {
    loadHomePage();
  }
});

// Load homepage content
async function loadHomePage() {
  try {
    // Fetch featured articles for homepage
    const articles = await contentfulClient.getArticles();
    const marketData = await contentfulClient.getMarketData();
    const opinions = await contentfulClient.getExpertOpinions();
    
    // Populate featured articles section
    const featuredGrid = document.querySelector('.featured-grid');
    if (featuredGrid && articles.length > 0) {
      // Featured main article
      const mainArticle = articles[0];
      const featuredMain = featuredGrid.querySelector('.featured-main');
      if (featuredMain) {
        featuredMain.style.backgroundImage = `url('${mainArticle.featuredImage}')`;
        featuredMain.querySelector('.article-category').textContent = mainArticle.category;
        featuredMain.querySelector('.article-title').textContent = mainArticle.title;
        featuredMain.querySelector('.article-excerpt').textContent = mainArticle.excerpt;
        featuredMain.querySelector('.article-date').textContent = formatDate(mainArticle.date);
        featuredMain.querySelector('.article-link').href = `/articles/${mainArticle.slug}.html`;
      }
      
      // Featured secondary articles
      const secondaryArticles = articles.slice(1, 3);
      const secondaryElements = featuredGrid.querySelectorAll('.featured-secondary');
      
      secondaryArticles.forEach((article, index) => {
        if (secondaryElements[index]) {
          secondaryElements[index].style.backgroundImage = `url('${article.featuredImage}')`;
          secondaryElements[index].querySelector('.article-category').textContent = article.category;
          secondaryElements[index].querySelector('.article-title').textContent = article.title;
          secondaryElements[index].querySelector('.article-date').textContent = formatDate(article.date);
          secondaryElements[index].querySelector('.article-link').href = `/articles/${article.slug}.html`;
        }
      });
    }
    
    // Populate market data ticker
    const ticker = document.querySelector('.ticker');
    if (ticker && marketData.length > 0) {
      let tickerHTML = '';
      
      // Create ticker items
      marketData.forEach(item => {
        const directionClass = item.direction === 'up' ? 'positive' : 'negative';
        const directionIcon = item.direction === 'up' ? '▲' : '▼';
        
        tickerHTML += `
          <div class="ticker-item">
            <span class="ticker-symbol">${item.symbol}</span>
            <span class="ticker-value">${item.value.toLocaleString()}</span>
            <span class="ticker-change ${directionClass}">${directionIcon} ${item.change.toLocaleString()} (${item.changePercent.toFixed(2)}%)</span>
          </div>
        `;
      });
      
      // Add duplicate items for continuous scrolling
      ticker.innerHTML = tickerHTML + tickerHTML;
    }
    
    // Populate latest articles section
    const articlesGrid = document.querySelector('.articles-grid');
    if (articlesGrid && articles.length > 3) {
      const latestArticles = articles.slice(3);
      
      articlesGrid.innerHTML = '';
      latestArticles.forEach(article => {
        const articleCard = document.createElement('div');
        articleCard.className = 'article-card fade-in';
        articleCard.style.backgroundImage = `url('${article.featuredImage}')`;
        
        articleCard.innerHTML = `
          <div class="article-card-content">
            <div class="article-category">${article.category}</div>
            <h3 class="article-title">${article.title}</h3>
            <div class="article-meta">
              <span class="article-author">${article.author}</span>
              <span class="article-date">${formatDate(article.date)}</span>
            </div>
            <a href="/articles/${article.slug}.html" class="article-link">Read Article</a>
          </div>
        `;
        
        articlesGrid.appendChild(articleCard);
      });
    }
    
    // Populate expert opinions section
    const opinionsGrid = document.querySelector('.opinions-grid');
    if (opinionsGrid && opinions.length > 0) {
      opinionsGrid.innerHTML = '';
      
      opinions.forEach(opinion => {
        const opinionCard = document.createElement('div');
        opinionCard.className = 'opinion-card fade-in';
        
        opinionCard.innerHTML = `
          <div class="opinion-quote">"${opinion.quote}"</div>
          <div class="opinion-author">
            <div class="author-image" style="background-image: url('${opinion.image}');"></div>
            <div class="author-info">
              <div class="author-name">${opinion.author}</div>
              <div class="author-title">${opinion.title}</div>
            </div>
          </div>
        `;
        
        opinionsGrid.appendChild(opinionCard);
      });
    }
    
  } catch (error) {
    console.error('Error loading homepage content:', error);
  }
}

// Load category page content
async function loadCategoryPage(category) {
  try {
    // Fetch articles for this category
    const articles = await contentfulClient.getArticles(category);
    
    // Update page title and description if needed
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) {
      pageTitle.textContent = category;
    }
    
    // Populate articles grid
    const articlesGrid = document.querySelector('.articles-grid');
    if (articlesGrid && articles.length > 0) {
      articlesGrid.innerHTML = '';
      
      articles.forEach(article => {
        const articleCard = document.createElement('div');
        articleCard.className = 'article-card fade-in';
        articleCard.style.backgroundImage = `url('${article.featuredImage}')`;
        
        articleCard.innerHTML = `
          <div class="article-card-content">
            <h3 class="article-title">${article.title}</h3>
            <p class="article-excerpt">${article.excerpt}</p>
            <div class="article-meta">
              <span class="article-author">${article.author}</span>
              <span class="article-date">${formatDate(article.date)}</span>
            </div>
            <a href="/articles/${article.slug}.html" class="article-link">Read Article</a>
          </div>
        `;
        
        articlesGrid.appendChild(articleCard);
      });
    } else if (articlesGrid) {
      articlesGrid.innerHTML = '<div class="no-articles">No articles found in this category.</div>';
    }
    
  } catch (error) {
    console.error(`Error loading ${category} page content:`, error);
  }
}

// Load article page content
async function loadArticlePage(slug) {
  try {
    // Fetch the specific article
    const article = await contentfulClient.getArticleBySlug(slug);
    
    if (!article) {
      console.error('Article not found:', slug);
      return;
    }
    
    // Update page title and meta tags
    document.title = `${article.title} | Fershman Financial`;
    
    // Update article header
    const articleTitle = document.querySelector('.article-title');
    if (articleTitle) {
      articleTitle.textContent = article.title;
    }
    
    const articleCategory = document.querySelector('.article-category');
    if (articleCategory) {
      articleCategory.textContent = article.category;
      articleCategory.href = `/pages/${article.category.toLowerCase().replace(' & ', '-')}.html`;
    }
    
    const articleAuthor = document.querySelector('.article-author-name');
    if (articleAuthor) {
      articleAuthor.textContent = article.author;
    }
    
    const articleDate = document.querySelector('.article-date');
    if (articleDate) {
      articleDate.textContent = formatDate(article.date);
    }
    
    // Update featured image
    const featuredImage = document.querySelector('.article-featured-image');
    if (featuredImage) {
      featuredImage.style.backgroundImage = `url('${article.featuredImage}')`;
    }
    
    // Update article content
    const articleBody = document.querySelector('.article-body');
    if (articleBody) {
      articleBody.innerHTML = article.content;
    }
    
    // Fetch related articles
    const relatedArticles = await contentfulClient.getArticles(article.category);
    const filteredRelated = relatedArticles.filter(a => a.id !== article.id).slice(0, 3);
    
    // Update related articles section
    const relatedGrid = document.querySelector('.related-articles-grid');
    if (relatedGrid && filteredRelated.length > 0) {
      relatedGrid.innerHTML = '';
      
      filteredRelated.forEach(related => {
        const relatedCard = document.createElement('div');
        relatedCard.className = 'related-article fade-in';
        
        relatedCard.innerHTML = `
          <div class="related-article-image" style="background-image: url('${related.featuredImage}');"></div>
          <div class="related-article-content">
            <h3 class="related-article-title">${related.title}</h3>
            <div class="article-meta">
              <span class="article-author">${related.author}</span>
              <span class="article-date">${formatDate(related.date)}</span>
            </div>
            <a href="/articles/${related.slug}.html" class="article-link">Read Article</a>
          </div>
        `;
        
        relatedGrid.appendChild(relatedCard);
      });
    }
    
  } catch (error) {
    console.error('Error loading article page:', error);
  }
}

// Helper function to format dates
function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
}
