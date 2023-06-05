const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const urlRegex = /^http(s)?:\/\/(www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]{1,256}\.[a-z]{1,6}\b[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*$/;

module.exports = { limiter, urlRegex };
