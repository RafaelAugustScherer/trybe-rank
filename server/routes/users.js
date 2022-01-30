import connect from '../connection.js';
import Mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import generateToken from '../generateToken.js';

const router = express.Router();
const jsonParser = bodyParser.json();

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
});

const User = Mongoose.model('User', userSchema);
const auth = { token: '' }

router
  .route('/sign-in')
  .get(jsonParser, async ({ headers }, res) => {
    const { username, password } = headers;
    const user = await usersCollection.findOne({ username, password })
    if (!user)
      return res
        .status(409)
        .json({ message: 'err' });

    const token = generateToken();
    auth.token = token;

    const { nickname } = user;
    res
      .status(200)
      .json({ message: 'OK', status: 200, nickname })
  })

router
  .route('/sign-up')
  .post(jsonParser, async ({ body }, res) => {
    const { username } = body;
    const user = new User({ ...body, nickname: username });

    const alreadyExists = await usersCollection.findOne({ username });
    if (alreadyExists) return res.status(401).end();

    usersCollection.insertOne(user, () => console.log('user has been saved'));
    res
      .status(200)
      .json({ message: "OK" });
  });

router
  .route('/users')
  .get(async (req, res) => {
    const { authorization } = req.headers;
    const users = await usersCollection.find().toArray();
    const userWithOutPass = users.map(({ password, ...otherFields }) => ({ otherFields }))

    if (authorization !== auth.token)
      return res.status(401).json({ message: 'Invalid Token' })

    res
      .status(200)
      .json({ users: userWithOutPass });
  });

export default router;