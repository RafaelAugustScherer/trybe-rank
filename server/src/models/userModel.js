import Mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  completed_questions: Array,
  completed_quizes: Array,
  image_url: String,
});
userSchema.methods.hashPassword = function() {
  this.password = bcrypt.hashSync(this.password, process.env.SALT);
}

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

const User = Mongoose.model('User', userSchema);

export default User
