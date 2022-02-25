import Mongoose from 'mongoose';

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
  completed_quizes: Array
});
const User = Mongoose.model('User', userSchema);

export default User
