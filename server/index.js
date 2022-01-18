import express from 'express';
import users from './routes/users.js';
import questions from './routes/questions.js';

const app = express();


app.listen(5000, () => console.log('server is running'));
app.use('/', users);
app.use('/', questions);