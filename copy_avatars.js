const fs = require('fs');
const path = require('path');

const sourceDir = 'C:/Users/HP/.gemini/antigravity/brain/tempmediaStorage';
const destDir = 'C:/Users/HP/.gemini/antigravity/scratch/nexafyrez-website/public';

try {
  const files = fs.readdirSync(sourceDir);
  console.log('Files found:', files);
  
  if (files.length > 0) {
    // Map them based on timestamps or manually if we know the order.
    // We'll just copy them with generic names and we'll use them in React.
    files.forEach((file, index) => {
      fs.copyFileSync(path.join(sourceDir, file), path.join(destDir, `team_img_${index}.png`));
      console.log(`Copied ${file} to public/team_img_${index}.png`);
    });
  }
} catch (e) {
  console.error('Error copying files:', e.message);
}
