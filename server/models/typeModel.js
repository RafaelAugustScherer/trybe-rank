import Mongoose from 'mongoose';

const TypeSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  difficulty: {
    type: Number,
    required: true
  }
});

const Type = Mongoose.model('Type', TypeSchema);

export default Type;