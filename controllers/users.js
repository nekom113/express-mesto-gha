const User = require('../models/user');
const {
  STATUS_CODE_OK,
  STATUS_CODE_CREATED,
  BAD_REQUEST_CODE,
  NOT_FOUND_ERROR_CODE,
  INTERNAL_SERVER_ERROR_CODE,
} = require('../utils/status_codes');

const createUserProfile = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(STATUS_CODE_CREATED).send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST_CODE).send({ massage: 'Does not pass validation' });
      } return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Attention! Error ${INTERNAL_SERVER_ERROR_CODE}. Internal Server Error` });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.status(STATUS_CODE_OK).send({ user }))
    .catch((err) => res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Attention! Error ${INTERNAL_SERVER_ERROR_CODE}. ${err.massage}` }));
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
      return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Attention! Error ${INTERNAL_SERVER_ERROR_CODE}. ${err.massage}` });
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
        return res.status(BAD_REQUEST_CODE).send({ message: `Attention! Error ${BAD_REQUEST_CODE}. ${err.massage}` });
      }
      return res.status(INTERNAL_SERVER_ERROR_CODE).send({
        message: `Attention! Error ${INTERNAL_SERVER_ERROR_CODE}. ${err.massage}`,
      });
    });
};
module.exports = {
  getUsers, createUserProfile, getUserId, userProfileUpdate, userAvatarUpdate,
};
