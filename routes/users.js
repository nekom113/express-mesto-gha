const express = require('express');
const {
  getUsers, userProfileUpdate, userAvatarUpdate, getCurrentUser,
} = require('../controllers/users');
const { getCurrentUserValidation, userAvatarUpdateValidation, userProfileUpdateValidation } = require('../middlewares/validator');

const userRouter = express.Router();

userRouter.use(express.json());

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUserValidation, getCurrentUser);

userRouter.patch('/me', userProfileUpdateValidation, userProfileUpdate);
userRouter.patch('/me/avatar', userAvatarUpdateValidation, userAvatarUpdate);

module.exports = userRouter;
