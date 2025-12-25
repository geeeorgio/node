import { Router } from 'express';

import {
  addUser,
  deleteUserById,
  getAllUsers,
  getUserById,
} from '../controllers/contactsControllers.js';

const contactsRoutes = Router();

contactsRoutes.get('/', getAllUsers);

contactsRoutes.get('/:contactId', getUserById);

contactsRoutes.post('/', addUser);

contactsRoutes.delete('/:contactId', deleteUserById);

export default contactsRoutes;
