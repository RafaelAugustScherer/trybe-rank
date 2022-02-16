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
  return types;
}

const insertOne = (body) => {
  const type = new Type(body);
  typesCollection.insertOne(type, () => console.log("type has been saved"))

  return { message: 'OK' };
}

export default { insertOne, getAll };