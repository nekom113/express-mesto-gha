const User = require('../models/user');
const { BAD_REQUEST_CODE, NOT_FOUND_ERROR_CODE, INTERNAL_SERVER_ERROR_CODE } = require('../utils/status_codes');

const createUserProfile = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST_CODE).send({ massage: `Attention! Error ${BAD_REQUEST_CODE}. ${err.massage}` });
      }
    })
    .catch((err) => res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Attention! Error ${INTERNAL_SERVER_ERROR_CODE}. ${err.massage}` }));
};

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Attention! Error ${INTERNAL_SERVER_ERROR_CODE}. ${err.massage}` }));
};

const getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      res.send({
        _id: user.id, name: user.name, about: user.about, link: user.avatar,
      });
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_CODE).send({ message: `Attention! Error ${BAD_REQUEST_CODE}. This user is not found` });
      }
    })
    .catch((err) => res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Attention! Error ${INTERNAL_SERVER_ERROR_CODE}. ${err.massage}` }));
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
      res.send({
        _id: user.id, name: user.name, about: user.about, link: user.avatar,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(BAD_REQUEST_CODE).send({ message: `Attention! Error ${BAD_REQUEST_CODE}. ${err.massage}` });
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
      res.send({
        _id: user.id, name: user.name, about: user.about, link: user.avatar,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(BAD_REQUEST_CODE).send({ message: `Attention! Error ${BAD_REQUEST_CODE}. ${err.massage}` });
      }
      return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Attention! Error ${INTERNAL_SERVER_ERROR_CODE}. ${err.massage}` });
    });
};
module.exports = {
  getUsers, createUserProfile, getUserId, userProfileUpdate, userAvatarUpdate,
};
