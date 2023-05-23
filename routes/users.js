const express = require('express');
const {
  getUsers, createUserProfile, getUserId, userProfileUpdate, userAvatarUpdate,
} = require('../controllers/users');

const userRouter = express.Router();

userRouter.use(express.json());

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserId);
userRouter.post('/', createUserProfile);
userRouter.patch('/me', userProfileUpdate);
userRouter.patch('/me/avatar', userAvatarUpdate);

module.exports = userRouter;
