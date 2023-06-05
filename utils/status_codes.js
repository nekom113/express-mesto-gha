module.exports.STATUS_CODE_OK = {
  code: 200,
  message: 'Allreary Ok!',
};
module.exports.STATUS_CODE_CREATED = {
  code: 201,
  message: 'Item created',
};
module.exports.BAD_REQUEST_CODE = {
  code: 400,
  message: 'Input data is not correct',
};
module.exports.UNAUTHORIZED_ERROR_CODE = {
  code: 401,
  message: {
    authorizationError: 'Authorization Error',
    incorrectEmailOrPassword: 'Incorrect email or password',
  },
};
module.exports.FORBIDDEN_ERROR_CODE = {
  code: 403,
  message: 'Insufficient rights to delete this card',
};
module.exports.NOT_FOUND_ERROR_CODE = {
  code: 404,
  messages: {
    userIsNotFound: 'User profile is not found',
    cardIsNotFound: 'Card is not found',
    pageIsNotFound: 'Page is not found',
  },
};
module.exports.DUPLICATE_DATA_ERROR_CODE = {
  code: 409,
  message: 'User already registered',
};
module.exports.INTERNAL_SERVER_ERROR_CODE = {
  code: 500,
  message: 'Internal server error',
};

module.exports.urlRegex = /^http(s)?:\/\/(www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]{1,256}\.[a-z]{1,6}\b[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*$/;
