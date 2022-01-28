import crypto from 'crypto';

const generateToken = () => {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
}

export default generateToken;
