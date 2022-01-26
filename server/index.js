import express from 'express';
import cors from 'cors';
import users from './routes/users.js';
import questions from './routes/questions.js';
import types from './routes/types.js';

const corsOptions = {
  origin: '*',
  optionSuccessStatus: 200,
};

const app = express();


app.listen(5000, () => console.log('server is running'));
app.use(cors(corsOptions));
app.use('/', users);
app.use('/', questions);
app.use('/', types);