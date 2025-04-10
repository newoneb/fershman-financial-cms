# Fershman Financial CMS

A modern financial news website with Decap CMS integration for content management.

## Overview

Fershman Financial is a premium economic journal website that provides financial analysis and insights. This repository contains the complete codebase for the website, including the Decap CMS integration for managing article content.

## Features

- Clean, modern design with responsive layout
- Category-based article organization (Markets, Analysis, Policy & Regulation, Opinion)
- Decap CMS integration for content management
- Markdown-based article system
- Netlify Identity for secure admin access

## Getting Started

### Prerequisites

- Node.js (for local development)
- Git
- Netlify account (for deployment)

### Local Development

1. Clone the repository:
```
git clone https://github.com/yourusername/fershman-financial-cms.git
cd fershman-financial-cms
```

2. Open `index.html` in your browser to view the site locally.

### Deployment

This site is designed to be deployed on Netlify:

1. Push the repository to GitHub.
2. Create a new site on Netlify and connect it to your GitHub repository.
3. Configure the following settings in Netlify:
   - Build command: (leave blank)
   - Publish directory: `/`
4. Enable Netlify Identity:
   - Go to Site settings > Identity > Enable Identity
   - Set registration to "Invite only"
   - Enable Git Gateway
5. Invite users to the CMS:
   - Go to Identity tab in Netlify dashboard
   - Click "Invite users" and enter email addresses

## Content Management

### Accessing the Admin Panel

The admin panel is available at `/admin/` (e.g., `https://yoursite.netlify.app/admin/`).

### Creating Articles

1. Log in to the admin panel.
2. Click "New Article" button.
3. Fill in the following fields:
   - Title: The article title
   - Author: The author's name
   - Date: Publication date and time
   - Category: Select from Markets, Analysis, Policy & Regulation, or Opinion
   - Featured Image: Upload an image to be displayed with the article
   - Summary: A brief summary of the article (appears in article cards)
   - Content: The main article content (supports Markdown formatting)
4. Click "Publish" to make the article live.

### Markdown Formatting

The content editor supports Markdown formatting:

- `# Heading 1`, `## Heading 2`, etc. for headings
- `*italic*` for italic text
- `**bold**` for bold text
- `[Link text](https://example.com)` for links
- `![Alt text](image-url.jpg)` for images
- `> Quote text` for blockquotes
- `- Item` for unordered lists
- `1. Item` for ordered lists

## File Structure

```
/
├── admin/                  # Decap CMS admin panel
│   ├── index.html          # Admin panel entry point
│   └── config.yml          # CMS configuration
├── articles/               # Article templates
│   └── article-template.html  # Template for article pages
├── assets/                 # Static assets
│   ├── css/                # Stylesheets
│   ├── images/             # Images
│   │   └── uploads/        # User-uploaded images
│   └── js/                 # JavaScript files
│       ├── articleLoader.js    # Article loading functionality
│       ├── articleRouter.js    # Article routing functionality
│       ├── markdownParser.js   # Markdown parsing functionality
│       ├── netlifyIdentity.js  # Netlify Identity integration
│       └── main.js             # Main JavaScript functionality
├── content/                # Content files
│   └── articles/           # Markdown article files
│       ├── index.json      # Article index
│       └── *.md            # Individual article files
├── pages/                  # Category pages
├── index.html              # Homepage
├── netlify.toml            # Netlify configuration
└── README.md               # Documentation
```

## Customization

### Styling

The site's styles are located in `assets/css/`. The main stylesheet is `styles.css`, with mobile-specific styles in `mobile.css`.

### Adding Pages

To add a new page:
1. Create a new HTML file in the root directory or `pages/` directory.
2. Copy the structure from an existing page, including the header and footer.
3. Update the navigation links in all pages to include the new page.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Font Awesome for icons
- Netlify for hosting and identity services
- Decap CMS for content management
