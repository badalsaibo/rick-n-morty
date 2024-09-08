import useAllCharacters from '@/api/hooks/useAllCharacters';
import FiltersModal from '@/components/filters/filters-modal.component';
import LoadingFooter from '@/components/flatlist-footer/loading-footer.component';
import { STYLES } from '@/constants/style.constant';
import { Character } from '@/types/character.type';
import { NavigationStackParamList } from '@/types/navigation/navigation-stacks.type';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import { FlatList, View, Image, Pressable } from 'react-native';
import { ActivityIndicator, Button, IconButton, Searchbar, Surface, Text } from 'react-native-paper';
import NothingFoundImage from '@/assets/img/not-found.png';

const CharacterItem = ({ character }: { character: Character }) => {
  const navigation = useNavigation<NativeStackNavigationProp<NavigationStackParamList>>();

  const handlePress = () => {
    navigation.navigate('CharacterDetailScreen', { id: character.id });
    console.log(character.id);
  };

  return (
    <Pressable style={{ width: '48%', height: '100%' }} onPress={handlePress}>
      <Surface style={{ padding: 10, alignItems: 'center', borderRadius: 8, flex: 1, gap: 4 }} elevation={5}>
        <Image source={{ uri: character.image }} style={{ width: 50, height: 50, borderRadius: 25 }} />
        <Text style={{ textAlign: 'center' }}>{character.name}</Text>
      </Surface>
    </Pressable>
  );
};

const CharacterTabScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [reactSearchQuery, setReactSearchQuery] = useState('');
  const [isFiltersVisible, setFiltersVisible] = useState(false);

  const showFiltersModal = () => setFiltersVisible(true);
  const hideFilterModal = () => setFiltersVisible(false);

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useAllCharacters({
    name: reactSearchQuery,
  });

  const renderItem = useCallback(({ item }: { item: Character }) => <CharacterItem character={item} />, []);

  const handleNextPage = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const handleNameSearch = () => {
    setReactSearchQuery(searchQuery);
  };

  const renderFooter = useCallback(() => <LoadingFooter loading={isFetchingNextPage} />, [isFetchingNextPage]);

  const handleResetSearch = () => {
    setSearchQuery('');
    setReactSearchQuery('');
  };

  return (
    <Surface style={{ flex: 1 }}>
      <View style={{ padding: STYLES.GUTTER, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
            onIconPress={handleNameSearch}
            onSubmitEditing={handleNameSearch}
            onClearIconPress={handleResetSearch}
          />
        </View>
        <View>
          <IconButton hitSlop={10} icon="filter" size={28} onPress={showFiltersModal} />
        </View>
      </View>
      {isLoading && <ActivityIndicator />}
      {!isLoading && data && data.pages.flatMap(page => page.results).length === 0 && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: STYLES.GUTTER }}>
          <Image style={{ width: 200, height: 200, borderRadius: 25 }} source={NothingFoundImage} />
          <Text variant="bodyLarge">
            We found no data related to <Text style={{ fontWeight: 'bold' }}>{reactSearchQuery}</Text>
          </Text>
          <Button mode="contained-tonal" onPress={handleResetSearch}>
            Go back
          </Button>
        </View>
      )}
      {!isLoading && data && data.pages.length && data.pages.flatMap(page => page.results).length !== 0 && (
        <FlatList
          contentContainerStyle={{ padding: STYLES.GUTTER, gap: 10 }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          data={data.pages.flatMap(page => page.results)}
          renderItem={renderItem}
          numColumns={2}
          ListFooterComponent={renderFooter}
          onEndReached={handleNextPage}
        />
      )}
      <FiltersModal visible={isFiltersVisible} handleHideModal={hideFilterModal} />
    </Surface>
  );
};

export default CharacterTabScreen;
