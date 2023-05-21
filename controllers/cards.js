const Card = require('../models/card');

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send({ data: card });
    });
};

const getCards = (req, res) => {
  Card.find({})
    .then((card) => {
      res.send({ data: card });
    }).catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = { createCard, getCards };
