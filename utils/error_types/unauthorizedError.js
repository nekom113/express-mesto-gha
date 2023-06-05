const { UNAUTHORIZED_ERROR_CODE } = require('../status_codes');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_ERROR_CODE.code;
  }
}

module.exports = UnauthorizedError;
