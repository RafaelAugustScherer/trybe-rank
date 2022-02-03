import Mongoose from 'mongoose';
import connect from '../connection.js';
import jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
const { usersCollection } = await connect();

const secret = readFileSync('./keys/secret.txt', 'utf-8');
const jwtConfig = {
  expiresIn: '24h',
  algorithm: 'HS256',
};

const userSchema = new Mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  completed_questions: Array,
});
const User = Mongoose.model('User', userSchema);


const updateQuestions = async (req, res) => {
  const { username, completed_questions } = req.user;
  const { newQuestions } = req.body;

  if (!newQuestions || !newQuestions.length)
    return res.status(401).json({ message: 'Invalid questions format' });

  const questionsIds = completed_questions.map(({ question_id }) => question_id);
  const filterQuestions = newQuestions
    .filter(({ question_id }) => !questionsIds.includes(question_id));

  if (!filterQuestions.length)
    return res.status(401).json({ message: 'No questions to save' });

  const newCompletedQuestions = [...completed_questions, ...filterQuestions];
  await usersCollection.updateOne(
    { username }, 
    { $set: { completed_questions: newCompletedQuestions } }
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
} 

const getAll = async (_req, res) => {
  const users = await usersCollection.find().toArray();

  if (!users)
    return res.status(404).json({ message: 'Not users in our database' })

  const userWithOutPass = users.map(({ password, ...otherFields }) => otherFields)

  res
    .status(200)
    .json({ users: userWithOutPass });
}

const insertOne = async ({ body }, res) => {
  const { username } = body;
  const user = new User({ ...body, nickname: username });

  const alreadyExists = await usersCollection.findOne({ username });
  if (alreadyExists) return res.status(401).json({ message: 'User already exists!' });

  usersCollection.insertOne(user, () => console.log('user has been saved'));
  res
    .status(200)
    .json({ message: "OK" });
}

const signIn = async ({ headers }, res) => {
  const { username, password } = headers;
  const user = await usersCollection.findOne({ username, password })
  if (!user)
    return res
      .status(409)
      .json({ message: 'User or Password Incorrect' });

  const token = jwt.sign({ username, password }, secret, jwtConfig);

  const { nickname } = user;
  res
    .status(200)
    .json({ message: 'OK', token, nickname })
}

export default { getAll, updateQuestions, getOne, insertOne, signIn };