const User = require('../models/user');

const createUserProfile = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
const getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((data) => {
      res.send({ data });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = { getUsers, createUserProfile, getUserId };
