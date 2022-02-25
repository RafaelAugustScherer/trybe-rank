import Type from '../services/typeService.js';

const findAll = async (req, res, next) => {
  try {
    const result = await Type.findAll();
  
    return res.status(200).json(result);
  } catch (err) {
    next(err)
  }
}

const create = async (req, res, next) => {
  try {
    const result = await Type.create(req.body);
    
    return res.status(201).json(result);
  } catch (err) {
    next(err)
  }
}

export default { findAll, create };
