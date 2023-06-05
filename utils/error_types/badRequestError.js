const { BAD_REQUEST_CODE } = require('../status_codes');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST_CODE.code;
  }
}

module.exports = { BadRequestError };
