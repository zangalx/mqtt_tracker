const fs = require('fs');
const environment = require('./src/environments/environment');

console.log('Running replace-key.ts script...');

const indexHtml = fs.readFileSync('./src/index.html', 'utf8');
const updatedIndexHtml = indexHtml.replace('GOOGLE_MAPS_KEY', environment.GOOGLE_MAPS_KEY);
fs.writeFileSync('./src/index.html', updatedIndexHtml);

console.log('Updated index.html:', fs.readFileSync('./src/index.html', 'utf8'));
