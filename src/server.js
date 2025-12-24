import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { getAllUsers } from './scripts/read.js';
import { createUser } from './utils/createUser.js';
import { addUser } from './scripts/add.js';
import { deleteUser } from './scripts/delete.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log('first middleware');
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'Got to home page' });
});

app.get('/users', async (req, res) => {
  try {
    const result = await getAllUsers();

    res.json(result);
  } catch (e) {
    console.log('Error fetching users', e);
  }
});

app.get('/users/:userID', async (req, res) => {
  const { userID } = req.params;

  try {
    const users = await getAllUsers();

    const user = users.find((u) => u.id === userID);

    if (!user) {
      return res.status(404).json({
        message: `User with id ${userID} not found`,
      });
    }

    res.json(user);
  } catch (e) {
    console.log('Error finding user id', e);
  }
});

app.post('/users', async (req, res) => {
  try {
    const user = createUser();
    await addUser(user);

    res.json({
      message: `User ${user.name} added successfully`,
      data: user,
    });
  } catch (e) {
    console.log('Error adding users', e);
  }
});

app.delete('/users/:userID', async (req, res) => {
  const { userID } = req.params;
  if (!userID) return;

  try {
    const users = await getAllUsers();
    const userToDelete = users.find((u) => u.id === userID);

    if (!userToDelete) {
      return res.status(404).json({
        message: `Can not delete user with id ${userID}, user with such id not found`,
      });
    }

    await deleteUser(userToDelete);
    res.json({
      message: `User ${userToDelete.name} deleted successfully`,
    });
  } catch (e) {
    console.log('Error deleting user', e);
  }
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
