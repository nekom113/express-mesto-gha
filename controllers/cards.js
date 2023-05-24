const Card = require('../models/card');
const {
  STATUS_CODE_OK,
  STATUS_CODE_CREATED,
  BAD_REQUEST_CODE, NOT_FOUND_ERROR_CODE,
  INTERNAL_SERVER_ERROR_CODE,
} = require('../utils/status_codes');

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(STATUS_CODE_CREATED).send({ card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST_CODE).send({ message: `Attention! Error ${BAD_REQUEST_CODE}. ${err.message}` });
      } return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Attention! Error ${INTERNAL_SERVER_ERROR_CODE}. ${err.message}` });
    });
};

const getCards = (req, res) => {
  Card.find({})
    .then((card) => {
      res.status(STATUS_CODE_OK)
        .send({ card });
    }).catch((err) => res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Attention! Error ${INTERNAL_SERVER_ERROR_CODE}. ${err.message}` }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: `Attention! Error ${NOT_FOUND_ERROR_CODE}. This is card is not found` });
      }
      return res.status(STATUS_CODE_OK).send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_CODE).send({ message: `Attention! Error ${BAD_REQUEST_CODE}. ${err.message}` });
      } return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Attention! Error ${INTERNAL_SERVER_ERROR_CODE}. ${err.message}` });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: `Attention! Error ${NOT_FOUND_ERROR_CODE}. This is card is not found` });
      }
      return res.status(STATUS_CODE_OK).send({ card });
    }).catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_CODE).send({ message: `Attention! Error ${BAD_REQUEST_CODE}. ${err.message}` });
      } return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Attention! Error ${INTERNAL_SERVER_ERROR_CODE}. ${err.message}` });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: `Attention! Error ${NOT_FOUND_ERROR_CODE}. This is card is not found` });
      }
      return res.status(STATUS_CODE_OK)
        .send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_CODE).send({ message: `Attention! Error ${BAD_REQUEST_CODE}. ${err.message}` });
      } return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Attention! Error ${INTERNAL_SERVER_ERROR_CODE}. ${err.message}` });
    });
};

module.exports = {
  createCard, getCards, likeCard, dislikeCard, deleteCard,
};
