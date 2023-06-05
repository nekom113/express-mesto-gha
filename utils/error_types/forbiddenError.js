const { FORBIDDEN_ERROR_CODE } = require('../status_codes');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_ERROR_CODE.code;
  }
}

module.exports = ForbiddenError;
