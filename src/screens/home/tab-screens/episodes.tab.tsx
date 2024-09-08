import useAllCharacters from '@/api/hooks/useAllCharacters';
import useEpisodes from '@/api/hooks/useEpisodes';
import useLocations from '@/api/hooks/useLocations';
import LoadingFooter from '@/components/flatlist-footer/loading-footer.component';
import StaticFooter from '@/components/flatlist-footer/static-footer.component';
import { Character } from '@/types/character.type';
import { Episode } from '@/types/episode.type';
import { Location } from '@/types/location.type';
import { NavigationStackParamList } from '@/types/navigation/navigation-stacks.type';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import { FlatList, View, Image, Pressable } from 'react-native';
import { ActivityIndicator, List, Surface, Text } from 'react-native-paper';

const LocationItem = ({ episode }: { episode: Episode }) => {
  const [expanded, setExpanded] = useState(true);

  const handlePress = () => {
    setExpanded(!expanded);
  };

  return (
    <List.Accordion
      title={`${episode.episode} ${episode.name}`}
      left={props => <List.Icon {...props} icon="movie-open" />}>
      <List.Item title={episode.air_date} />
    </List.Accordion>
  );
};

const EpisodesTabScreen = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useEpisodes();

  const renderItem = useCallback(
    ({ item }: { item: Episode }) => <LocationItem episode={item} />,
    [],
  );

  const handleNextPage = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderFooter = useCallback(() => {
    if (hasNextPage) {
      return <LoadingFooter loading={isFetchingNextPage} />;
    }
    return <StaticFooter />;
  }, [isFetchingNextPage]);

  return (
    <View style={{ flex: 1 }}>
      {isLoading && <ActivityIndicator />}
      {!isLoading && data && data.pages.length && (
        <FlatList
          contentContainerStyle={{ padding: 14, gap: 10 }}
          data={data.pages.flatMap(page => page.results)}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          onEndReached={handleNextPage}
        />
      )}
    </View>
  );
};

export default EpisodesTabScreen;
