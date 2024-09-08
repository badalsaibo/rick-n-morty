import useLocations from '@/api/hooks/useLocations';
import LoadingFooter from '@/components/flatlist-footer/loading-footer.component';
import Loader from '@/components/loader/loader.component';
import { STYLES } from '@/constants/style.constant';
import { Location } from '@/types/location.type';
import { useCallback } from 'react';
import { FlatList } from 'react-native';
import { List, Surface } from 'react-native-paper';
import { Style } from 'react-native-paper/lib/typescript/components/List/utils';

const LocationItem = ({ location }: { location: Location }) => {
  const leftIcon = useCallback((props: { color: string; style: Style }) => {
    return <List.Icon {...props} icon="earth" />;
  }, []);

  return (
    <List.Accordion title={location.name} left={leftIcon}>
      <List.Item title={location.type} />
    </List.Accordion>
  );
};

const LocationsTabScreen = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useLocations();

  const renderItem = useCallback(({ item }: { item: Location }) => <LocationItem location={item} />, []);

  const handleNextPage = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderFooter = useCallback(() => <LoadingFooter loading={isFetchingNextPage} />, [isFetchingNextPage]);

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

export default LocationsTabScreen;
