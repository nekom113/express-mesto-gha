const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

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

app.listen(PORT, console.log(`Server is working on PORT: ${PORT}`));
