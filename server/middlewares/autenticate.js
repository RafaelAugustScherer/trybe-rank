import { readFileSync } from 'fs';
import jwt from 'jsonwebtoken';
import connect from '../connection.js';
const secret = readFileSync('./keys/secret.txt', 'utf-8');

const { usersCollection } = await connect();

const autenticateToken = async (req, res, next) => {
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

export default autenticateToken;