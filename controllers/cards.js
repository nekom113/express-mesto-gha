const Card = require('../models/card');
const BadRequestError = require('../utils/error_types/badRequestError');
const ForbiddenError = require('../utils/error_types/forbiddenError');
const NotFoundError = require('../utils/error_types/notFoundError');
const {
  BAD_REQUEST_CODE, STATUS_CODE_CREATED, STATUS_CODE_OK, NOT_FOUND_ERROR_CODE, FORBIDDEN_ERROR_CODE,
} = require('../utils/status_codes');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(STATUS_CODE_CREATED.code).send({ card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(BAD_REQUEST_CODE.message));
      }
      return next(err);
    });
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => {
      res.status(STATUS_CODE_OK.code)
        .send({ card });
    }).catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(NOT_FOUND_ERROR_CODE.messages.cardIsNotFound));
      }
      if (card.owner._id.toString() !== req.user._id) {
        return next(new ForbiddenError(FORBIDDEN_ERROR_CODE.message));
      }
      return res.status(STATUS_CODE_OK.code).send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(BAD_REQUEST_CODE.message));
      } return next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(NOT_FOUND_ERROR_CODE.messages.cardIsNotFound));
      }
      return res.status(STATUS_CODE_OK.code).send({ card });
    }).catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(BAD_REQUEST_CODE.message));
      }
      return next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(NOT_FOUND_ERROR_CODE.messages.cardIsNotFound));
      }
      return res.status(STATUS_CODE_OK.code)
        .send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(BAD_REQUEST_CODE.message));
      } return next(err);
    });
};

module.exports = {
  createCard, getCards, likeCard, dislikeCard, deleteCard,
};
