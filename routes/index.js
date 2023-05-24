const express = require('express');
const { NOT_FOUND_ERROR_CODE } = require('../utils/status_codes');

const router = express.Router();

const userRouter = require('./users');
const cardRouter = require('./cards');

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use('/*', (req, res) => {
  res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Page is not found' });
});
module.exports = router;
