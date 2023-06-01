const express = require('express');
const { NOT_FOUND_ERROR_CODE } = require('../utils/status_codes');

const router = express.Router();
router.use(express.json());

const userRouter = require('./users');
const cardRouter = require('./cards');
const { login, createUserProfile } = require('../controllers/users');
const { authToken } = require('../middlewares/auth');

router.use('/users', authToken, userRouter);
router.use('/cards', authToken, cardRouter);

router.post('/signin', login);
router.post('/signup', createUserProfile);

router.use('/*', (req, res) => {
  res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Page is not found' });
});
module.exports = router;
