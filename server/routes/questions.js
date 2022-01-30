import connect from '../connection.js';
import { ObjectId } from 'mongodb';
import express from 'express';
import Question from '../models/questionModel.js';

const router = express.Router();
const { questionsCollection } = await connect();

/*
const UUID_Correct = ObjectId();
const question = new Question({
  question: 'Porque map?',
  answers: {
    [UUID_Correct]: 'Sim',
    [ObjectId()]: 'Não',
    [ObjectId()]: 'Talvez',
  },
  correct_id: UUID_Correct,
});
*/

router.route('/question')
  .get(async (req, res) => {
    const question = await questionsCollection.findOne({ ...req.body});
    res.json(question);
  })
  .post(({ body }, res) => {
    let { answers } = body;
    const UUID_Correct = ObjectId();
    answers = answers.reduce((obj, answer, index) => {
      const newKey = index === 0 ? UUID_Correct : ObjectId();
      return { ...obj, [newKey]: answer };
    }, {});
    const question = new Question({
      ...body,
      answers,
      correct_id: UUID_Correct,
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