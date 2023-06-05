const mongoose = require('mongoose');
const validator = require('validator');
const { urlRegex } = require('../utils/status_codes');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 30,
      minlength: 2,
      default: 'King Kat',
    },
    about: {
      type: String,
      maxlength: 30,
      minlength: 2,
      default: 'Just King',
    },
    avatar: {
      type: String,
      default: 'https://ae04.alicdn.com/kf/HTB1YNgVL5LaK1RjSZFxq6ymPFXam.jpg',
      validate: {
        validator(v) {
          return urlRegex.test(v);
        },
        message: 'Url is not correct.',
      },
    },
    email: {
      type: String,
      unique: true,
      require: true,
      validate: {
        validator(v) {
          return validator.isEmail(v);
        },
        message: 'Email is not correct.',
      },
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
