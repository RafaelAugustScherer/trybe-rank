import Mongoose from "mongoose";

const questionSchema = new Mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  answers: {
    type: Object,
    required: true,
  },
  correct_id: String,
});

const Question = Mongoose.model('Question', questionSchema);
export default Question;
