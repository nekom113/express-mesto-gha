const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const { urlRegex } = require('../utils/utils');

const idValidation = (value, helper) => {
  if (mongoose.isValidObjectId(value)) {
    return value;
  }
  return helper.message('ID is not correct');
};

module.exports.createUserProfileValidation = celebrate({
  body: Joi
    .object()
    .keys({
      name: Joi
        .string()
        .min(2)
        .max(30),
      about: Joi
        .string()
        .min(2)
        .max(30),
      avatar: Joi
        .string()
        .pattern(urlRegex),
      email: Joi
        .string()
        .required()
        .email(),
      password: Joi
        .string()
        .required()
        .min(6),
    }),
});

module.exports.loginValidation = celebrate({
  body: Joi
    .object()
    .keys({
      email: Joi
        .string()
        .required()
        .email(),
      password: Joi
        .string()
        .required()
        .min(6),
    }),
});

module.exports.getCurrentUserValidation = celebrate({
  params: Joi
    .object()
    .keys({
      userId: Joi
        .string()
        .custom(idValidation),
    }),
});
module.exports.getUserByIdValidation = celebrate({
  params: Joi
    .object()
    .keys({
      userId: Joi
        .string()
        .required()
        .custom(idValidation),
    }),
});

module.exports.userProfileUpdateValidation = celebrate({
  body: Joi
    .object()
    .keys({
      name: Joi
        .string()
        .required()
        .min(2)
        .max(30),
      about: Joi
        .string()
        .min(2)
        .max(30),
    }),
});

module.exports.userAvatarUpdateValidation = celebrate({
  body: Joi
    .object()
    .keys({
      avatar: Joi
        .string()
        .required()
        .pattern(urlRegex),
    }),
});

module.exports.createCardValidation = celebrate({
  body: Joi
    .object()
    .keys({
      name: Joi
        .string()
        .required()
        .min(2)
        .max(30),
      link: Joi
        .string()
        .required()
        .pattern(urlRegex),
    }),
});

module.exports.deleteCardValidation = celebrate({
  params: Joi
    .object()
    .keys({
      cardId: Joi
        .string()
        .custom(idValidation),
    }),
});

module.exports.likeCardValidation = celebrate({
  params: Joi
    .object()
    .keys({
      cardId: Joi
        .string()
        .custom(idValidation),
    }),
});

module.exports.dislikeCardValidation = celebrate({
  params: Joi
    .object()
    .keys({
      cardId: Joi
        .string()
        .custom(idValidation),
    }),
});
