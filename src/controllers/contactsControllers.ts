import type { Request, Response } from 'express';
import createHttpError from 'http-errors';

import * as contactsService from '../services/contactsServices.js';
import type { GetAllContactsQuery } from '../types/contact.js';

export const getAllContacts = async (
  req: Request<object, object, object, GetAllContactsQuery>,
  res: Response,
) => {
  const result = await contactsService.getAll(req.query);
  res.json(result);
};

export const getContactById = async (
  req: Request<{ contactId: string }>,
  res: Response,
) => {
  const { contactId } = req.params;
  const contact = await contactsService.getById(contactId);

  if (!contact) {
    throw createHttpError(404, `Contact with id ${contactId} not found`);
  }

  res.json(contact);
};

export const addContact = async (req: Request, res: Response) => {
  const contact = await contactsService.create(req.body);

  res.status(201).json({
    message: `Contact ${contact.name} added successfully`,
    data: contact,
  });
};

export const deleteContactById = async (
  req: Request<{ contactId: string }>,
  res: Response,
) => {
  const { contactId } = req.params;
  const contactToDelete = await contactsService.deleteById(contactId);

  if (!contactToDelete) {
    throw createHttpError(404, `Contact with id ${contactId} not found`);
  }

  res.json({
    message: `Contact deleted successfully`,
    deleted: contactToDelete,
  });
};

export const updateContact = async (
  req: Request<{ contactId: string }>,
  res: Response,
) => {
  const { contactId } = req.params;

  const updatedContact = await contactsService.update(contactId, req.body);

  if (!updatedContact) {
    throw createHttpError(404, `Contact with id ${contactId} not found`);
  }

  res.json({
    message: `Contact updated successfully`,
    updated: updatedContact,
  });
};
