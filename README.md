# Fershman Financial CMS

A premium economic journal website with Contentful CMS integration.

## Features

- Responsive design for desktop and mobile devices
- Dynamic content loading from Contentful CMS
- Light/dark mode toggle
- Market data ticker
- Featured articles section
- Category-based article browsing
- Expert opinions section

## Mobile Navigation Fixes

The following fixes have been implemented for the mobile navigation:

1. **Fixed drawer background color** to white for better visibility
2. **Ensured all navigation links are visible** in the mobile drawer
3. **Fixed navigation link text color** to black for better contrast
4. **Made links fully tappable** with proper width and display properties
5. **Fixed overlay blocking issue** by adding `pointer-events: none` to the overlay element
6. **Verified drawer closes automatically** when a link is tapped

## Deployment Instructions

### Prerequisites

- Node.js (v14 or higher)
- Contentful account with appropriate content model
- Netlify account for deployment

### Local Development

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/fershman-financial-cms.git
   cd fershman-financial-cms
   ```

2. Install dependencies (if using npm packages):
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   CONTENTFUL_SPACE_ID=your_space_id
   CONTENTFUL_ACCESS_TOKEN=your_access_token
   ```

4. Start a local development server:
   ```
   npx serve
   ```
   or
   ```
   python -m http.server 8000
   ```

5. Open your browser and navigate to `http://localhost:8000` or the port specified by your server.

### Contentful Setup

1. Create a Contentful account if you don't have one already.
2. Create a new space or use an existing one.
3. Set up content models for:
   - Articles
   - Market Data
   - Expert Opinions
4. Populate your space with content.
5. Get your Space ID and Content Delivery API access token from Contentful's settings.

### Netlify Deployment

1. Log in to your Netlify account.
2. Click "New site from Git" and select your repository.
3. Configure build settings:
   - Build command: (leave blank for static site)
   - Publish directory: `/`
4. Add environment variables:
   - `CONTENTFUL_SPACE_ID`: Your Contentful space ID
   - `CONTENTFUL_ACCESS_TOKEN`: Your Contentful Content Delivery API access token
5. Click "Deploy site".
6. Once deployed, your site will be available at a Netlify subdomain (e.g., `your-site-name.netlify.app`).
7. You can set up a custom domain in the Netlify settings if desired.

### Updating Content

1. Log in to your Contentful account.
2. Navigate to your space.
3. Add, edit, or delete content as needed.
4. Changes will be automatically reflected on your website after a few minutes.

## Project Structure

- `index.html`: Main homepage
- `pages/`: Individual page templates
- `articles/`: Article page templates
- `assets/`: Static assets
  - `css/`: Stylesheets
  - `js/`: JavaScript files
  - `images/`: Image files
- `netlify.toml`: Netlify configuration file

## Environment Variables

The following environment variables are required for the Contentful integration:

- `CONTENTFUL_SPACE_ID`: Your Contentful space ID
- `CONTENTFUL_ACCESS_TOKEN`: Your Contentful Content Delivery API access token

These variables are configured in the `netlify.toml` file for Netlify deployment.

## Troubleshooting

- If content is not loading, check your Contentful space ID and access token.
- If the site is not deploying correctly, check your Netlify build settings.
- For local development issues, ensure you have the correct environment variables set.
- If mobile navigation links are not clickable, verify that the overlay has `pointer-events: none` in the CSS.

## License

All rights reserved. This project is proprietary and confidential.

© 2025 Fershman Financial
