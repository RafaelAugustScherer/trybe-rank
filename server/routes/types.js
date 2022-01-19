import connect from '../connection.js';
import express from 'express';

const router = express.Router();

const { typesCollection } = await connect();

router.route('/types')
  .get(async (_req, res) => {
    const types = await typesCollection.find().toArray();
    res.json(types);
  });

export default router;