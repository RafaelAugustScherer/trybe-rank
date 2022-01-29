import connect from '../connection.js';
import Mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import generateToken from '../generateToken.js';

const router = express.Router();
const jsonParser = bodyParser.json();

const { usersCollection } = await connect();
const userSchema = new Mongoose.Schema({
  apelido: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  questoes_completas: Array,
});

const User = Mongoose.model('User', userSchema);
const auth = { token: '' }

router
  .route('/sign-in')
  .get(jsonParser, async ({ headers }, res) => {
    const { apelido, senha } = headers;
    const user = await usersCollection.findOne({ apelido, senha })

    if (!user) 
      return res
        .status(409)
        .json({ message: 'err' });

    const token = generateToken();
    auth.token = token;

    res
      .status(200)
      .json({ message: 'OK', token })
  })

router
  .route('/user')
  .post(jsonParser, async ({ body }, res) => {
    const { apelido } = body;
    const user = new User(body);

    const alreadyExists = await usersCollection.findOne({ apelido });
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
    const userWithOutPass = users.map(({ senha, ...otherFields }) => ({ otherFields }))

    if (authorization !== auth.token)
      return res.status(401).json({ message: 'Invalid Token' })

    res
      .status(200)
      .json({ users: userWithOutPass });
  });

export default router;