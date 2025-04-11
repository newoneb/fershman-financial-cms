/**
 * MD to JSON Converter (Node.js version)
 * Server-side script to convert Markdown files to JSON for Fershman Financial CMS
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Main function to convert all markdown files to JSON
function convertMarkdownToJson(contentDir) {
    console.log('Starting server-side markdown to JSON conversion process...');
    
    try {
        const articlesDir = path.join(contentDir, 'articles');
        
        // Ensure the articles directory exists
        if (!fs.existsSync(articlesDir)) {
            console.error(`Articles directory not found: ${articlesDir}`);
            return false;
        }
        
        // Get all markdown files
        const mdFiles = fs.readdirSync(articlesDir)
            .filter(file => file.endsWith('.md'))
            .map(file => path.join(articlesDir, file));
        
        console.log(`Found ${mdFiles.length} markdown files`);
        
        // Process each markdown file
        const articleData = [];
        for (const mdFile of mdFiles) {
            try {
                // Read the file content
                const content = fs.readFileSync(mdFile, 'utf8');
                
                // Parse the front matter
                const { data: frontMatter, content: markdownContent } = matter(content);
                
                // Extract the slug from the filename
                const slug = path.basename(mdFile, '.md');
                
                // Create the article data
                const article = {
                    title: frontMatter.title || 'Untitled',
                    author: frontMatter.author || 'Anonymous',
                    date: frontMatter.date ? frontMatter.date.toISOString() : new Date().toISOString(),
                    category: frontMatter.category || 'Markets',
                    slug: slug,
                    featuredImage: frontMatter.thumbnail || '/assets/images/default-thumbnail.jpg',
                    summary: frontMatter.summary || 'No summary available'
                };
                
                // Save the article data as JSON
                const jsonFilePath = path.join(articlesDir, `${slug}.json`);
                fs.writeFileSync(
                    jsonFilePath,
                    JSON.stringify(article, null, 2),
                    'utf8'
                );
                
                console.log(`Created JSON file: ${jsonFilePath}`);
                
                articleData.push(article);
            } catch (error) {
                console.error(`Error processing markdown file ${mdFile}:`, error);
            }
        }
        
        // Sort articles by date (newest first)
        articleData.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Update the index.json file
        const indexFilePath = path.join(articlesDir, 'index.json');
        fs.writeFileSync(
            indexFilePath,
            JSON.stringify({ articles: articleData }, null, 2),
            'utf8'
        );
        
        console.log(`Updated index.json with ${articleData.length} articles`);
        
        return true;
    } catch (error) {
        console.error('Error in server-side markdown to JSON conversion:', error);
        return false;
    }
}

// If this script is run directly
if (require.main === module) {
    // Get the content directory from command line arguments or use default
    const contentDir = process.argv[2] || path.join(process.cwd(), 'content');
    
    console.log(`Using content directory: ${contentDir}`);
    
    // Run the conversion
    const result = convertMarkdownToJson(contentDir);
    
    // Exit with appropriate code
    process.exit(result ? 0 : 1);
} else {
    // Export the function for use in other scripts
    module.exports = { convertMarkdownToJson };
}
