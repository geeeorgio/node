import { Router } from 'express';

import * as ContactController from '../controllers/contactsControllers.js';
import { validateBody } from '../middlewares/validateBody.js';
import { validateId } from '../middlewares/validateId.js';
import { validateQuery } from '../middlewares/validateQuery.js';
import {
  contactIdSchema,
  createContactSchema,
  getContactsQuerySchema,
  updateContactSchema,
} from '../validations/contactsValidation.js';

const contactsRoutes = Router();

contactsRoutes.get(
  '/',
  validateQuery(getContactsQuerySchema),
  ContactController.getAllContacts,
);

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
