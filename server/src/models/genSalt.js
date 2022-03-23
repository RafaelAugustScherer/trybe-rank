import bcrypt from 'bcrypt';

const salt = bcrypt.genSaltSync(8);

console.log(salt);