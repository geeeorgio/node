import type { User } from '../types/user.js';

const countries = [
  'England',
  'Sweden',
  'France',
  'Italy',
  'Spain',
  'USA',
  'China',
  'Portugal',
];

const names = ['Dan', 'Pete', 'Max', 'Julia', 'Hanna', 'John', 'Rebeca'];

export const createUser = (): User => {
  const randomName =
    names[Math.floor(Math.random() * names.length)] ?? 'Default Name';
  const randomCountry =
    countries[Math.floor(Math.random() * countries.length)] ??
    'Default Country';

  return {
    id: String(Math.floor(Math.random() * 1000) + Date.now()),
    name: randomName,
    age: String(Math.floor(Math.random() * 100)),
    country: randomCountry,
  };
};
