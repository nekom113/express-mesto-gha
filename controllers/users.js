const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  STATUS_CODE_CREATED,
  BAD_REQUEST_CODE,
  DUPLICATE_DATA_ERROR_CODE,
  STATUS_CODE_OK,
  NOT_FOUND_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
} = require('../utils/status_codes');
const BadRequestError = require('../utils/error_types/badRequestError');
const DuplicateDataError = require('../utils/error_types/duplicateError');
const NotFoundError = require('../utils/error_types/notFoundError');
const UnauthorizedError = require('../utils/error_types/unauthorizedError');

const createUserProfile = (req, res, next) => {
  const {
    about, name, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 8).then((hash) => User.create({
    name,
    about,
    avatar,
    email,
    password: hash,
  })).then((user) => {
    res.status(STATUS_CODE_CREATED.code).send({ user });
  })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return new BadRequestError(BAD_REQUEST_CODE.message);
      }
      if (err.code === 11000) {
        return next(new DuplicateDataError(DUPLICATE_DATA_ERROR_CODE.message));
      }
      return next(err);
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.status(STATUS_CODE_OK.code).send({ user }))
    .catch(next);
};
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch((err) => next(err));
};
const getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(NOT_FOUND_ERROR_CODE.messages.userIsNotFound));
      }
      return res.status(STATUS_CODE_OK.code).send({ user });
    }).catch((err) => {
      if (err.name === 'CastError') {
        return new BadRequestError(BAD_REQUEST_CODE.message);
      } return next(err);
    });
};

const userProfileUpdate = (req, res, next) => {
  const { name, about } = req.body;
  User.findOneAndUpdate(
    { _id: req.user._id },
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(NOT_FOUND_ERROR_CODE.messages.userIsNotFound));
      }
      return res.status(STATUS_CODE_OK.code).send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return new BadRequestError(BAD_REQUEST_CODE.message);
      }
      return next(err);
    });
};

const userAvatarUpdate = (req, res, next) => {
  const { avatar } = req.body;
  User.findOneAndUpdate(
    { _id: req.user._id },
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(NOT_FOUND_ERROR_CODE.messages.userIsNotFound));
      }
      return res.status(STATUS_CODE_OK.code).send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return new BadRequestError(BAD_REQUEST_CODE.message);
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError(UNAUTHORIZED_ERROR_CODE.message));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new UnauthorizedError(UNAUTHORIZED_ERROR_CODE.message));
          }
          const token = jwt.sign({ _id: user._id }, 'SECRET_KEY', { expiresIn: '1d' });
          return res.status(STATUS_CODE_OK.code).send({ token });
        });
    })
    .catch(next);
};
module.exports = {
  getUsers,
  createUserProfile,
  getUserId,
  userProfileUpdate,
  userAvatarUpdate,
  login,
  getCurrentUser,
};
