const fs = require('fs');
const path = require('path');

// Get all files that need to be fixed
const { execSync } = require('child_process');

try {
  const output = execSync('grep -rl "params: {.*}" --include="*.tsx" app/', { encoding: 'utf-8' });
  const files = output.trim().split('\n');
  
  console.log(`Found ${files.length} files to fix`);
  
  files.forEach(file => {
    if (file) {
      try {
        const filePath = path.join(__dirname, file);
        let content = fs.readFileSync(filePath, 'utf-8');
        
        // Replace the pattern correctly
        const pattern = /(params\s*:\s*)(\{\s*[a-zA-Z0-9_]+\s*:\s*[a-zA-Z0-9_<>\\\s\[\]]+\s*\})/g;
        const updatedContent = content.replace(pattern, '$1Promise<$2>');
        
        if (content !== updatedContent) {
          fs.writeFileSync(filePath, updatedContent, 'utf-8');
          console.log(`Fixed: ${file}`);
        }
      } catch (error) {
        console.error(`Error fixing ${file}:`, error.message);
      }
    }
  });
  
  console.log('Done!');
} catch (error) {
  console.error('Error finding files:', error.message);
}