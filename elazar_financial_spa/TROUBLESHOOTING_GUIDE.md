# Netlify Deployment Troubleshooting Guide

This guide provides step-by-step instructions to troubleshoot and fix common issues when deploying the Fershman Financial website to Netlify, particularly focusing on the "Page not found" error.

## Common Issues and Solutions

### Issue 1: "Page not found" Error on Routes

**Symptoms:**
- Landing page works at the root URL (fershman.com)
- Navigating directly to subpages (e.g., fershman.com/markets) shows a 404 error
- Refreshing the page on a subpage shows a 404 error

**Solution:**

1. **Verify netlify.toml Configuration:**
   - Ensure the netlify.toml file exists in the root of your repository
   - Confirm it contains the following redirect rule:
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```
   - This rule is crucial for SPA routing as it tells Netlify to serve the index.html file for all routes

2. **Check Netlify Deploy Settings:**
   - Go to your Netlify dashboard
   - Navigate to Site settings > Build & deploy > Continuous deployment
   - Verify the "Base directory" is correct (usually empty or ".")
   - Ensure "Build command" is set to `npm run build`
   - Confirm "Publish directory" is set to `dist`

3. **Force Redeploy:**
   - In your Netlify dashboard, go to the "Deploys" tab
   - Click "Trigger deploy" > "Clear cache and deploy site"
   - This ensures all configuration changes are applied

4. **Check for Deployment Success:**
   - After redeployment, check the deploy log for any errors
   - Verify that the netlify.toml file was included in the deployment

### Issue 2: Environment Variables Not Working

**Symptoms:**
- Website loads but shows no content from Contentful
- Console errors related to Contentful API

**Solution:**

1. **Verify Environment Variables in Netlify:**
   - Go to Site settings > Build & deploy > Environment
   - Ensure you have these variables set:
     - `CONTENTFUL_SPACE_ID`: Your Contentful space ID
     - `CONTENTFUL_ACCESS_TOKEN`: Your Contentful access token
   - If missing, add them and trigger a new deploy

2. **Check Contentful Integration Code:**
   - Verify that contentful.js is using environment variables correctly:
   ```javascript
   const client = contentful.createClient({
     space: process.env.CONTENTFUL_SPACE_ID,
     accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
   });
   ```
   - Ensure webpack is configured to handle environment variables

3. **Test Environment Variables Locally:**
   - Create a .env file locally with your Contentful credentials
   - Run the build process locally to verify it works
   - If it works locally but not on Netlify, the issue is with Netlify's environment setup

### Issue 3: Styling or JavaScript Not Loading

**Symptoms:**
- Page structure loads but appears unstyled
- Interactive elements don't work
- Console errors related to missing resources

**Solution:**

1. **Check Resource Paths:**
   - Ensure all CSS and JavaScript files use absolute paths starting with `/`
   - Example: `/assets/css/styles.css` instead of `assets/css/styles.css`
   - This ensures paths work correctly regardless of the current route

2. **Verify Build Output:**
   - Run the build process locally: `npm run build`
   - Check the dist directory to ensure all assets are being included
   - Verify that the HTML files reference the correct paths to assets

3. **Check for Console Errors:**
   - Open browser developer tools on your deployed site
   - Look for 404 errors in the Network tab
   - Fix any missing resource references

### Issue 4: Images Not Displaying

**Symptoms:**
- Page loads but images are missing
- Broken image icons appear

**Solution:**

1. **Check Image Paths:**
   - Ensure all image paths use absolute paths starting with `/`
   - Example: `/assets/images/ELAZAR.png` instead of `assets/images/ELAZAR.png`

2. **Verify Images in Build:**
   - Confirm that images are being copied to the dist directory during build
   - Check webpack.config.js to ensure it's configured to copy images

3. **Check Image Formats:**
   - Ensure images are in web-friendly formats (JPG, PNG, WebP, SVG)
   - Large images may be blocked by Netlify's size limits

## Step-by-Step Deployment Process

Follow these steps for a successful deployment:

1. **Prepare Your Repository:**
   - Ensure all files are committed to your GitHub repository
   - Verify the repository structure matches the expected layout
   - Confirm netlify.toml is in the root directory

2. **Connect to Netlify:**
   - Log in to Netlify
   - Click "New site from Git"
   - Select GitHub and authorize Netlify
   - Choose your repository

3. **Configure Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Show advanced" and add environment variables:
     - CONTENTFUL_SPACE_ID: (your space ID)
     - CONTENTFUL_ACCESS_TOKEN: (your access token)

4. **Deploy and Monitor:**
   - Click "Deploy site"
   - Watch the deployment logs for any errors
   - Once deployed, test all routes by directly navigating to them:
     - fershman.com
     - fershman.com/markets
     - fershman.com/analysis
     - fershman.com/policy
     - fershman.com/opinion
     - fershman.com/about
     - fershman.com/articles/some-slug

5. **Set Up Custom Domain:**
   - In Netlify, go to Site settings > Domain management
   - Click "Add custom domain"
   - Enter: fershman.com
   - Follow Netlify's instructions to update your DNS settings
   - Enable HTTPS once DNS is verified

## Advanced Troubleshooting

If you're still experiencing issues after following the steps above:

1. **Check Netlify Functions:**
   - If you're using Netlify Functions, ensure they're properly configured
   - Functions should be in a `functions` directory at the root

2. **Review Headers:**
   - Check if any custom headers in netlify.toml might be causing issues
   - Remove any potentially problematic headers temporarily

3. **Contact Netlify Support:**
   - If all else fails, Netlify support can help diagnose deployment issues
   - Provide them with your site name and deployment logs

4. **Consider a Simpler Deployment:**
   - As a temporary measure, you can deploy a simpler version without complex routing
   - Once that works, gradually add complexity back

## Testing Your Deployment

After deployment, test thoroughly:

1. **Cross-Browser Testing:**
   - Test in Chrome, Firefox, Safari, and Edge
   - Check mobile browsers as well

2. **Route Testing:**
   - Navigate directly to each route by typing the URL
   - Refresh the page on each route to ensure it still works
   - Test navigation between routes using the site's navigation

3. **Functionality Testing:**
   - Verify all interactive elements work
   - Test Contentful integration by creating test content
   - Check that new content appears on the site

By following this guide, you should be able to resolve the "Page not found" error and other common issues with deploying a single-page application to Netlify.
