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
import { ActivityIndicator, IconButton, Searchbar, Surface, Text } from 'react-native-paper';

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
  const [isFiltersVisible, setFiltersVisible] = useState(false);

  const showFiltersModal = () => setFiltersVisible(true);
  const hideFilterModal = () => setFiltersVisible(false);

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useAllCharacters();

  const renderItem = useCallback(({ item }: { item: Character }) => <CharacterItem character={item} />, []);

  const handleNextPage = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderFooter = useCallback(() => <LoadingFooter loading={isFetchingNextPage} />, [isFetchingNextPage]);

  return (
    <Surface style={{ flex: 1 }}>
      <View style={{ padding: STYLES.GUTTER, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Searchbar placeholder="Search" onChangeText={setSearchQuery} value={searchQuery} />
        </View>
        <View>
          <IconButton hitSlop={10} icon="filter" size={28} onPress={showFiltersModal} />
        </View>
      </View>
      {isLoading && <ActivityIndicator />}
      {!isLoading && data && data.pages.length && (
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
