const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes');
const { errorHandler } = require('./middlewares/error_handler');

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

app.use('/', router);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, console.log(`Server is working on PORT: ${PORT}`));
