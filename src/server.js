import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import users from './db/users.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log('first middleware');
  next();
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:userID', (req, res) => {
  const { userID } = req.params;

  const user = users.find((u) => u.id === Number(userID));

  if (!user) {
    return res.status(404).json({
      message: `User with id ${userID} not found`,
    });
  }

  res.json(user);
});

app.use((req, res) => {
  console.log('last middleware');
  res.status(404).json({
    message: `Route ${req.url} with method ${req.method} not found`,
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.message);

  const isProd = process.env.NODE_ENV === 'production';

  res.status(500).json({
    message: isProd
      ? 'Internal Server Error. Please try again later'
      : err.message,
  });
});

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
