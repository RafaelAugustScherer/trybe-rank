import connect from '../connection.js';
import Mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import express from 'express';
import bodyParser from 'body-parser';


const router = express.Router();
const jsonParser = bodyParser.json();

const { questionsCollection } = await connect();

const questionSchema = new Mongoose.Schema({
  pergunta: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  dificuldade: {
    type: String,
    required: true,
  },
  alternativas: {
    type: Object,
    required: true,
  },
  id_correta: String,
});

const Question = Mongoose.model('Question', questionSchema);

/*
const UUID_Correct = ObjectId();
const question = new Question({
  pergunta: 'Porque map?',
  alternativas: {
    [UUID_Correct]: 'Sim',
    [ObjectId()]: 'Não',
    [ObjectId()]: 'Talvez',
  },
  id_correta: UUID_Correct,
});
*/

router.route('/question')
  .get(jsonParser, async (req, res) => {
    const question = await questionsCollection.findOne({ ...req.body});
    res.json(question);
  })
  .post(jsonParser, ({ body }, res) => {
    let { alternativas } = body;
    const UUID_Correct = ObjectId();
    alternativas = alternativas.reduce((obj, alternativa, index) => {
      const newKey = index === 0 ? UUID_Correct : ObjectId();
      return { ...obj, [newKey]: alternativa };
    }, {});
    const question = new Question({
      ...body,
      alternativas,
      id_correta: UUID_Correct,
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