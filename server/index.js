import express from 'express';
import cors from 'cors';
import users from './src/routes/users.js';
import questions from './src/routes/questions.js';
import types from './src/routes/types.js';
import error from './src/middlewares/error.js'
import dotenv from 'dotenv';
dotenv.config();

const corsOptions = {
  origin: process.env.ORIGIN,
  optionSuccessStatus: 200,
};

const PORT = process.env.PORT || 5000;
const app = express();


app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

app.use(express.json());
app.use(cors(corsOptions));

app.use('/user', users);
app.use('/questions', questions);
app.use('/types', types);

app.use(error);