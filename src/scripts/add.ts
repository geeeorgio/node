import fs from 'fs/promises';

import { PATH_DB } from '../constants/path.js';
import type { User } from '../types/user.js';

import { getAllUsers } from './read.js';

export const addUser = async (user: User) => {
  try {
    const oldList = await getAllUsers();

    const newList = [...oldList, user];

    await fs.writeFile(PATH_DB, JSON.stringify(newList, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error:', e);
    return [];
  }
};
