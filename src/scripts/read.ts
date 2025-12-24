import fs from 'fs/promises';

import { PATH_DB } from '../constants/path.js';

export const getAllUsers = async () => {
  try {
    const res = await fs.readFile(PATH_DB, 'utf-8');

    return JSON.parse(res);
  } catch (e) {
    console.error('Error:', e);
  }
};
