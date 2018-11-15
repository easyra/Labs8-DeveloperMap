const cors = require('cors');
const bodyParser = require('body-parser');

const CORS_WHITELIST = require('./constants/frontend');

const corsOptions = {
  origin: (origin, callback) =>
    (CORS_WHITELIST.indexOf(origin) !== -1)
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS'))
};

const configureServer = server => {
  server.use(cors(corsOptions));     // body-parser middleware to parse your incoming requests rather than parsing them yourself

  server.use(bodyParser.json());
};

module.exports = configureServer;