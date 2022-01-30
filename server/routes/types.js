import connect from '../connection.js';
import express from 'express';
import Mongoose from 'mongoose';
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();

const router = express.Router();
const { typesCollection } = await connect();

const TypeSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  difficulty: {
    type: Number,
    required: true
  }
});

const Type = Mongoose.model('Type', TypeSchema);


router.route('/types')
  .get(async (_req, res) => {
    const types = await typesCollection.find().toArray();
    res.json(types);
  });

router.route('/type')
  .post(jsonParser, async ({ body }, res) => {
    const type = new Type(body);
    typesCollection.insertOne(type, () => console.log("type has been saved"))

    res.sendStatus(200)
  })

export default router;