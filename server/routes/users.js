import connect from '../connection.js';
import Mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';

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

router
  .route('/login')
  .get(jsonParser, async ({ headers }, res) => {
    const { apelido, senha } = headers;
    const user = await usersCollection.findOne({ apelido, senha })
    if (user) {
      res
        .status(200)
        .json({ message: 'OK' })
    } else {
      res
        .status(200)
        .json({ message: 'err' })
    }
  })

router.route('/user')
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

router.route('/users')
  .get(async (_req, res) => {
    const users = await usersCollection.find().toArray();
    res.json(users);
  });

export default router;