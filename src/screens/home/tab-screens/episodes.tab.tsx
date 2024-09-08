import useEpisodes from '@/api/hooks/useEpisodes';
import LoadingFooter from '@/components/flatlist-footer/loading-footer.component';
import StaticFooter from '@/components/flatlist-footer/static-footer.component';
import Loader from '@/components/loader/loader.component';
import { STYLES } from '@/constants/style.constant';
import { Episode } from '@/types/episode.type';
import { useCallback } from 'react';
import { FlatList } from 'react-native';
import { List, Surface } from 'react-native-paper';
import { Style } from 'react-native-paper/lib/typescript/components/List/utils';

const LocationItem = ({ episode }: { episode: Episode }) => {
  const leftIcon = useCallback(
    (props: { color: string; style: Style }) => <List.Icon {...props} icon="movie-open" />,
    [],
  );

  return (
    <List.Accordion title={`${episode.episode} ${episode.name}`} left={leftIcon}>
      <List.Item title={`Aired on - ${episode.air_date}`} />
    </List.Accordion>
  );
};

const EpisodesTabScreen = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useEpisodes();

  const renderItem = useCallback(({ item }: { item: Episode }) => <LocationItem episode={item} />, []);

  const handleNextPage = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderFooter = useCallback(() => {
    if (hasNextPage) {
      return <LoadingFooter loading={isFetchingNextPage} />;
    }

    if (!hasNextPage) {
      return <StaticFooter />;
    }
  }, [isFetchingNextPage, hasNextPage]);

  return (
    <Surface style={{ flex: 1 }}>
      {isLoading && <Loader />}
      {!isLoading && data && data.pages.length && (
        <FlatList
          contentContainerStyle={{ padding: STYLES.GUTTER, gap: 10 }}
          data={data.pages.flatMap(page => page.results)}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          onEndReached={handleNextPage}
        />
      )}
    </Surface>
  );
};

export default EpisodesTabScreen;
