import useEpisode from '@/api/hooks/useEpisode';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

const EpisodeDetails = ({ episodeId }: { episodeId: number }) => {
  const { data, isLoading } = useEpisode(episodeId);

  return (
    <View>
      {isLoading && <ActivityIndicator />}
      {!isLoading && data && <Text>{data.episode}</Text>}
    </View>
  );
};

export default EpisodeDetails;
