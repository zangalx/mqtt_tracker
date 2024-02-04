const express = require('express');
const app = express();
app.use(express.static('./dist/friendtracker/browser'));
app.get('/*', (req, res) =>
 res.sendFile('index.html', {root: 'dist/friendtracker/browser/'}),
);
app.listen(process.env.PORT || 8080);