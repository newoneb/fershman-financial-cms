# Fershman Financial - Premium Economic Journal

This repository contains the complete codebase for the Fershman Financial website - a premium, cinematic economic journal with Contentful CMS integration.

## Features

- **Cinematic Design**: Bold, immersive design with Jet Black background, Ivory White text, and Red accent colors
- **Dark/Light Mode Toggle**: User-selectable theme with smooth transitions between dark and light modes
- **Multi-Page Structure**: True multi-page website (not SPA) with proper navigation
- **Contentful CMS Integration**: Dynamic content management for articles and market data
- **Live Market Data**: Real-time financial data from public APIs for DOW, BTC/USD, EUR/USD, and GOLD
- **Premium Animations**: Parallax scrolling, hover effects, and smooth transitions
- **Mobile Responsive**: Fully responsive design with optimized mobile experience and proper viewport settings
- **Horizontal Footer Layout**: Clean, modern footer with social links and navigation
- **Netlify Ready**: Configured for instant deployment on Netlify

## Pages

- `/index.html` - Landing page with featured articles and market data
- `/pages/markets.html` - Markets category page
- `/pages/analysis.html` - Analysis category page
- `/pages/policy.html` - Policy & Regulation category page
- `/pages/opinion.html` - Opinion category page
- `/pages/about.html` - About us page
- `/articles/[slug].html` - Dynamic article pages

## Setup Instructions

### 1. Contentful Setup

1. Create a Contentful account at [contentful.com](https://www.contentful.com/)
2. Create a new space
3. Set up the following content models:

#### Article Content Model
- Title (Short text)
- Slug (Short text) - URL-friendly version of the title
- Category (Short text with predefined values: Markets, Analysis, Policy & Regulation, Opinion)
- Author (Short text)
- Publication Date (Date & time)
- Featured Image (Media)
- Excerpt (Short text)
- Content (Rich text)

#### Market Data Model
- Symbol (Short text)
- Name (Short text)
- Value (Number)
- Change (Number)
- Change Percent (Number)
- Direction (Short text with predefined values: up, down)

#### Expert Opinion Model
- Quote (Long text)
- Author (Short text)
- Title (Short text)
- Image (Media)

4. Create sample content entries for each model
5. Get your Space ID and Content Delivery API access token from Settings > API keys

### 2. Market Data API Setup

The website uses several public financial APIs to fetch real-time market data:

1. **Yahoo Finance API** (via RapidAPI) for DOW data:
   - Sign up for a free account at [RapidAPI](https://rapidapi.com/)
   - Subscribe to the [Yahoo Finance API](https://rapidapi.com/apidojo/api/yahoo-finance1/)
   - Get your API key from the RapidAPI dashboard
   - Replace the API key in `assets/js/marketData.js` with your own key

2. **CoinGecko API** for Bitcoin data:
   - No API key required for basic usage
   - Uses the public endpoint: `https://api.coingecko.com/api/v3/simple/price`

3. **ExchangeRate API** for EUR/USD forex data:
   - No API key required for basic usage
   - Uses the public endpoint: `https://open.er-api.com/v6/latest/USD`

4. **Metals API** (via RapidAPI) for Gold price data:
   - Sign up for a free account at [RapidAPI](https://rapidapi.com/)
   - Subscribe to the [Metals API](https://rapidapi.com/api-sports/api/metals-api/)
   - Get your API key from the RapidAPI dashboard
   - Replace the API key in `assets/js/marketData.js` with your own key

Note: The website includes fallback data in case API calls fail, ensuring the ticker always displays information even if real-time data cannot be fetched.

### 3. GitHub Setup

1. Create a new GitHub repository
2. Upload all files from this package to your repository

### 4. Netlify Deployment

1. Sign up/log in to [Netlify](https://www.netlify.com/)
2. Click "New site from Git"
3. Connect your GitHub account and select your repository
4. Configure build settings:
   - Build command: (leave blank)
   - Publish directory: `/`
5. Add environment variables:
   - CONTENTFUL_SPACE_ID: Your Contentful space ID
   - CONTENTFUL_ACCESS_TOKEN: Your Contentful Content Delivery API access token
6. Click "Deploy site"

### 5. Custom Domain Setup

1. In Netlify, go to Site settings > Domain management
2. Add your custom domain
3. Configure your domain's DNS settings as instructed by Netlify
4. Enable HTTPS

## Content Management

Once set up, you can manage all content through the Contentful web interface:

1. **Adding Articles**:
   - Go to Content in your Contentful space
   - Click "Add entry" and select "Article"
   - Fill in all fields and publish
   - The article will automatically appear on the website

2. **Updating Market Data**:
   - Edit existing market data entries or add new ones
   - Changes will be reflected on the website

3. **Managing Expert Opinions**:
   - Add or edit expert opinion entries
   - Changes will be reflected in the Opinion section

## Theme Customization

The website features a dark/light mode toggle:

- **Dark Mode (Default)**: Jet Black background with Ivory text
- **Light Mode**: Ivory background with dark text

The theme settings are saved in localStorage and persist between sessions. The toggle button is located in the top-right corner of the page.

## Development Notes

- The website uses vanilla HTML, CSS, and JavaScript for maximum compatibility
- Contentful integration is handled through the `contentful.js` file
- Market data is fetched and displayed through the `marketData.js` file
- Theme switching is managed by `theme.js` and `theme.css`
- The footer layout is controlled by `footer.css`
- Placeholder content is displayed when Contentful credentials are not provided
- The design is fully responsive with dedicated mobile styles and proper viewport settings

## Responsive Design

The website is fully responsive with the following features:

- Proper viewport meta tag to prevent horizontal scrolling and zooming on mobile
- Relative units (%, rem, vw) for sizing elements
- Overflow-x: hidden on the body to prevent horizontal scrolling
- Mobile-specific styles in `mobile.css`
- Responsive footer layout that adapts to different screen sizes

## Troubleshooting

If you encounter a "Page not found" error on Netlify:
1. Ensure the `netlify.toml` file is in the root of your repository
2. Check that the redirects are properly configured
3. Trigger a new deployment in Netlify

For Contentful integration issues:
1. Verify your Space ID and Access Token are correct
2. Check that your content models match the expected structure
3. Ensure you have published content entries

For Market Data API issues:
1. Check that your API keys are valid and correctly entered
2. Verify that you haven't exceeded API rate limits
3. The website will use fallback data if API calls fail

## License

All rights reserved. This code is provided for the exclusive use of Fershman Financial.
