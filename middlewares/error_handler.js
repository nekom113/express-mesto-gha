const { INTERNAL_SERVER_ERROR_CODE } = require('../utils/status_codes');

const errorHandler = (err, req, res, next) => {
  console.log({ INTERNAL_SERVER_ERROR_CODE });

  if (err.statusCode === 500) {
    res.status(INTERNAL_SERVER_ERROR_CODE.code).send(INTERNAL_SERVER_ERROR_CODE.message);
  } else {
    res.status(err.statusCode).send({ message: err.message });
  }
  next();
};

module.exports = { errorHandler };
