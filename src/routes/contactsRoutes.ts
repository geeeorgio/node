import { Router } from 'express';

import * as ContactController from '../controllers/contactsControllers.js';

const contactsRoutes = Router();

contactsRoutes.get('/', ContactController.getAllContacts);

contactsRoutes.get('/:contactId', ContactController.getContactById);

contactsRoutes.post('/', ContactController.addContact);

contactsRoutes.delete('/:contactId', ContactController.deleteContactById);

contactsRoutes.patch('/:contactId', ContactController.updateContact);

export default contactsRoutes;
