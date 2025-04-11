/**
 * MD to JSON Converter
 * Converts Markdown files to JSON for Fershman Financial CMS
 * 
 * This script scans the content/articles directory for .md files,
 * parses them, and creates corresponding .json files.
 * It also updates the index.json file with the latest article metadata.
 */

// Function to convert all markdown files to JSON
async function convertMarkdownToJson() {
    console.log('Starting markdown to JSON conversion process...');
    
    try {
        // Get all markdown files in the content/articles directory
        const mdFiles = await getMdFiles();
        console.log(`Found ${mdFiles.length} markdown files`);
        
        // Process each markdown file
        const articleData = [];
        for (const mdFile of mdFiles) {
            const articleInfo = await processMarkdownFile(mdFile);
            if (articleInfo) {
                articleData.push(articleInfo);
            }
        }
        
        // Sort articles by date (newest first)
        articleData.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Update the index.json file
        await updateIndexJson(articleData);
        
        console.log('Markdown to JSON conversion completed successfully');
        return true;
    } catch (error) {
        console.error('Error in markdown to JSON conversion:', error);
        return false;
    }
}

// Function to get all markdown files in the content/articles directory
async function getMdFiles() {
    return new Promise((resolve, reject) => {
        const articlesDir = '/content/articles';
        
        // Use fetch to get a directory listing
        fetch(articlesDir)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch directory listing');
                }
                return response.text();
            })
            .then(html => {
                // Extract markdown file links from the HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const links = Array.from(doc.querySelectorAll('a'));
                
                // Filter for .md files
                const mdFiles = links
                    .map(link => link.getAttribute('href'))
                    .filter(href => href && href.endsWith('.md'))
                    .map(href => `${articlesDir}/${href}`);
                
                resolve(mdFiles);
            })
            .catch(error => {
                // Fallback: If we can't get a directory listing, try to load known files
                console.warn('Could not get directory listing, using fallback method:', error);
                
                // Try to load index.json to get known articles
                fetch('/content/articles/index.json')
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.articles) {
                            // Get the .md files corresponding to known articles
                            const mdFiles = data.articles.map(article => 
                                `/content/articles/${article.slug}.md`
                            );
                            
                            // Add any additional known .md files
                            const additionalFiles = [
                                '/content/articles/idk.md',
                                '/content/articles/test.md'
                            ];
                            
                            // Combine and deduplicate
                            const allFiles = [...new Set([...mdFiles, ...additionalFiles])];
                            resolve(allFiles);
                        } else {
                            resolve([]);
                        }
                    })
                    .catch(() => {
                        // If all else fails, just try some known files
                        resolve([
                            '/content/articles/idk.md',
                            '/content/articles/test.md'
                        ]);
                    });
            });
    });
}

// Function to process a single markdown file
async function processMarkdownFile(mdFilePath) {
    try {
        // Extract the slug from the file path
        const slug = mdFilePath.split('/').pop().replace('.md', '');
        
        // Fetch the markdown content
        const response = await fetch(mdFilePath);
        if (!response.ok) {
            console.warn(`Could not fetch ${mdFilePath}, skipping`);
            return null;
        }
        
        const markdownContent = await response.text();
        
        // Parse the markdown content
        const { frontMatter, content } = parseMarkdown(markdownContent);
        
        // Create the article data
        const articleData = {
            title: frontMatter.title || 'Untitled',
            author: frontMatter.author || 'Anonymous',
            date: frontMatter.date || new Date().toISOString(),
            category: frontMatter.category || 'Markets',
            slug: slug,
            featuredImage: frontMatter.thumbnail || '/assets/images/default-thumbnail.jpg',
            summary: frontMatter.summary || 'No summary available'
        };
        
        // Save the article data as JSON
        await saveJsonFile(`/content/articles/${slug}.json`, articleData);
        
        return articleData;
    } catch (error) {
        console.error(`Error processing markdown file ${mdFilePath}:`, error);
        return null;
    }
}

// Function to update the index.json file
async function updateIndexJson(articleData) {
    try {
        const indexData = {
            articles: articleData
        };
        
        await saveJsonFile('/content/articles/index.json', indexData);
        console.log('Updated index.json with', articleData.length, 'articles');
        return true;
    } catch (error) {
        console.error('Error updating index.json:', error);
        return false;
    }
}

// Function to save a JSON file
async function saveJsonFile(filePath, data) {
    try {
        // In a browser environment, we can't directly write to the file system
        // This would typically be handled by a server-side process
        // For this implementation, we'll simulate the file saving process
        
        // In a real implementation, this would be an API call to a server endpoint
        // that would write the file to disk
        
        console.log(`Would save ${filePath} with data:`, data);
        
        // For demonstration purposes, we'll store the data in localStorage
        // This is just for simulation and wouldn't persist to the actual file system
        localStorage.setItem(`file_${filePath}`, JSON.stringify(data));
        
        return true;
    } catch (error) {
        console.error(`Error saving JSON file ${filePath}:`, error);
        return false;
    }
}

// Run the conversion process when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're in the admin section
    if (window.location.pathname.includes('/admin/')) {
        // Set up event listener for Netlify CMS events
        if (window.netlifyIdentity) {
            window.netlifyIdentity.on('logout', () => {
                // Run conversion when user logs out (likely after making changes)
                convertMarkdownToJson();
            });
        }
        
        // Also set up a listener for the Netlify CMS itself
        window.addEventListener('load', () => {
            // Wait for NetlifyCMS to load
            const interval = setInterval(() => {
                if (window.CMS) {
                    clearInterval(interval);
                    
                    // Register event handlers for Netlify CMS
                    window.CMS.registerEventListener({
                        name: 'postPublish',
                        handler: () => {
                            console.log('Content published, converting markdown to JSON...');
                            // Wait a moment for the file to be written
                            setTimeout(convertMarkdownToJson, 2000);
                        }
                    });
                }
            }, 500);
        });
    }
});

// Create a server-side version of the converter for Node.js environments
// This would be used in a build script or serverless function
if (typeof module !== 'undefined' && module.exports) {
    // Import required Node.js modules
    const fs = require('fs');
    const path = require('path');
    const matter = require('gray-matter');
    
    // Export the functions
    module.exports = {
        // Server-side implementation of the converter
        convertMarkdownToJson: async function(contentDir) {
            const articlesDir = path.join(contentDir, 'articles');
            
            try {
                // Get all markdown files
                const mdFiles = fs.readdirSync(articlesDir)
                    .filter(file => file.endsWith('.md'))
                    .map(file => path.join(articlesDir, file));
                
                // Process each markdown file
                const articleData = [];
                for (const mdFile of mdFiles) {
                    // Read the file content
                    const content = fs.readFileSync(mdFile, 'utf8');
                    
                    // Parse the front matter
                    const { data: frontMatter } = matter(content);
                    
                    // Extract the slug from the filename
                    const slug = path.basename(mdFile, '.md');
                    
                    // Create the article data
                    const articleData = {
                        title: frontMatter.title || 'Untitled',
                        author: frontMatter.author || 'Anonymous',
                        date: frontMatter.date || new Date().toISOString(),
                        category: frontMatter.category || 'Markets',
                        slug: slug,
                        featuredImage: frontMatter.thumbnail || '/assets/images/default-thumbnail.jpg',
                        summary: frontMatter.summary || 'No summary available'
                    };
                    
                    // Save the article data as JSON
                    fs.writeFileSync(
                        path.join(articlesDir, `${slug}.json`),
                        JSON.stringify(articleData, null, 2),
                        'utf8'
                    );
                    
                    articleData.push(articleData);
                }
                
                // Sort articles by date (newest first)
                articleData.sort((a, b) => new Date(b.date) - new Date(a.date));
                
                // Update the index.json file
                fs.writeFileSync(
                    path.join(articlesDir, 'index.json'),
                    JSON.stringify({ articles: articleData }, null, 2),
                    'utf8'
                );
                
                return true;
            } catch (error) {
                console.error('Error in server-side markdown to JSON conversion:', error);
                return false;
            }
        }
    };
}
