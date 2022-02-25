import questionService from '../services/questionService.js';

const findAll = async (_req, res, next) => {
  try {
    const result = await questionService.findAll();

    return res.status(200).json(result);
  } catch (err) {
    next(err)
  }
}

const findByType = async (req, res, next) => {
  try {
    const { type } = req.params;

    const result = await questionService.findByType(type)

    return res.status(200).json(result);
  } catch (err) {
    next(err)
  }
}

const create = async (req, res, next) => {
  try {
    const result = await questionService.create(req.body);

    return res.status(201).json(result)
  } catch (err) {
    next(err);
  }
}

export default { findAll, findByType, create };