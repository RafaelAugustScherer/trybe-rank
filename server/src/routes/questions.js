import express from 'express';
import validate from '../middlewares/validate.js';
import questionSchema from '../schemas/question.js';
import questionController from '../controllers/questions.js';

const router = express.Router();

router
  .route('/')
  .get(questionController.findAll)
  .post(
    validate(questionSchema),
    questionController.create,
  );

router
  .route('/:type')
  .get(questionController.findByType);

export default router;
