import { Router } from 'express';

import * as ContactController from '../controllers/contactsControllers.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validations/contactsValidation.js';

const contactsRoutes = Router();

contactsRoutes.get('/', ContactController.getAllContacts);

contactsRoutes.get('/:contactId', ContactController.getContactById);

contactsRoutes.post(
  '/',
  validateBody(createContactSchema),
  ContactController.addContact,
);

contactsRoutes.delete('/:contactId', ContactController.deleteContactById);

contactsRoutes.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  ContactController.updateContact,
);

export default contactsRoutes;
