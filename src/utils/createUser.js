const countries = [
  'England',
  'Sweden',
  'France',
  'Italy',
  'Spain',
  'USA',
  'China',
  'Portigal',
];
const names = ['Dan', 'Pete', 'Max', 'Julia', 'Hanna', 'John', 'Rebeca'];

export const createUser = () => {
  return {
    id: String(Math.floor(Math.random() * 1000) + Date.now()),
    name: names[Math.floor(Math.random() * names.length)],
    age: String(Math.floor(Math.random() * 100)),
    country: countries[Math.floor(Math.random() * countries.length)],
  };
};
