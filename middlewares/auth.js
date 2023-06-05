const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/error_types/unauthorizedError');
const { UNAUTHORIZED_ERROR_CODE } = require('../utils/status_codes');

const authToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(UNAUTHORIZED_ERROR_CODE.message));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'SECRET_KEY');
  } catch (err) {
    return next(err);
  }

  req.user = payload;
  return next();
};
module.exports = { authToken };
