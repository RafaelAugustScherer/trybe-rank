import jwt from 'jsonwebtoken';
import connect from '../models/connection.js';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.TOKEN_KEY;
const { usersCollection } = await connect();

const authenticateToken = async (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token)
    return res.status(401).json({ message: 'Token not found!' });

  if (token === 'guest')
    return res.status(200).json({ message: 'Guest User' });

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

export default authenticateToken