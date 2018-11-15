const FRONTEND_DEV_URLS = [ 'http://localhost:3000' ]; // I used localhost:3000 for front-end testing of Stripe

const FRONTEND_PROD_URLS = [
  'https://www.yourdomain.com',  // Can change these with production url down the road or before our next presentation
  'https://yourdomain.com'
];

module.exports = process.env.NODE_ENV === 'production'
  ? FRONTEND_PROD_URLS
  : FRONTEND_DEV_URLS;