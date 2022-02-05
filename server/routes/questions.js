import express from 'express';
import questionModel from '../models/questionModel.js';

const router = express.Router();

router
  .route('/question')
  .get(questionModel.getOne)
  .post(questionModel.insertOne);

router
  .route('/questions')
  .get(questionModel.getAll);

export default router;