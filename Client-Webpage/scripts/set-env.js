// scripts/set-env.js
require('dotenv').config({ path: '../.env'});
const fs = require('fs');
const path = require('path');

// Read the index.html file
const indexPath = path.join(__dirname, '../src/index.html');
const index = fs.readFileSync(indexPath, 'utf8');

// Replace the placeholder with the actual key
const result = index.replace('__GOOGLE_MAPS_KEY__', process.env.GOOGLE_MAPS_KEY);

// Write the result back to the index file
fs.writeFileSync(indexPath, result);
