import { readFileSync } from 'fs';
import jwt from 'jsonwebtoken';
import connect from '../connection.js';
import express from 'express';
import User from '../models/userModel.js';
import autenticateToken from '../middlewares/autenticate.js';

const router = express.Router();
const { usersCollection } = await connect();

const secret = readFileSync('./keys/secret.txt', 'utf-8');
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

router
  .route('/sign-in')
  .get(async ({ headers }, res) => {
    const { username, password } = headers;
    const user = await usersCollection.findOne({ username, password })
    if (!user)
      return res
        .status(409)
        .json({ message: 'err' });

    const token = jwt.sign({ username, password }, secret, jwtConfig);

    const { nickname } = user;
    res
      .status(200)
      .json({ message: 'OK', token, nickname })
  })

router
  .route('/sign-up')
  .post(async ({ body }, res) => {
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
  .get(autenticateToken, async (req, res) => {
    const users = await usersCollection.find().toArray();
    const userWithOutPass = users.map(({ password, ...otherFields }) => otherFields)

    res
      .status(200)
      .json({ users: userWithOutPass });
  });

export default router;