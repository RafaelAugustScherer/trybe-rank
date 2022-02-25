import typeModel from "../models/typeModel.js";
import connect from '../models/connection.js';
const { typesCollection } = await connect();

const findAll = async () => {
  const types = await typesCollection.find().toArray();
  return types;
}

const create = async (params) => {
  const type = new typeModel(params);
  const { insertedId } = await typesCollection.insertOne(type)

  return { id: insertedId, ...params };
}

export default { findAll, create }