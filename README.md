# Fershman Financial - Premium Economic Journal

This repository contains the complete codebase for the Fershman Financial website - a premium, cinematic economic journal with Contentful CMS integration.

## Features

- **Cinematic Design**: Bold, immersive design with Jet Black background, Ivory White text, and Red accent colors
- **Multi-Page Structure**: True multi-page website (not SPA) with proper navigation
- **Contentful CMS Integration**: Dynamic content management for articles and market data
- **Premium Animations**: Parallax scrolling, hover effects, and smooth transitions
- **Mobile Responsive**: Custom mobile layout with optimized experience
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

### 2. GitHub Setup

1. Create a new GitHub repository
2. Upload all files from this package to your repository

### 3. Netlify Deployment

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

### 4. Custom Domain Setup

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

## Development Notes

- The website uses vanilla HTML, CSS, and JavaScript for maximum compatibility
- Contentful integration is handled through the `contentful.js` file
- Placeholder content is displayed when Contentful credentials are not provided
- The design is fully responsive with dedicated mobile styles

## Troubleshooting

If you encounter a "Page not found" error on Netlify:
1. Ensure the `netlify.toml` file is in the root of your repository
2. Check that the redirects are properly configured
3. Trigger a new deployment in Netlify

For Contentful integration issues:
1. Verify your Space ID and Access Token are correct
2. Check that your content models match the expected structure
3. Ensure you have published content entries

## License

All rights reserved. This code is provided for the exclusive use of Fershman Financial.
