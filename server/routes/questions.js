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
    const question = await questionsCollection.findOne();
    res.json(question);
  })
  .post(jsonParser, ({ body }, res) => {
    let { alternativas } = body;
    console.log(body);
    const UUID_Correct = ObjectId();
    alternativas = alternativas.map((alternativa, index) => 
      index === 1
      ? { [UUID_Correct]: alternativa }
      : { [ObjectId()]: alternativa })
    const question = new Question({
      ...body,
      alternativas
    });
    questionsCollection.insertOne(question, () => console.log('question has been saved'));
  
    res.sendStatus(200);
  });

router.route('/questions')
  .get(async (_req, res) => {
    const users = questionsCollection.find();
    res.json(users);
  });

export default router;