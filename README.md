# Fershman Financial CMS - Contentful Integration

This repository contains the Fershman Financial website with fully integrated Contentful CMS functionality.

## Features

- Dynamic article loading from Contentful CMS
- Category-based article filtering
- Rich text content formatting
- Responsive design for all devices
- Loading states and error handling
- SEO-friendly article pages

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- Contentful account with appropriate content models

### Local Development

1. Clone the repository:
```
git clone https://github.com/yourusername/fershman-financial-cms.git
cd fershman-financial-cms
```

2. Open the project in your preferred code editor.

3. To run the site locally, you can use any simple HTTP server. For example:
```
npx http-server
```

4. Visit `http://localhost:8080` in your browser to view the site.

### Contentful Configuration

The site is configured to use environment variables for Contentful credentials:

- `CONTENTFUL_SPACE_ID`: Your Contentful space ID
- `CONTENTFUL_ACCESS_TOKEN`: Your Contentful Content Delivery API access token

These are set in the Netlify environment configuration and will be automatically used in production.

For local development, the site includes fallback credentials in the `contentful.js` file.

### Content Models

The site expects the following content models in your Contentful space:

1. **Article**
   - `title` (Text): Article title
   - `slug` (Text): URL-friendly identifier
   - `category` (Text): Article category (Markets, Analysis, Policy & Regulation, Opinion)
   - `author` (Text): Author name
   - `publicationDate` (Date): Publication date
   - `summary` (Rich Text): Article summary/excerpt
   - `contentBody` (Rich Text): Main article content
   - `featuredImage` (Media): Featured image for the article
   - `premium` (Boolean): Whether the article is premium content

2. **Market Data**
   - `symbol` (Text): Market symbol (e.g., S&P 500)
   - `name` (Text): Full name
   - `value` (Number): Current value
   - `change` (Number): Change in value
   - `changePercent` (Number): Percentage change
   - `direction` (Text): up, down, or neutral

3. **Expert Opinion**
   - `quote` (Text): The expert's quote
   - `author` (Text): Expert's name
   - `title` (Text): Expert's title/position
   - `image` (Media): Expert's photo

## Deployment

### Netlify Deployment

The site is configured for deployment on Netlify:

1. Connect your GitHub repository to Netlify
2. Configure the following build settings:
   - Build command: (none required for static site)
   - Publish directory: `/`
3. Add the following environment variables:
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_ACCESS_TOKEN`

The included `netlify.toml` file handles routing configuration.

## File Structure

- `index.html`: Main homepage
- `pages/`: Category pages (markets, analysis, policy, opinion)
- `articles/`: Article template and dynamic article pages
- `assets/`: 
  - `css/`: Stylesheets
  - `js/`: JavaScript files
    - `contentful.js`: Contentful integration
    - `articleRouter.js`: Dynamic article routing
    - `main.js`: Main site functionality
  - `images/`: Site images and assets

## Troubleshooting

If articles are not loading:

1. Check browser console for errors
2. Verify Contentful credentials are correct
3. Ensure content models match expected structure
4. Check network requests to Contentful API

## License

All rights reserved. This code is proprietary to Fershman Financial.
