# Contentful Integration Guide for Fershman Financial

This guide will help you set up your Fershman Financial website with Contentful CMS integration, allowing you to update content without coding knowledge.

## Files Overview

1. **contentful.js** - Contains the Contentful API integration code
2. **main-contentful.js** - Modified main JavaScript file that fetches content from Contentful
3. **package.json** - Defines project dependencies including Contentful SDK
4. **webpack.config.js** - Configuration for building the project

## Step 1: Set Up Contentful Content Models

Log in to your Contentful account (marchenkoeliazar@gmail.com) and create the following content models:

### Article Content Model
1. Go to "Content model" in the top navigation
2. Click "Add content type"
3. Name it "Article"
4. Add these fields:
   - Title (Short text)
   - Author (Short text)
   - Publication Date (Date & time)
   - Category (Short text with predefined values: Markets, Analysis, Policy & Regulation, Opinion)
   - Featured Image (Media)
   - Content Body (Rich text)
   - Summary (Long text)
   - Premium Flag (Boolean)

### Market Data Model
1. Create another content type named "MarketData"
2. Add these fields:
   - Symbol (Short text)
   - Value (Number)
   - Change Percentage (Number)
   - Direction (Short text with predefined values: up, down)

### Expert Opinion Model
1. Create a content type named "ExpertOpinion"
2. Add these fields:
   - Quote Text (Long text)
   - Author Name (Short text)
   - Author Title (Short text)
   - Author Image (Media)

### Featured Analysis Model
1. Create a content type named "FeaturedAnalysis"
2. Add these fields:
   - Title (Short text)
   - Category (Short text)
   - Summary (Long text)
   - Link to Full Article (Short text)
   - Premium Status (Boolean)

## Step 2: Get Your Contentful API Keys

1. In Contentful, go to Settings > API keys
2. Create a new API key or use an existing one
3. Copy the "Space ID" and "Content Delivery API - access token"
4. Replace the placeholders in contentful.js with your actual values:
   ```javascript
   const client = contentful.createClient({
     space: 'YOUR_SPACE_ID', // Replace with your Space ID
     accessToken: 'YOUR_ACCESS_TOKEN', // Replace with your Access Token
   });
   ```

## Step 3: Create GitHub Repository

1. Go to github.com and sign in
2. Click the "+" icon in the top-right corner and select "New repository"
3. Name it "fershman-financial-cms"
4. Make it public or private as you prefer
5. Click "Create repository"

## Step 4: Upload Files to GitHub

1. Clone the repository to your local machine or use GitHub's web interface
2. Upload all files from your Fershman Financial website
3. Add the new files (contentful.js, main-contentful.js, package.json, webpack.config.js)
4. Update your index.html to use the bundled JavaScript:
   ```html
   <!-- Replace the original script tag -->
   <!-- <script src="assets/js/main.js"></script> -->
   
   <!-- Add this instead -->
   <script src="dist/bundle.js"></script>
   ```
5. Commit and push the changes

## Step 5: Set Up Netlify Deployment

1. Sign up/log in to Netlify (netlify.com)
2. Click "New site from Git"
3. Connect your GitHub account and select your repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add these environment variables:
   - CONTENTFUL_SPACE_ID: (Your Contentful space ID)
   - CONTENTFUL_ACCESS_TOKEN: (Your Contentful access token)
6. Click "Deploy site"

## Step 6: Connect Your Domain

1. In Netlify, go to Site settings > Domain management
2. Add your custom domain: fershman.com
3. Update your domain's DNS settings as instructed by Netlify
4. Enable HTTPS once DNS is verified

## Step 7: Set Up Automatic Deployment

1. In Netlify: Site settings > Build & deploy > Build hooks
2. Create a new build hook named "Contentful Publish"
3. Copy the URL
4. In Contentful: Settings > Webhooks
5. Create a webhook with the Netlify build hook URL
6. Set to trigger on Publish/Unpublish events

## Using Contentful to Update Your Website

Once everything is set up, you can update your website by:

1. Log in to Contentful
2. Create or edit content (articles, market data, expert opinions, etc.)
3. Publish your changes
4. Netlify will automatically rebuild your site with the new content

## Troubleshooting

If you encounter any issues:

1. Check that your Contentful Space ID and Access Token are correct
2. Verify that your content models match the expected structure
3. Check Netlify build logs for any errors
4. Ensure your webhook is properly configured

## Need Help?

If you need assistance with any part of this process, please reach out for support.
