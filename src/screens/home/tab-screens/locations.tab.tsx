import useAllCharacters from '@/api/hooks/useAllCharacters';
import useLocations from '@/api/hooks/useLocations';
import LoadingFooter from '@/components/flatlist-footer/loading-footer.component';
import { Character } from '@/types/character.type';
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
    // navigation.navigate('CharacterDetailScreen', { id: location.id });
    setExpanded(!expanded);
  };

  return (
    // <Pressable>
    //   <Surface style={{ padding: 10, borderRadius: 8, flex: 1 }}>
    //     <Text variant="titleMedium">{location.name}</Text>
    //     <Text>{location.type}</Text>
    //   </Surface>
    // </Pressable>
    <List.Accordion title={location.name} left={props => <List.Icon {...props} icon="earth" />}>
      <List.Item title={location.type} />
      <List.Item title="Second item" />
    </List.Accordion>
  );
};

const LocationsTabScreen = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useLocations();

  const renderItem = useCallback(
    ({ item }: { item: Location }) => <LocationItem location={item} />,
    [],
  );

  const handleNextPage = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderFooter = useCallback(
    () => <LoadingFooter loading={isFetchingNextPage} />,
    [isFetchingNextPage],
  );

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

export default LocationsTabScreen;
