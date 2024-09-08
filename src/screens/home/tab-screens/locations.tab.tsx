import useAllCharacters from '@/api/hooks/useAllCharacters';
import useLocations from '@/api/hooks/useLocations';
import LoadingFooter from '@/components/flatlist-footer/loading-footer.component';
import { STYLES } from '@/constants/style.constant';
import { Location } from '@/types/location.type';
import { NavigationStackParamList } from '@/types/navigation/navigation-stacks.type';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import { FlatList, View, Image, Pressable } from 'react-native';
import { ActivityIndicator, List, Surface, Text } from 'react-native-paper';

const LocationItem = ({ location }: { location: Location }) => {
  const [expanded, setExpanded] = useState(true);

  const navigation = useNavigation<NativeStackNavigationProp<NavigationStackParamList>>();

  const handlePress = () => {
    setExpanded(!expanded);
  };

  return (
    <List.Accordion title={location.name} left={props => <List.Icon {...props} icon="earth" />}>
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
      {isLoading && <ActivityIndicator />}
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
