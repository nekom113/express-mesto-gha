const express = require('express');
const { NOT_FOUND_ERROR_CODE } = require('../utils/status_codes');

const router = express.Router();
router.use(express.json());

const userRouter = require('./users');
const cardRouter = require('./cards');
const { login, createUserProfile } = require('../controllers/users');
const { authToken } = require('../middlewares/auth');
const NotFoundError = require('../utils/error_types/notFoundError');
const { createUserProfileValidation, loginValidation } = require('../middlewares/validator');

router.use('/users', authToken, userRouter);
router.use('/cards', authToken, cardRouter);

router.post('/signin', loginValidation, login);
router.post('/signup', createUserProfileValidation, createUserProfile);

router.use('/*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_ERROR_CODE.messages.pageIsNotFound));
});
module.exports = router;
