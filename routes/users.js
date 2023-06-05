const express = require('express');
const {
  getUsers, userProfileUpdate, userAvatarUpdate, getCurrentUser, getUserById,
} = require('../controllers/users');
const {
  getCurrentUserValidation,
  userAvatarUpdateValidation,
  userProfileUpdateValidation,
  getUserByIdValidation,
} = require('../middlewares/validator');

const userRouter = express.Router();

userRouter.use(express.json());

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUserValidation, getCurrentUser);
userRouter.get('/:userId', getUserByIdValidation, getUserById);

userRouter.patch('/me', userProfileUpdateValidation, userProfileUpdate);
userRouter.patch('/me/avatar', userAvatarUpdateValidation, userAvatarUpdate);

module.exports = userRouter;
