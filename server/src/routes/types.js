import express from 'express';
import Type from '../controllers/types.js';
import validate from '../middlewares/validate.js';
import typeSchema from '../schemas/type.js';
const router = express.Router();

router
  .route('/')
  .get(Type.findAll)
  .post(
    validate(typeSchema),
    Type.create,
  )

export default router;
