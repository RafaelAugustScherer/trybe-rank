import Mongoose from 'mongoose';
import connect from './connection.js';
const { typesCollection } = await connect();

const TypeSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  difficulty: {
    type: Number,
    required: true
  }
});

const Type = Mongoose.model('Type', TypeSchema);

const getAll = async (_req, res) => {
  const types = await typesCollection.find().toArray();

  if (!types)
    return res.status(404).json({ message: 'Types not Found' })

  res
    .status(200)
    .json(types);
}

const insertOne = ({ body }, res) => {
  const type = new Type(body);
  typesCollection.insertOne(type, () => console.log("type has been saved"))

  res
    .status(201)
    .json({ message: 'OK' })
}

export default { insertOne, getAll };