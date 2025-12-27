import { Router } from 'express';

import * as ContactController from '../controllers/contactsControllers.js';
import { validateBody } from '../middlewares/validateBody.js';
import { validateId } from '../middlewares/validateId.js';
import {
  contactIdSchema,
  createContactSchema,
  updateContactSchema,
} from '../validations/contactsValidation.js';

const contactsRoutes = Router();

contactsRoutes.get('/', ContactController.getAllContacts);

contactsRoutes.get(
  '/:contactId',
  validateId(contactIdSchema),
  ContactController.getContactById,
);

contactsRoutes.post(
  '/',
  validateBody(createContactSchema),
  ContactController.addContact,
);

contactsRoutes.delete(
  '/:contactId',
  validateId(contactIdSchema),
  ContactController.deleteContactById,
);

contactsRoutes.patch(
  '/:contactId',
  validateId(contactIdSchema),
  validateBody(updateContactSchema),
  ContactController.updateContact,
);

export default contactsRoutes;
