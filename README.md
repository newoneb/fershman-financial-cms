# Fershman Financial Website

A visually stunning, multi-page, responsive website for Fershman Financial, an elite economic journal with premium design and live market data.

## Features

- **Premium Design**: Modern aesthetic inspired by Newsplate, The New Yorker, WSJ, and Apple
- **Multi-Page Structure**: Real HTML pages with proper routing
- **Live Market Data**: Real-time financial information from public APIs
- **Responsive Design**: Fully optimized for all devices
- **CMS Integration**: Dynamic content from Contentful
- **Visual Effects**: Glassmorphism, 3D hover effects, smooth animations

## Pages

- `index.html` - Homepage
- `markets.html` - Market analysis and data
- `analysis.html` - In-depth economic analysis
- `policy.html` - Policy and regulation coverage
- `opinion.html` - Expert opinions and commentary
- `about.html` - About the publication
- `articles/[slug].html` - Individual article pages (rendered from Contentful)

## Setup Instructions

### Local Development

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/fershman-financial-cms.git
   cd fershman-financial-cms
   ```

2. Open `index.html` in your browser to view the site locally.

3. For the best experience, use a local server:
   ```
   npx serve
   ```

### Deployment to Netlify

1. Create a new site on Netlify.

2. Connect to your GitHub repository.

3. Configure build settings:
   - Build command: (leave blank for static site)
   - Publish directory: `/`

4. Set up environment variables in Netlify:
   - `CONTENTFUL_SPACE_ID`: Your Contentful space ID
   - `CONTENTFUL_ACCESS_TOKEN`: Your Contentful access token

5. Deploy the site.

## Contentful CMS Setup

1. Create a Contentful account at [contentful.com](https://www.contentful.com/).

2. Create a new space.

3. Set up content models:
   - Article
   - Author
   - Category

4. Create sample content.

5. Get your Space ID and Access Token from Settings > API Keys.

6. Update the credentials in `assets/js/contentful.js`.

## Live Market Data APIs

The website uses several public APIs to fetch real-time market data:

1. **Yahoo Finance API** - For DOW data
   - No API key required for basic implementation
   - For production, consider using a premium API key

2. **CoinGecko API** - For Bitcoin price data
   - Free tier with rate limiting
   - Documentation: [coingecko.com/api/documentation](https://www.coingecko.com/api/documentation)

3. **ExchangeRate API** - For EUR/USD forex data
   - Free tier available
   - Documentation: [exchangerate-api.com/docs](https://www.exchangerate-api.com/docs)

4. **Gold API** - For gold price data
   - Free tier with limited requests
   - Documentation: [goldapi.io/documentation](https://www.goldapi.io/documentation)

To update API keys:
1. Open `assets/js/marketData.js`
2. Replace the API keys in the respective fetch functions
3. Test the implementation to ensure data is loading correctly

## File Structure

```
fershman-financial-cms/
├── index.html                  # Homepage
├── netlify.toml                # Netlify configuration
├── articles/                   # Article template
│   └── article-template.html
├── assets/
│   ├── css/
│   │   ├── styles.css          # Main styles
│   │   ├── mobile.css          # Mobile-specific styles
│   │   ├── loader.css          # Loading screen styles
│   │   └── footer.css          # Footer styles
│   ├── js/
│   │   ├── main.js             # Main JavaScript
│   │   ├── contentful.js       # CMS integration
│   │   └── marketData.js       # Live market data
│   └── images/                 # Image assets
└── pages/                      # Secondary pages
    ├── markets.html
    ├── analysis.html
    ├── policy.html
    ├── opinion.html
    └── about.html
```

## Design Features

- **Color Palette**:
  - Background: Jet Black (#000000)
  - Text: Ivory White (#FFFFF0)
  - Accent: Red (#ef291d)

- **Typography**:
  - Headings: Playfair Display
  - Body: Inter

- **Visual Effects**:
  - Glassmorphism navigation bar
  - 3D hover effects on cards
  - Smooth scroll reveals
  - Animated text reveals
  - Animated loading screen

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Credits

- Font Awesome for icons
- Unsplash for placeholder images
- Google Fonts for typography

## License

All rights reserved © 2025 Fershman Financial
