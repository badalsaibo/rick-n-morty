export const FILTERS = [
  {
    name: 'status',
    values: ['alive', 'dead', 'unknown'],
  },
  {
    name: 'gender',
    values: ['male', 'female', 'genderless', 'unknown'],
  },
] as const;

export type Filter = (typeof FILTERS)[number];

export type FilterKeys = (typeof FILTERS)[number]['name'];
