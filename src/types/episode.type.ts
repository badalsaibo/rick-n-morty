import { Info } from './common.type';

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};

export type Episodes = {
  info: Info;
  results: Episode[];
};
