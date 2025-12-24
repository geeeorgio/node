import fs from 'fs/promises';
import { getAllUsers } from './read.js';
import { PATH_DB } from '../constants/path.js';

export const deleteUser = async (user) => {
  const oldList = await getAllUsers();

  if (oldList.length === 0) return [];

  const newList = oldList.filter((u) => u.id !== user.id);

  try {
    await fs.writeFile(PATH_DB, JSON.stringify(newList, null, 2), 'utf-8');
  } catch (e) {
    console.log('Error:', e);
  }
};
