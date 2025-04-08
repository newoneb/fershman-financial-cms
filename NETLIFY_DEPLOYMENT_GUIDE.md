# Netlify Deployment Guide for Fershman Financial Website

This guide provides detailed instructions for deploying the Fershman Financial website to Netlify and connecting it to your custom domain.

## Prerequisites

- GitHub account with your forked repository
- Netlify account
- Your custom domain (fershman.com)
- Contentful account with API keys

## Step 1: Deploy to Netlify

1. **Sign in to Netlify**
   - Go to [netlify.com](https://www.netlify.com/) and sign in

2. **Create a new site**
   - Click "New site from Git"
   - Select GitHub as your Git provider
   - Authorize Netlify to access your GitHub account
   - Select your repository (fershman-financial-cms)

3. **Configure build settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Show advanced" and add environment variables:
     - `CONTENTFUL_SPACE_ID`: Your Contentful space ID
     - `CONTENTFUL_ACCESS_TOKEN`: Your Contentful access token

4. **Deploy the site**
   - Click "Deploy site"
   - Wait for the initial build to complete

## Step 2: Connect Your Custom Domain

1. **Add your custom domain**
   - Go to Site settings > Domain management
   - Click "Add custom domain"
   - Enter: fershman.com
   - Click "Verify"

2. **Configure DNS settings**
   - Netlify will provide DNS configuration instructions
   - Go to your domain registrar (where you purchased fershman.com)
   - Update the DNS settings as instructed by Netlify
   - This typically involves pointing your domain's nameservers to Netlify's nameservers
   - Alternatively, you can create CNAME records pointing to your Netlify site

3. **Enable HTTPS**
   - Once DNS is verified, go to HTTPS section
   - Click "Verify DNS configuration"
   - Enable "Provision Let's Encrypt certificate"

## Step 3: Troubleshooting Common Issues

### "Page Not Found" Error

If you see a "Page not found" error when visiting your site:

1. **Check the netlify.toml file**
   - Ensure the netlify.toml file is in the root of your repository
   - Verify it contains the correct redirects configuration:
   ```
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Verify build settings**
   - Go to Site settings > Build & deploy > Continuous Deployment
   - Ensure the publish directory is set to `dist`
   - Check that the build command is `npm run build`

3. **Check build logs**
   - Go to Deploys tab
   - Click on the latest deploy
   - Review the build logs for any errors

4. **Force a new deploy**
   - Go to Deploys tab
   - Click "Trigger deploy" > "Deploy site"

## Step 4: Set Up Contentful Webhooks

To automatically rebuild your site when content changes in Contentful:

1. **Create a build hook in Netlify**
   - Go to Site settings > Build & deploy > Build hooks
   - Click "Add build hook"
   - Name it "Contentful Publish"
   - Select the branch to build (usually "main" or "master")
   - Copy the generated URL

2. **Add webhook in Contentful**
   - Go to your Contentful space
   - Navigate to Settings > Webhooks
   - Click "Add webhook"
   - Name it "Netlify Build"
   - Paste the Netlify build hook URL
   - Under "Triggers", select the events you want to trigger builds (typically "Publish" and "Unpublish")
   - Save the webhook

## Additional Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Troubleshooting Netlify Deployments](https://docs.netlify.com/site-deploys/troubleshooting-tips/)
- [Custom Domains on Netlify](https://docs.netlify.com/domains-https/custom-domains/)
- [Contentful Webhooks Documentation](https://www.contentful.com/developers/docs/concepts/webhooks/)
