export type ContactType = {
  name: string;
  age: string;
  country: string;
  category: TypeOfContact;
};

export const contactTypes = ['work', 'friends', 'family', 'random'] as const;

export type TypeOfContact = (typeof contactTypes)[number];
