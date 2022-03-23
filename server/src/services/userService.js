import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import { ObjectId } from 'mongodb';
import ValidateError from '../validateError.js';
import connect from '../models/connection.js';
const { usersCollection } = await connect();
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.TOKEN_KEY;
const jwtConfig = {
  expiresIn: '24h',
  algorithm: 'HS256',
};

const findAll = async () => {
  const users = await usersCollection.find().toArray();

  if (!users.length)
    throw new ValidateError({ status: 404, message: 'Users not found' })

  const userWithOutPass = users.map(({ nickname, completed_quizes }) => ({ nickname, completed_quizes }))

  return userWithOutPass;
}

const findOne = async (username) => {
  const result = await usersCollection.findOne({ username });

  if (!result) {
    throw new ValidateError({ status: 404, message: 'User not found' })
  }

  const { password, ...fields } = result;

  return fields;
};

const create = async (params) => {
  const { username } = params;
  
  const alreadyExists = await usersCollection.findOne({ "username": username });
  if (alreadyExists) {
    throw new ValidateError({ status: 409, message: 'User already exists' })
  }
  
  const user = new userModel({ ...params, nickname: username, image_url: '' });
  user.hashPassword();

  const { insertId } = await usersCollection.insertOne(user);

  return { id: insertId, ...params };
}

const update = async (params, data) => {
  const user = await usersCollection.updateOne(
    { ...params }, 
    { $set: { ...data } }
  );
  
  return user;
}

const getCompletedQuestions = (completedQuestions, newQuestions) => {
  const questionsIds = completedQuestions.map(({ question_id }) => question_id);
  const filterQuestions = newQuestions
    .filter(({ question_id }) => !questionsIds.includes(question_id));

  if (!filterQuestions.length)
    return [];

  const newCompletedQuestions = [...completedQuestions, ...filterQuestions]
  return newCompletedQuestions;
}

const updateProgress = async (params) => {
  const { 
    username, 
    completed_questions,
    completed_quizes,
    newQuestions,
    newQuiz 
  } = params;

  const newCompletedQuestions = getCompletedQuestions(completed_questions, newQuestions)
  const completedQuiz = { quizId: ObjectId(), ...newQuiz }

  const questions = newCompletedQuestions.length ? newCompletedQuestions : completed_questions

  await update(
    { username }, 
    { 
      completed_questions: questions, 
      completed_quizes: [...completed_quizes, completedQuiz] 
    }
  )

  return { 
    username, 
    completed_questions: questions, 
    completed_quizes: [...completed_quizes, completedQuiz]
  }
}
const auth = async (params) => {
  const { username, password } = params;
  const user = await usersCollection.findOne({ username });

  if (!user) {
    throw new ValidateError({ status: 404, message: 'User not found!' })
  }

  const validPassword = new userModel(user).validatePassword(password);

  if (!validPassword) {
    throw new ValidateError({ status: 403, message: 'Invalid password' })
  }

  const token = jwt.sign({ username, password: user.password }, secret, jwtConfig);
  console.log(token)
  return token;
}

export default {
  findAll, 
  findOne,
  create,
  update,
  updateProgress,
  auth
}
