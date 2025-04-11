# Fershman Financial Website

A premium financial news and analysis website with Decap CMS integration.

## Overview

Fershman Financial is a modern, responsive website designed to deliver premium economic intelligence and financial analysis. The site features a clean, light theme design with a red accent color and includes a fully integrated content management system (Decap CMS) for easy article publishing.

## Features

- **Light Theme Design**: Clean white background with black text and red accent color (#ef291d)
- **Responsive Layout**: Optimized for all device sizes from mobile to desktop
- **Decap CMS Integration**: Easy content management through the /admin interface
- **Markdown Support**: Write articles in Markdown with frontmatter for metadata
- **Category Pages**: Dedicated pages for Markets, Analysis, Policy & Regulation, and Opinion
- **Dynamic Market Ticker**: Displays realistic market data across the site
- **Modern About Page**: Includes team information, approach, and contact details with icons

## Getting Started

### Local Development

1. Clone this repository to your local machine
2. Navigate to the project directory
3. Open the files in your preferred code editor
4. For local testing, you can use a simple HTTP server:
   ```
   python -m http.server 8000
   ```
5. Visit `http://localhost:8000` in your browser

### Deployment to Netlify

1. Push this repository to your GitHub account
2. Log in to [Netlify](https://www.netlify.com/)
3. Click "New site from Git" and select your repository
4. Use the following build settings:
   - Build command: (leave blank)
   - Publish directory: `.`
5. Click "Deploy site"

### Setting Up Netlify Identity and Git Gateway

1. Once your site is deployed, go to the Netlify dashboard
2. Navigate to Site settings > Identity
3. Click "Enable Identity"
4. Under Registration preferences, select "Invite only"
5. Navigate to Services > Git Gateway
6. Click "Enable Git Gateway"
7. Invite yourself as a user via the Identity tab

## Content Management

### Accessing the Admin Panel

1. Navigate to `yourdomain.com/admin` in your browser
2. Log in using your Netlify Identity credentials
3. You'll see the Decap CMS dashboard

### Creating a New Article

1. In the admin panel, click on "Articles" in the sidebar
2. Click the "New Article" button
3. Fill in the following fields:
   - Title: The article title
   - Author: Your name or the author's name
   - Date: Publication date (auto-filled with current date)
   - Category: Choose from Markets, Analysis, Policy & Regulation, or Opinion
   - Featured Image: Upload an image for the article
   - Summary: A brief description (appears in article cards)
   - Content: The main article content (supports Markdown)
4. Click "Publish" to make the article live

### Editing Existing Articles

1. In the admin panel, click on "Articles" in the sidebar
2. Select the article you want to edit from the list
3. Make your changes
4. Click "Publish" to update the article

## File Structure

```
fershman-financial/
├── admin/                  # Decap CMS admin panel
│   ├── index.html          # Admin panel HTML
│   └── config.yml          # CMS configuration
├── articles/               # Article template
│   └── article-template.html  # Template for individual articles
├── assets/                 # Static assets
│   ├── css/                # Stylesheets
│   ├── images/             # Images
│   └── js/                 # JavaScript files
├── content/                # Content files
│   └── articles/           # Markdown articles
├── pages/                  # Category pages
│   ├── about.html          # About page
│   ├── analysis.html       # Analysis category page
│   ├── markets.html        # Markets category page
│   ├── opinion.html        # Opinion category page
│   └── policy.html         # Policy & Regulation category page
├── index.html              # Homepage
└── netlify.toml            # Netlify configuration
```

## Customization

### Changing Colors

To modify the color scheme, edit the following files:

- `assets/css/theme.css`: Contains theme variables and color definitions
- `assets/css/styles.css`: Contains additional styling

### Adding New Pages

1. Create a new HTML file in the appropriate directory
2. Copy the structure from an existing page
3. Update the content and navigation as needed
4. Add any necessary links in the navigation menu

### Modifying the Navigation

To update the navigation menu, edit the `<nav>` section in each HTML file.

## Troubleshooting

### Articles Not Appearing

If articles aren't appearing on the site:

1. Check that the article has been published (not in draft mode)
2. Verify the article's category matches one of the predefined categories
3. Ensure the article's markdown file exists in `/content/articles/`
4. Check that the article is included in the `index.json` file

### CMS Access Issues

If you can't access the CMS:

1. Verify Netlify Identity is enabled
2. Check that Git Gateway is enabled
3. Ensure you've been invited and have accepted the invitation
4. Clear your browser cache and try again

## Support

For additional support or questions, please contact the development team.

---

© 2025 Fershman Financial. All rights reserved.
