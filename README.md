# Fershman Financial Website

A visually stunning, multi-page, responsive website for Fershman Financial, an elite economic journal with a modern newspaper aesthetic.

## Features

- **Light Mode Design**: Clean white background (#ffffff) with black text (#000000) and red accents (#ef291d)
- **Multi-Page Structure**: Real HTML pages for different sections (not a SPA)
- **Live Market Ticker**: Real-time financial data from public APIs with proper formatting
- **Responsive Design**: Fully optimized for all devices with proper viewport settings
- **Premium Visual Elements**: Glassmorphism navigation, smooth animations, and 3D hover effects
- **Dynamic Content**: Integration with Contentful CMS for article management

## Pages

- **Homepage**: Featured articles and market overview
- **Markets**: In-depth market analysis and data
- **Analysis**: Economic analysis and insights
- **Policy**: Regulatory and policy coverage
- **Opinion**: Expert perspectives and commentary
- **About**: Information about Fershman Financial
- **Articles**: Individual article pages rendered from Contentful

## Technical Details

### API Integration

The market ticker uses multiple public APIs to fetch real-time financial data:

1. **Yahoo Finance API**: For DOW data
2. **CoinGecko API**: For Bitcoin price data
3. **ExchangeRate API**: For EUR/USD forex data
4. **Metals API**: For Gold price data

### Deployment

The site is configured for deployment on Netlify with proper routing:

1. Clone this repository to your GitHub account
2. Connect your GitHub repository to Netlify
3. Use the following build settings:
   - Build command: (none required)
   - Publish directory: /
4. The included netlify.toml file handles proper routing for all pages

### Contentful CMS Setup

To connect your own Contentful space:

1. Create a Contentful account and space
2. Create content models matching the structure in contentful.js
3. Update the space ID and access token in assets/js/contentful.js
4. Publish content through the Contentful interface

## Recent Updates

- Switched to refined light mode with newspaper aesthetic
- Fixed market ticker formatting bug for positive percentage values
- Adjusted header spacing on category pages for better visual balance
- Improved mobile navigation interactions
- Removed placeholder content in favor of dynamic Contentful integration
- Standardized footer layout across all pages

## Browser Compatibility

Tested and optimized for:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Credits

Developed for Fershman Financial © 2025
