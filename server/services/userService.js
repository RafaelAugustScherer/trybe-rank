import userModel from '../models/userModel.js';
import connect from '../connection.js';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { readFileSync } from 'fs';
const { usersCollection } = await connect();

const secret = readFileSync('./keys/secret.txt', 'utf-8');
const jwtConfig = {
  expiresIn: '24h',
  algorithm: 'HS256',
};

const updateProgress = async (req, res) => {
  const { username, completed_questions, completed_quizes } = req.user;
  const { newQuestions, newQuiz } = req.body;

  const newCompletedQuestions = userModel.getCompletedQuestions(completed_questions, newQuestions)
  const completedQuiz = { quizId: ObjectId(), ...newQuiz }

  const questions = newCompletedQuestions.length ? newCompletedQuestions : completed_questions

  await usersCollection.updateOne(
    { username }, 
    { $set: { 
      completed_questions: questions, 
      completed_quizes: [...completed_quizes, completedQuiz] 
    } }
  );

  res
    .status(200)
    .json({ message: 'OK' })
}

const getOne = (req, res) => {
  const { password, ...otherFields } = req.user;

  res
    .status(200)
    .json({ user: otherFields });
};

const getAll = async (_req, res) => {
  const users = await userModel.getUsers();

  if (!users)
    return res.status(404).json({ message: 'Not users in our database' })

  const userWithOutPass = users.map(({ nickname, completed_quizes }) => ({ nickname, completed_quizes }))

  res
    .status(200)
    .json({ users: userWithOutPass });
}

const insertOne = async ({ body }, res) => {
  const { username } = body;
  const user = userModel.createUser({ ...body, nickname: username });

  const alreadyExists = await userModel.getUser({ username });
  if (alreadyExists) return res.status(401).json({ message: 'User already exists!' });

  usersCollection.insertOne(user, () => console.log('user has been saved'));
  res
    .status(200)
    .json({ message: "OK" });
}

const updateOne = async ({ body }, res) => {
  const { username_prev, username, nickname } = body;

  await userModel.updateUser(
    { username: username_prev },
    { username, nickname }
  );

  res
    .status(200)
    .json({ message: "OK" });
}

const signIn = async ({ headers }, res) => {
  const { username, password } = headers;
  const user = await userModel.getUser({ username, password })
  if (!user)
    return res
      .status(409)
      .json({ message: 'User or Password Incorrect' });

  const token = jwt.sign({ username, password }, secret, jwtConfig);

  res
    .status(200)
    .json({ message: 'OK', token })
}

export default {
  updateProgress,
  getOne,
  getAll, 
  insertOne,
  updateOne,
  signIn
}
