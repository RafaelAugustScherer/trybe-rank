import express from 'express';
import Type from '../models/typeModel.js';
const router = express.Router();



router
  .route('/types')
  .get(Type.getAll);

router
  .route('/type')
  .post(Type.insertOne)

export default router;