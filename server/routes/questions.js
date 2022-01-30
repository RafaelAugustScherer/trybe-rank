import connect from '../connection.js';
import Mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import express from 'express';
import bodyParser from 'body-parser';


const router = express.Router();
const jsonParser = bodyParser.json();

const { questionsCollection } = await connect();

const questionSchema = new Mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  alternatives: {
    type: Object,
    required: true,
  },
  id_correct: String,
});

const Question = Mongoose.model('Question', questionSchema);

/*
const UUID_Correct = ObjectId();
const question = new Question({
  question: 'Porque map?',
  alternatives: {
    [UUID_Correct]: 'Sim',
    [ObjectId()]: 'Não',
    [ObjectId()]: 'Talvez',
  },
  id_correct: UUID_Correct,
});
*/

router.route('/question')
  .get(jsonParser, async (req, res) => {
    const question = await questionsCollection.findOne({ ...req.body});
    res.json(question);
  })
  .post(jsonParser, ({ body }, res) => {
    let { alternatives } = body;
    const UUID_Correct = ObjectId();
    alternatives = alternatives.reduce((obj, alternative, index) => {
      const newKey = index === 0 ? UUID_Correct : ObjectId();
      return { ...obj, [newKey]: alternative };
    }, {});
    const question = new Question({
      ...body,
      alternatives,
      id_correct: UUID_Correct,
    });
    questionsCollection.insertOne(question, () => console.log('question has been saved'));
  
    res.sendStatus(200);
  });

router.route('/questions')
  .get(async ({ body = {} }, res) => {
    const questions  = await questionsCollection.find({ ...body }).toArray();
    res.json(questions);
  });

export default router;