import Mongoose from "mongoose";
import connect from './connection.js';
import { ObjectId } from 'mongodb';
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
  answers: {
    type: Object,
    required: true,
  },
  correct_id: String,
});
const Question = Mongoose.model('Question', questionSchema);

const insertOne = async ({ body }, res) => {
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
  questionsCollection.insertOne(question);

  res
    .status(201)
    .json({ message: 'question has been saved' });
}

const getOne = async ({ body }, res) => {
  const question = await questionsCollection.findOne({ ...body });
  res
    .status(200)
    .json(question);
}

const getAll = async (_req, res) => {
  const questions  = await questionsCollection.find({}).toArray();
  res
    .status(200)
    .json(questions);
}

export default { Question, getAll, getOne, insertOne };
