import Contact, { type ContactProps } from '../db/models/Contact.js';
import type { ContactType, GetAllContactsQuery } from '../types/contact.js';

export const getAll = async ({
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'desc',
  category,
  search,
}: GetAllContactsQuery) => {
  const p = Number(page);
  const pp = Number(perPage);

  const limit = pp;
  const skip = (p - 1) * pp;

  const requestQuery = Contact.find();
  if (category) {
    requestQuery.where('category').equals(category);
  }

  if (search) {
    requestQuery.where({
      name: {
        $regex: search,
        $options: 'i',
      },
    });
  }

  const [items, totalContacts] = await Promise.all([
    requestQuery
      .clone()
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder }),
    requestQuery.countDocuments(),
  ]);

  return {
    data: items,
    currentPage: p,
    currentPerPage: pp,
    totalContacts,
  };
};

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
