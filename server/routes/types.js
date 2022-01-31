import connect from '../connection.js';
import express from 'express';
import Type from '../models/typeModel.js';

const router = express.Router();
const { typesCollection } = await connect();


router.route('/types')
  .get(async (_req, res) => {
    const types = await typesCollection.find().toArray();
    res.json(types);
  });

router.route('/type')
  .post(async ({ body }, res) => {
    const type = new Type(body);
    typesCollection.insertOne(type, () => console.log("type has been saved"))

    res.sendStatus(200)
  })

export default router;