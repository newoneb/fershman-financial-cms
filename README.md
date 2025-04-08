# Fershman Financial Website

A premium, high-end landing page for an elite economic journal with modern 3D and interactive elements.

## Features

- Immersive hero section with animated text reveal
- Interactive navigation with glassmorphism effect
- Live market data ticker with animated updates
- Interactive data visualization with charts
- 3D hover effects and animations
- Premium subscription CTA
- Dark/light mode toggle
- Responsive design for all devices
- Contentful CMS integration

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Contentful account

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/fershman-financial.git
cd fershman-financial
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory with the following variables:
```
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
```

4. Start the development server
```bash
npm run dev
```

## Contentful CMS Setup

### Content Models

1. **Article**
   - Title (Short text)
   - Slug (Short text)
   - Category (Short text with predefined values: Markets, Analysis, Policy & Regulation, Opinion)
   - Publication Date (Date & time)
   - Author (Reference to Author)
   - Featured Image (Media)
   - Excerpt (Long text)
   - Content (Rich text)
   - Is Premium (Boolean)

2. **Author**
   - Name (Short text)
   - Title (Short text)
   - Image (Media)
   - Bio (Long text)

3. **Market Data**
   - Symbol (Short text)
   - Value (Number)
   - Change Percentage (Number)
   - Direction (Short text with predefined values: up, down)

4. **Expert Opinion**
   - Quote (Long text)
   - Author Name (Short text)
   - Author Title (Short text)
   - Author Image (Media)

5. **Featured Analysis**
   - Title (Short text)
   - Category (Short text)
   - Summary (Long text)
   - Link to Article (Short text)
   - Is Premium (Boolean)

### Setting Up Contentful

1. Create a new space in Contentful
2. Create the content models as described above
3. Add sample content for each model
4. Get your Space ID and Content Delivery API access token from Settings > API keys

## Deployment

### Netlify Deployment

1. Push your code to a GitHub repository
2. Log in to Netlify and click "New site from Git"
3. Connect your GitHub repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist` or `build`
5. Add environment variables:
   - CONTENTFUL_SPACE_ID
   - CONTENTFUL_ACCESS_TOKEN
6. Click "Deploy site"

### Custom Domain Setup

1. In Netlify, go to Site settings > Domain management
2. Add your custom domain
3. Configure DNS settings as instructed by Netlify
4. Enable HTTPS

## Managing Content

### Adding New Articles

1. Log in to your Contentful account
2. Go to Content > Add entry > Article
3. Fill in all required fields
4. Use the rich text editor for the content
5. Set the publication date and category
6. Publish the article

### Updating Market Data

1. Log in to your Contentful account
2. Go to Content > Market Data
3. Edit existing entries or add new ones
4. Publish changes

### Managing Expert Opinions

1. Log in to your Contentful account
2. Go to Content > Expert Opinion
3. Edit existing entries or add new ones
4. Publish changes

## Development

### File Structure

```
fershman-financial/
├── assets/
│   ├── css/
│   │   ├── styles.css
│   │   └── mobile.css
│   ├── js/
│   │   ├── main.js
│   │   └── contentful.js
│   └── images/
│       └── logo.png
├── pages/
│   ├── markets.html
│   ├── analysis.html
│   ├── policy.html
│   ├── opinion.html
│   └── about.html
├── articles/
│   └── article-template.html
├── index.html
├── package.json
├── webpack.config.js
├── netlify.toml
└── README.md
```

### Building for Production

```bash
npm run build
```

This will create a `dist` or `build` directory with optimized files for production.

## Customization

### Changing Colors

The color scheme can be modified in `assets/css/styles.css`:

```css
:root {
  --bg-primary: #000000; /* Jet Black */
  --text-primary: #FFFFF0; /* Ivory White */
  --accent: #ef291d; /* Accent Red */
  /* Other color variables */
}
```

### Adding New Pages

1. Create a new HTML file in the root or pages directory
2. Copy the structure from an existing page
3. Update the content and metadata
4. Link to the new page from the navigation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Font Awesome for icons
- Chart.js for data visualization
- Contentful for content management
- Netlify for hosting and deployment
