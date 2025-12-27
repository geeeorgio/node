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
