const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
const { NOT_FOUND_ERROR_CODE } = require('./utils/status_codes');

const app = express();

const { PORT = 3000 } = process.env;

const start = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb', {});
  } catch (err) {
    console.error(`Catch ${err}`);
  }
};
start();

app.use((req, res, next) => {
  req.user = {
    _id: '64653bad8288409d37874371',
  };
  next();
});

app.use('/', router);
app.use((req, res) => {
  res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Page is not found' });
});

app.listen(PORT, console.log(`Server is working on PORT: ${PORT}`));
