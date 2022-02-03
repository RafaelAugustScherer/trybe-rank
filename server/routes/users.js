import express from 'express';
import user from '../models/userModel.js';
import userMiddleware from '../middlewares/userMiddleware.js';
const router = express.Router();

router
  .route('/sign-in')
  .get(user.signIn)

router
  .route('/sign-up')
  .post(userMiddleware.validateUserInfo, user.insertOne);

router
  .route('/user')
  .get(userMiddleware.authenticateToken, user.getOne)
  .put(userMiddleware.authenticateToken, user.updateQuestions);

router
  .route('/users')
  .get(userMiddleware.authenticateToken, user.getAll);

export default router;