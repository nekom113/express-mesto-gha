const Card = require('../models/card');
const { BAD_REQUEST_CODE, NOT_FOUND_ERROR_CODE, INTERNAL_SERVER_ERROR_CODE } = require('../utils/status_codes');

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
    }).catch((err) => res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Attention error. ${err}` }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => res.send({ card }))
    .catch(() => res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Произошла ошибка' }));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      res.send({ data: card });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      res.send({ data: card });
    });
};

module.exports = {
  createCard, getCards, likeCard, dislikeCard, deleteCard,
};
