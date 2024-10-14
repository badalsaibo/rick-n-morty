import { Episode } from '@/types/episode.type';
import { createContext, useContext, useState } from 'react';

type EpisodeListType = {
  [any: number]: Episode;
};

type EpisodeListContextType = {
  episodeList: EpisodeListType;
  addToEpisodeList: (val: Episode) => void;
};

const EpisodeListContext = createContext<EpisodeListContextType>({});

const EpisodeListProvider = ({ children }: { children: React.ReactNode }) => {
  const [episodeList, setEpisodeList] = useState({});
  const addToEpisodeList = (episode: Episode) => {
    setEpisodeList(prev => {
      const newObject = prev;
      newObject[episode.id] = episode;
      return newObject;
    });
  };
  return (
    <EpisodeListContext.Provider value={{ episodeList, addToEpisodeList }}>{children}</EpisodeListContext.Provider>
  );
};

export const useEpisodeList = () => useContext(EpisodeListContext);

export default EpisodeListProvider;
