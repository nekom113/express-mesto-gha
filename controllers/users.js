const User = require('../models/user');
const { BAD_REQUEST_CODE, NOT_FOUND_ERROR_CODE, INTERNAL_SERVER_ERROR_CODE } = require('../utils/status_codes');

const createUserProfile = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Произошла ошибка ${err}` }));
};

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Произошла ошибка' }));
};
const getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((data) => {
      res.send({ data });
    })
    .catch(() => res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Произошла ошибка' }));
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
      console.log({ Myuser: user });
      res.send({ name, about });
    })
    .catch((err) => res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Произошла ошибка ${err}` }));
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
      res.send(user);
    })
    .catch((err) => res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Произошла ошибка ${err}` }));
};
module.exports = {
  getUsers, createUserProfile, getUserId, userProfileUpdate, userAvatarUpdate,
};
