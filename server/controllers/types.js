import express from 'express';
import Type from '../services/typeService.js';
const router = express.Router();

router
  .route('/types')
  .get(Type.getAll);

router
  .route('/type')
  .post(Type.insertOne)

export default router;
