import fs from 'fs/promises';

import { PATH_DB } from '../constants/path.js';
import type { User } from '../types/user.js';

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const res = await fs.readFile(PATH_DB, 'utf-8');

    return JSON.parse(res);
  } catch (e) {
    console.error('Error:', e);
    return [];
  }
};
