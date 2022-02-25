import { ObjectId } from 'mongodb';
import connect from '../models/connection.js';
import questionModel from '../models/questionModel.js';
const { questionsCollection } = await connect();


const create = async (params) => {
  const { answers } = params;
  const UUID_Correct = ObjectId();
  const answersWithId = answers.reduce((obj, answer, index) => {
    const newKey = index === 0 ? UUID_Correct : ObjectId();
    return { ...obj, [newKey]: answer };
  }, {});

  const question = new questionModel({
    ...params,
    answers: answersWithId,
    correct_id: UUID_Correct,
  });

  questionsCollection.insertOne(question);

  return question;
}

const findByType = async (type) => {
  const question = await questionsCollection.find({ "type": type }).toArray();

  return question;
}

const findAll = async () => {
  const questions = await questionsCollection.find().toArray();

  return questions;
}

export default { findAll, findByType, create };
