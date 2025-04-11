/**
 * Markdown Parser JavaScript
 * Parses markdown content for Fershman Financial articles
 */

// Function to parse markdown content with gray-matter
function parseMarkdown(markdown) {
    // Extract front matter if present
    let content = markdown;
    let frontMatter = {};
    
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
    const frontMatterMatch = markdown.match(frontMatterRegex);
    
    if (frontMatterMatch) {
        // Extract front matter content
        const frontMatterContent = frontMatterMatch[1];
        
        // Remove front matter from markdown content
        content = markdown.replace(frontMatterRegex, '');
        
        // Parse front matter
        frontMatterContent.split('\n').forEach(line => {
            const parts = line.split(':');
            if (parts.length >= 2) {
                const key = parts[0].trim();
                const value = parts.slice(1).join(':').trim();
                frontMatter[key] = value;
            }
        });
    }
    
    // Parse markdown to HTML
    const html = markdownToHtml(content);
    
    return {
        frontMatter,
        content: html
    };
}

// Function to convert markdown to HTML
function markdownToHtml(markdown) {
    let html = markdown;
    
    // Parse headings
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    
    // Parse bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Parse links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    
    // Parse images
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');
    
    // Parse blockquotes
    html = html.replace(/^>\s+(.*$)/gm, '<blockquote>$1</blockquote>');
    
    // Parse unordered lists
    let inList = false;
    const listLines = html.split('\n').map(line => {
        if (line.match(/^\s*[\-\*]\s+(.*)$/)) {
            const listItem = line.replace(/^\s*[\-\*]\s+(.*)$/, '<li>$1</li>');
            if (!inList) {
                inList = true;
                return '<ul>' + listItem;
            }
            return listItem;
        } else if (inList) {
            inList = false;
            return '</ul>\n' + line;
        }
        return line;
    });
    
    if (inList) {
        listLines.push('</ul>');
    }
    
    html = listLines.join('\n');
    
    // Parse ordered lists
    inList = false;
    const orderedListLines = html.split('\n').map(line => {
        if (line.match(/^\s*\d+\.\s+(.*)$/)) {
            const listItem = line.replace(/^\s*\d+\.\s+(.*)$/, '<li>$1</li>');
            if (!inList) {
                inList = true;
                return '<ol>' + listItem;
            }
            return listItem;
        } else if (inList) {
            inList = false;
            return '</ol>\n' + line;
        }
        return line;
    });
    
    if (inList) {
        orderedListLines.push('</ol>');
    }
    
    html = orderedListLines.join('\n');
    
    // Parse code blocks
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    
    // Parse inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Parse horizontal rules
    html = html.replace(/^\s*[\-=_]{3,}\s*$/gm, '<hr>');
    
    // Parse paragraphs (any line that doesn't start with a special character)
    const paragraphLines = html.split('\n').map(line => {
        if (line.trim() !== '' && 
            !line.startsWith('<h') && 
            !line.startsWith('<ul') && 
            !line.startsWith('</ul') && 
            !line.startsWith('<ol') && 
            !line.startsWith('</ol') && 
            !line.startsWith('<li') && 
            !line.startsWith('<blockquote') && 
            !line.startsWith('<pre') && 
            !line.startsWith('<hr')) {
            return '<p>' + line + '</p>';
        }
        return line;
    });
    
    html = paragraphLines.join('\n');
    
    return html;
}

// Function to extract metadata from markdown content
function extractMetadata(markdown) {
    const parsed = parseMarkdown(markdown);
    return parsed.frontMatter;
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        parseMarkdown,
        markdownToHtml,
        extractMetadata
    };
}
