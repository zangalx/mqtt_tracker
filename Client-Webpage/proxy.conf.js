require('dotenv').config();

module.exports = {
  '/api': {
    target: 'https://maps.googleapis.com',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/api': `/maps/api/js?key=${process.env.GOOGLE_MAPS_KEY}`
    }
  }
};