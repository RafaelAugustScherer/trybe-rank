import express from 'express';
import user from '../controllers/users.js';
import authenticateToken from '../middlewares/userMiddleware.js';
import validate from '../middlewares/validate.js';
import userSchema from '../schemas/user.js';
const router = express.Router();

router
  .route('/')
  .get(
    authenticateToken, 
    user.findOne,
  )
  .post(
    validate(userSchema.create),
    user.create,
  )
  .put(
    authenticateToken,
    validate(userSchema.update),
    user.updateUser,
  )
  .patch(
    authenticateToken, 
    validate(userSchema.updateQuestions),
    user.updateQuestion,
  )

router
  .route('/auth')
  .get(
    user.auth
  )

router
  .route('/every')
  .get(user.findAll)

export default router;
