import API_ENDPOINTS from '@/api/api-endpoints.constant';
import apiClient from '@/api/axios-instance';
import { useEpisodeList } from '@/providers/episode-list.provider';
import { Episode } from '@/types/episode.type';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

const EpisodeList = ({ episodeId }: { episodeId: number }) => {
  const { episodeList, addToEpisodeList } = useEpisodeList();

  const [isLoading, setIsLoading] = useState(false);
  const [episode, setEpisode] = useState<Episode | null>(episodeList[episodeId] ?? null);

  useEffect(() => {
    if (!episode) {
      console.log('fetching episode id =====================>', episodeId);
      setIsLoading(true);
      apiClient
        .get(API_ENDPOINTS.public.get.episode(episodeId))
        .then(res => {
          const ep = res.data;
          addToEpisodeList(ep);
          setEpisode(ep);
        })
        .catch(err => console.error('error fetching episode', err))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [addToEpisodeList, episode, episodeId, episodeList]);

  return (
    <View>
      {isLoading && <ActivityIndicator />}
      {!isLoading && episode && <Text>{episode.name}</Text>}
    </View>
  );
};

export default EpisodeList;
