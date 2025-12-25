import type { Request, Response } from 'express';
import createHttpError from 'http-errors';

import Contact from '../db/models/Contact.js';

export const getAllContacts = async (_req: Request, res: Response) => {
  const result = await Contact.find();

  res.json(result);
};

export const getContactById = async (req: Request, res: Response) => {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId);

  if (!contact)
    throw createHttpError(404, `Contact with id ${contactId} not found`);

  res.json(contact);
};

export const addContact = async (req: Request, res: Response) => {
  const { name, age, country, category } = req.body;

  if (!name || !age || !country || !category) {
    return res.status(400).json({
      message: `Contact should contain all the fields: name, age, country, category`,
    });
  }

  const contact = await Contact.create({
    name,
    age,
    country,
    category,
  });

  res.status(201).json({
    message: `Contact ${contact.name} added successfully`,
    data: contact,
  });
};

export const deleteContactById = async (req: Request, res: Response) => {
  const { contactId } = req.params;

  if (!contactId) return;

  const contactToDelete = await Contact.findByIdAndDelete(contactId);

  if (!contactToDelete) {
    throw createHttpError(404, `Contact with id ${contactId} not found`);
  }

  res.json({
    message: `Contact ${contactToDelete.name} deleted successfully`,
    deleted: contactToDelete,
  });
};

export const updateContact = async (req: Request, res: Response) => {
  const { contactId } = req.params;

  if (!contactId) return;

  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedContact)
    throw createHttpError(404, `Contact with id ${contactId} not found`);

  res.status(201).json({
    message: `Contact ${updatedContact.name} updated succesfully`,
    updated: updatedContact,
  });
};
