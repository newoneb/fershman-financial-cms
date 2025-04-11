#!/usr/bin/env node

/**
 * Build script for Fershman Financial CMS
 * This script runs the MD to JSON conversion process
 */

const path = require('path');
const { convertMarkdownToJson } = require('./assets/js/mdToJsonConverterNode');

// Get the content directory
const contentDir = path.join(__dirname, 'content');

console.log('Running build script for Fershman Financial CMS');
console.log(`Content directory: ${contentDir}`);

// Run the conversion
const result = convertMarkdownToJson(contentDir);

if (result) {
  console.log('Build completed successfully');
} else {
  console.error('Build failed');
  process.exit(1);
}
