const { NOT_FOUND_ERROR_CODE } = require('../status_codes');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Страница не найдена';
    this.statusCode = NOT_FOUND_ERROR_CODE.code;
  }
}

module.exports = NotFoundError;
