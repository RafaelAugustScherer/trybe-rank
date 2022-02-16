import typeModel from "../models/typeModel.js";

const getAll = async (_req, res) => {
  const types = await typeModel.getAll();

  if (!types)
    return res.status(404).json({ message: 'Types not Found' })

  res
    .status(200)
    .json(types);
}

const insertOne = async (req, res) => {
  const body = req.body;

  const message = await typeModel.insertOne(body);
  res
    .status(200)
    .json(message)
}


export default { getAll, insertOne }