const express = require('express');
const mongoose = require('mongoose');

const app = express();

const { PORT = 3000 } = process.env;

const start = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb', {});
    await app.listen(PORT, console.log(`Server is working on PORT: ${PORT}`));
  } catch (err) {
    console.log(`Catch ${err}`);
  }
};
start();
