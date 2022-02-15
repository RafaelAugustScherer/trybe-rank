import express from 'express';
import cors from 'cors';
import users from './controllers/users.js';
import questions from './controllers/questions.js';
import types from './controllers/types.js';

const corsOptions = {
  origin: '*',
  optionSuccessStatus: 200,
};

const PORT = 5000;
const app = express();


app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
app.use(express.json());
app.use(cors(corsOptions));
app.use('/', users);
app.use('/', questions);
app.use('/', types);