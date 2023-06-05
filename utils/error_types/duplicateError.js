const { DUPLICATE_DATA_ERROR_CODE } = require('../status_codes');

class DuplicateDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = DUPLICATE_DATA_ERROR_CODE.code;
  }
}

module.exports = DuplicateDataError;
