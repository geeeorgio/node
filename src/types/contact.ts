export type ContactType = {
  name: string;
  age: number;
  country: string;
  category: TypeOfContact;
};

export const contactCategoryTypes = [
  'work',
  'friends',
  'family',
  'random',
] as const;

export type TypeOfContact = (typeof contactCategoryTypes)[number];

export interface GetAllContactsQuery {
  page?: number;
  perPage?: number;
  category?: string;
  sortBy?: ContactSortKey;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export const contactSortKeys = [
  'name',
  'age',
  'country',
  'createdAt',
  'updatedAt',
] as const;

export type ContactSortKey = (typeof contactSortKeys)[number];
