import questionModel from '../models/questionModel.js';

const insertOne = async (req, res) => {
  const { answers } = req.body;

  const message = await questionModel.insertOne(answers);

  res
    .status(200)
    .json(message);
}

const getOne = async (req, res) => {
  const body = req.body;
  const question = await questionModel.getOne(body);

  res
    .status(200)
    .json({ question })
}

const getAll = async (_req, res) => {
  const questions = await questionModel.getAll();

  res
    .status(200)
    .json({ questions })
}

export default { getAll, getOne, insertOne };
