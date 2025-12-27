import Contact, { type ContactProps } from '../db/models/Contact.js';
import type { ContactType } from '../types/contact.js';

export const getAll = (): Promise<ContactProps[]> => Contact.find();

export const getById = (id: string): Promise<ContactProps | null> =>
  Contact.findById(id);

export const create = (data: ContactType): Promise<ContactProps> =>
  Contact.create(data);

export const deleteById = (id: string): Promise<ContactProps | null> =>
  Contact.findByIdAndDelete(id);

export const update = (
  id: string,
  data: Partial<ContactType>,
): Promise<ContactProps | null> =>
  Contact.findByIdAndUpdate(id, data, { new: true, runValidators: true });
