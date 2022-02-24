import express from 'express';
import questionService from '../services/questionService.js';

const router = express.Router();

router
  .route('/question')
  .get(questionService.getOne)
  .post(questionService.insertOne);

router
  .route('/questions')
  .get(questionService.getAll);

export default router;