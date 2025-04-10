// Markdown parser for Fershman Financial
// This file handles parsing markdown files and converting them to HTML

// Function to parse frontmatter and markdown content
async function parseMarkdownFile(filePath) {
  try {
    // Fetch the markdown file
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch markdown file: ${response.status} ${response.statusText}`);
    }
    
    const text = await response.text();
    
    // Parse frontmatter and content
    const { frontmatter, content } = parseFrontmatter(text);
    
    // Convert markdown content to HTML
    const htmlContent = markdownToHtml(content);
    
    return {
      ...frontmatter,
      content: htmlContent
    };
  } catch (error) {
    console.error('Error parsing markdown file:', error);
    return null;
  }
}

// Function to parse frontmatter from markdown text
function parseFrontmatter(text) {
  // Check if the text starts with frontmatter delimiter
  if (!text.startsWith('---')) {
    return {
      frontmatter: {},
      content: text
    };
  }
  
  // Find the end of the frontmatter section
  const endIndex = text.indexOf('---', 3);
  if (endIndex === -1) {
    return {
      frontmatter: {},
      content: text
    };
  }
  
  // Extract frontmatter and content
  const frontmatterText = text.substring(3, endIndex).trim();
  const content = text.substring(endIndex + 3).trim();
  
  // Parse frontmatter as YAML
  const frontmatter = parseFrontmatterYaml(frontmatterText);
  
  return {
    frontmatter,
    content
  };
}

// Simple YAML parser for frontmatter
function parseFrontmatterYaml(text) {
  const frontmatter = {};
  
  // Split into lines and process each line
  const lines = text.split('\n');
  
  for (const line of lines) {
    // Skip empty lines
    if (!line.trim()) continue;
    
    // Find the first colon that separates key and value
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    
    // Extract key and value
    const key = line.substring(0, colonIndex).trim();
    let value = line.substring(colonIndex + 1).trim();
    
    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.substring(1, value.length - 1);
    }
    
    frontmatter[key] = value;
  }
  
  return frontmatter;
}

// Convert markdown to HTML
function markdownToHtml(markdown) {
  // This is a simple markdown parser
  // For a production site, you would use a library like marked.js
  
  let html = markdown;
  
  // Convert headers
  html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  html = html.replace(/^#### (.*?)$/gm, '<h4>$1</h4>');
  html = html.replace(/^##### (.*?)$/gm, '<h5>$1</h5>');
  html = html.replace(/^###### (.*?)$/gm, '<h6>$1</h6>');
  
  // Convert bold and italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Convert links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  
  // Convert images
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');
  
  // Convert blockquotes
  html = html.replace(/^> (.*?)$/gm, '<blockquote><p>$1</p></blockquote>');
  
  // Convert unordered lists
  let inList = false;
  const lines = html.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^- (.*?)$/)) {
      if (!inList) {
        lines[i] = '<ul>\n<li>' + lines[i].replace(/^- (.*?)$/, '$1') + '</li>';
        inList = true;
      } else {
        lines[i] = '<li>' + lines[i].replace(/^- (.*?)$/, '$1') + '</li>';
      }
    } else if (inList) {
      lines[i - 1] += '\n</ul>';
      inList = false;
    }
  }
  
  if (inList) {
    lines[lines.length - 1] += '\n</ul>';
  }
  
  html = lines.join('\n');
  
  // Convert paragraphs (must be done last)
  html = html.replace(/^([^<].*?)$/gm, '<p>$1</p>');
  
  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/g, '');
  
  return html;
}

// Generate article index JSON file
async function generateArticleIndex() {
  try {
    // In a real implementation, this would scan the content/articles directory
    // For now, we'll return a placeholder
    return [
      {
        title: "Sample Article",
        slug: "sample-article",
        author: "John Doe",
        date: "2025-04-01",
        category: "Markets",
        thumbnail: "/assets/images/uploads/sample.jpg",
        summary: "This is a sample article summary."
      }
    ];
  } catch (error) {
    console.error('Error generating article index:', error);
    return [];
  }
}

// Export functions for use in other files
window.markdownParser = {
  parseMarkdownFile,
  generateArticleIndex
};
