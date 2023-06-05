const { NOT_FOUND_ERROR_CODE } = require('../status_codes');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_ERROR_CODE.code;
  }
}

module.exports = NotFoundError;
