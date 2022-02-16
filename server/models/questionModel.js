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

const insertOne = async (answers) => {
  const UUID_Correct = ObjectId();
  const answersWithId = answers.reduce((obj, answer, index) => {
    const newKey = index === 0 ? UUID_Correct : ObjectId();
    return { ...obj, [newKey]: answer };
  }, {});

  const question = new Question({
    ...body,
    answers: answersWithId,
    correct_id: UUID_Correct,
  });

  questionsCollection.insertOne(question);

  return { message: 'OK' };
}

const getOne = async (filter) => {
  const question = await questionsCollection.findOne({ ...filter });
  return question;
}

const getAll = async () => {
  const questions  = await questionsCollection.find().toArray();
  return questions;
}

export default { Question, getAll, getOne, insertOne };
