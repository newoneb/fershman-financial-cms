# Fershman Financial Website

A premium multi-page economic journal website built with HTML, CSS, and JavaScript, using Decap CMS for content management.

## Features

- Responsive design for desktop and mobile devices
- Category-based article organization (Markets, Analysis, Policy & Regulation, Opinion)
- Markdown-based content management with Decap CMS
- Market ticker with realistic placeholder data
- Newsletter subscription form
- Clean, newspaper-style design with white background and black text

## Setup Instructions

### Local Development

1. Clone this repository to your local machine
2. Navigate to the project directory
3. Open the files in your preferred code editor
4. For local testing, you can use a simple HTTP server:
   ```
   python -m http.server 8000
   ```
5. Visit `http://localhost:8000` in your browser

### Netlify Deployment

1. Push this repository to GitHub
2. Create a new site in Netlify and connect it to your GitHub repository
3. Use the following build settings:
   - Build command: (leave blank)
   - Publish directory: `/`
4. Enable Netlify Identity and Git Gateway in the Netlify dashboard:
   - Go to Site settings > Identity > Enable Identity
   - Go to Site settings > Identity > Services > Enable Git Gateway
5. Invite users who will have access to the CMS

## Content Management

### Accessing the Admin Panel

1. Navigate to `yourdomain.com/admin/` to access the Decap CMS admin panel
2. Log in using Netlify Identity credentials
3. If you're a new user, you'll need to be invited by the site admin

### Creating and Editing Articles

1. From the admin panel, click on "Articles" in the sidebar
2. Click "New Article" to create a new article or select an existing one to edit
3. Fill in the required fields:
   - Title: The article title
   - Author: The author's name
   - Date: Publication date
   - Category: Select from Markets, Analysis, Policy & Regulation, or Opinion
   - Featured Image: Upload or select an image
   - Summary: A brief summary of the article (appears in article cards)
   - Content: The main article content (supports Markdown formatting)
4. Click "Publish" to make the article live or "Save" to save as a draft

### Customizing the Site

#### Branding

- To update the logo, replace `/assets/images/ELAZAR.png` with your own logo
- To change the site name, update the `<h1>FERSHMAN<span>FINANCIAL</span></h1>` elements in all HTML files

#### Styles

- Main styles are in `/assets/css/styles.css`
- Mobile-specific styles are in `/assets/css/mobile.css`
- Visual fixes and theme adjustments are in `/assets/css/fixes.css`

#### Adding New Pages

1. Create a new HTML file based on the existing page templates
2. Add the page to the navigation menu in all HTML files
3. Update the `netlify.toml` file if necessary for routing

## File Structure

- `/admin/` - Decap CMS configuration and admin interface
- `/articles/` - Article template files
- `/assets/` - CSS, JavaScript, and image files
- `/content/articles/` - Markdown content for articles
- `/pages/` - Category and static pages
- `index.html` - Homepage
- `netlify.toml` - Netlify configuration

## Troubleshooting

### Page Not Found Errors

If you encounter "Page Not Found" errors:
1. Check that the `netlify.toml` file has the correct redirects configuration
2. Verify that all internal links use the correct relative paths
3. Make sure the page files exist in the correct locations

### CMS Issues

If you have trouble with the CMS:
1. Verify that Netlify Identity and Git Gateway are enabled
2. Check that the `admin/config.yml` file has the correct configuration
3. Ensure that the repository has the necessary permissions for Netlify

## Support

For additional support or custom development, please contact the site administrator.
