const express = require('express');
const { getUsers, createUserProfile, getUserId } = require('../controllers/users');

const userRouter = express.Router();

userRouter.use(express.json());

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserId);
userRouter.post('/', createUserProfile);

module.exports = userRouter;
