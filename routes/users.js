const express = require('express');
const {
  getUsers, userProfileUpdate, userAvatarUpdate, getCurrentUser,
} = require('../controllers/users');

const userRouter = express.Router();

userRouter.use(express.json());

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);

userRouter.patch('/me', userProfileUpdate);
userRouter.patch('/me/avatar', userAvatarUpdate);

module.exports = userRouter;
