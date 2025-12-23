import express from 'express';
import 'dotenv/config';
import users from './db/users.js';

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Home page</h1>');
});

app.get('/notes', (req, res) => {
  res.send('<h1>Notes page</h1>');
});

app.get('/users', (req, res) => {
  res.json(users);
});

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
