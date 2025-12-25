import type { Request, Response } from 'express';

import Contact from '../db/models/Contact.js';

export const getAllUsers = async (_req: Request, res: Response) => {
  const result = await Contact.find();

  res.json(result);
};

export const getUserById = async (req: Request, res: Response) => {
  const { contactId } = req.params;

  if (!contactId) return;

  try {
    const contact = await Contact.findById(contactId);

    res.json(contact);
  } catch (e) {
    if (e instanceof Error) {
      console.error(`Error: ${e.message}`);
    }

    return res.status(404).json({
      message: `Contact with id ${contactId} does not exist.`,
    });
  }
};

export const addUser = async (req: Request, res: Response) => {
  const { name, age, country } = req.params;

  if (!name || !age || !country) {
    return res.status(400).json({
      message: `Contact should contain all the fields: name, age, country`,
    });
  }

  const contact = await Contact.create({
    name,
    age,
    country,
  });

  res.json({
    message: `User ${contact.name} added successfully`,
    data: contact,
  });
};

export const deleteUserById = async (req: Request, res: Response) => {
  const { contactId } = req.params;

  if (!contactId) return;

  const contactToDelete = await Contact.findById(contactId);

  if (!contactToDelete) {
    return res.status(404).json({
      message: `Can not delete contact, contact with id ${contactId} not found`,
    });
  }

  await Contact.findByIdAndDelete(contactId);

  res.json({
    message: `Contact deleted successfully`,
  });
};
