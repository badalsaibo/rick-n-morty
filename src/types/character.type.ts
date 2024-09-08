import { Info } from './common.type';

export type StatusType = 'alive' | 'dead' | 'unknown';

export type Character = {
  id: number;
  name: string;
  status: StatusType;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type Characters = {
  info: Info;
  results: Character[];
};
