import Mongoose from 'mongoose';
import connect from './connection.js';
const { usersCollection } = await connect();


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
  completed_quizes: Array
});
const User = Mongoose.model('User', userSchema);

const getCompletedQuestions = (completedQuestions, newQuestions) => {
  const questionsIds = completedQuestions.map(({ question_id }) => question_id);
  const filterQuestions = newQuestions
    .filter(({ question_id }) => !questionsIds.includes(question_id));

  if (!filterQuestions.length)
    return [];

  const newCompletedQuestions = [...completedQuestions, ...filterQuestions]
  return newCompletedQuestions;
}

const getUsers = async () => {
  const users = await usersCollection.find().toArray();
  return users;
}

const getUser = async (filter) => {
  const user = await usersCollection.findOne(filter);
  return user;
}

const createUser = (params) => {
  const user = new User(params);
  return user;
}

const updateUser = async (params, data) => {
  const user = await usersCollection.updateOne(
    { ...params }, 
    { $set: { ...data } }
  );
  return user;
}

export default { 
  getCompletedQuestions,
  getUsers, 
  getUser,
  createUser,
  updateUser 
};