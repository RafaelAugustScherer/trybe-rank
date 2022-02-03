import { readFileSync } from 'fs';
import jwt from 'jsonwebtoken';
import connect from '../connection.js';
const secret = readFileSync('./keys/secret.txt', 'utf-8');

const { usersCollection } = await connect();

const validateUserInfo = (req, res, next) => {
  const { username, password } = req.body;
  const code = 422;

  console.log(username)

  const regexUsername = /[\w]{4,10}/i
  const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/gm

  if (!username)
    return res.status(code).json({ message: 'Username not found!' });
  if (!password)
    return res.status(code).json({ message: 'Password not found!' });
  if (!regexUsername.test(username))
    return res.status(code).json({ message: 'Invalid username!' });
  if (!regexPassword.test(password))
    return res.status(code).json({ message: 'Invalid password!' });

  next();
}

const authenticateToken = async (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token)
    return res.status(401).json({ message: 'Token not found!' });

  try {
    const { username, password } = jwt.verify(token, secret);
    const user = await usersCollection.findOne({ username, password });

    if (!user)
      return res.status(401).json({ message: 'User not found!' })

    req.user = user;
    
    next();
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }

}

export default { authenticateToken, validateUserInfo };