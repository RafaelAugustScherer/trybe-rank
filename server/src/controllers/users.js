import user from '../services/userService.js';

const findAll = async (_req, res, next) => {
  try {
    const result = await user.findAll();

    return res.status(200).json(result);
  } catch (err) {
    next(err)
  }
}

const findOne = async (req, res, next) => {
  try {
    const { username: usernameSearched } = req.query;
    const { username: currentUser } = req.user;

    const username = usernameSearched ? usernameSearched : currentUser

    const { _id, ...result } = await user.findOne(username)

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

const create = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await user.create({ username, password })

    return res.status(201).json(result);
  } catch (err) {
    next(err)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { username } = req.user;

    await user.update({ username }, req.body);
    return res.status(200).json(req.body);
  } catch (err) {
    next(err)
  }
}

const updateQuestion = async (req, res, next) => {
  try {
    const { username, completed_questions, completed_quizes } = req.user;
    const { newQuestions, newQuiz } = req.body;

    const result = await user.updateProgress({ 
      username, 
      completed_questions, 
      completed_quizes, 
      newQuestions,
      newQuiz
    })

    return res.status(200).json(result);
  } catch (err) {
    next(err)
  }
}

const auth = async (req, res, next) => {
  try {
    const { username, password } = req.headers;
    const token = await user.auth({ username, password });

    return res.status(200).json({ token });
  } catch (err) {
    next(err)
  }
};

export default { 
  findAll, 
  findOne, 
  create, 
  updateUser, 
  updateQuestion, 
  auth 
};