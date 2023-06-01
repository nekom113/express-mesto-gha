const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  STATUS_CODE_OK,
  STATUS_CODE_CREATED,
  BAD_REQUEST_CODE,
  NOT_FOUND_ERROR_CODE,
  INTERNAL_SERVER_ERROR_CODE,
} = require('../utils/status_codes');

const createUserProfile = (req, res) => {
  console.log({ req });
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
    res.status(STATUS_CODE_CREATED).send({ user });
  })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST_CODE).send({ message: 'Does not pass validation' });
      } return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Attention! Error ${INTERNAL_SERVER_ERROR_CODE}. Internal Server Error ${err}` });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.status(STATUS_CODE_OK).send({ user }))
    .catch((err) => res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Attention! Error ${INTERNAL_SERVER_ERROR_CODE}. ${err.message}` }));
};
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch((err) => next(err));
};
const getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: `Attention! Error ${NOT_FOUND_ERROR_CODE}. This is user is not found` });
      }
      return res.status(STATUS_CODE_OK).send({ user });
    }).catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_CODE).send({ message: `Attention! Error ${BAD_REQUEST_CODE}. This user is not found` });
      } return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Attention! Error ${INTERNAL_SERVER_ERROR_CODE}` });
    });
};

const userProfileUpdate = (req, res) => {
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
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'This profile is not found' });
      }
      return res.status(STATUS_CODE_OK).send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(BAD_REQUEST_CODE).send({ message: `Attention! Error ${BAD_REQUEST_CODE}. Does not pass validation` });
      }
      return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Attention! Error ${INTERNAL_SERVER_ERROR_CODE}. ${err.message}` });
    });
};

const userAvatarUpdate = (req, res) => {
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
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'This profile is not found' });
      }
      return res.status(STATUS_CODE_OK).send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(BAD_REQUEST_CODE).send({ message: `Attention! Error ${BAD_REQUEST_CODE}. ${err.message}` });
      }
      return res.status(INTERNAL_SERVER_ERROR_CODE).send({
        message: `Attention! Error ${INTERNAL_SERVER_ERROR_CODE}. ${err.message}`,
      });
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(401).send({ message: 'Неправильные почта или пароль' });
        next();
      }
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            res.status(401).send({ message: 'Неправильные почта или пароль' });
            next();
          }
          const token = jwt.sign({ _id: user._id }, 'SECRET_KEY', { expiresIn: '1d' });
          // res.cookie('Bearer ', token, {
          //   maxAge: 360000 * 24 * 7,
          //   httpOnly: true,
          //   sameSite: true,
          // });
          return res.status(200).send({ token });
          // return res.status(200).send({ data: user.toJSON() });
        });
    })
    .catch((err) => res.status(401).send({ message: `Что-то не так!!! ${err.message}` }));
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
