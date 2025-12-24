import cors from 'cors';
import type { Request, Response, NextFunction } from 'express';
import express from 'express';
import 'dotenv/config';

import { addUser } from './scripts/add.js';
import { deleteUser } from './scripts/delete.js';
import { getAllUsers } from './scripts/read.js';
import { createUser } from './utils/createUser.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use((_req: Request, _res: Response, next: NextFunction) => {
  console.warn('first middleware');
  next();
});

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Got to home page' });
});

app.get('/users', async (_req: Request, res: Response) => {
  try {
    const result = await getAllUsers();

    res.json(result);
  } catch (e) {
    const message =
      e instanceof Error
        ? `Error fetching users ${e.message}`
        : 'Something went wrong.';
    console.error(message);
  }
});

app.get('/users/:userID', async (req: Request, res: Response) => {
  const { userID } = req.params;
  if (!userID) {
    return res.status(404).json({
      message: `User with id ${userID} not found`,
    });
  }

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
    const message =
      e instanceof Error
        ? `Error finding user id, ${e.message}`
        : 'Something went wrong';
    console.error(message);
  }
});

app.post('/users', async (_req: Request, res: Response) => {
  try {
    const user = createUser();
    await addUser(user);

    res.json({
      message: `User ${user.name} added successfully`,
      data: user,
    });
  } catch (e) {
    const message =
      e instanceof Error
        ? `Error adding users, ${e.message}`
        : 'Something went wrong';
    console.error(message);
  }
});

app.delete('/users/:userID', async (req: Request, res: Response) => {
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
    const message =
      e instanceof Error
        ? `Error deleting user, ${e.message}`
        : 'Something went wrong';
    console.error(message);
  }
});

app.use((req: Request, res: Response) => {
  console.warn('Last middleware actcion - no valid routes found');

  res.status(404).json({
    message: `Route ${req.url} with method ${req.method} not found`,
  });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err.message);

  const isDev = process.env.NODE_ENV === 'development';

  res.status(500).json({
    message: isDev
      ? err.message
      : 'Internal Server Error. Please try again later',
  });
});

const port = Number(process.env.PORT) || 3000;

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server running on port ${port}`));
