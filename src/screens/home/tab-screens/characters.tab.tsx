import useAllCharacters from "@/api/hooks/useAllCharacters";
import LoadingFooter from "@/components/flatlist-footer/loading-footer.component";
import { Character } from "@/types/character.type";
import { NavigationStackParamList } from "@/types/navigation/navigation-stacks.type";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback } from "react";
import { FlatList, View, Image, Pressable } from "react-native";
import { Surface, Text } from "react-native-paper";


const CharacterItem = ({ character }: { character: Character }) => {

    const navigation = useNavigation<NativeStackNavigationProp<NavigationStackParamList>>();

    const handlePress = () => {
        navigation.navigate('CharacterDetailScreen', { id: character.id });
    }

    return (
        <Pressable style={{ width: '48%', }} onPress={handlePress}>
            <Surface style={{ padding: 10, alignItems: 'center', borderRadius: 8, }}>
                <Image
                    source={{ uri: character.image }}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                />
                <Text style={{ marginLeft: 10 }}>{character.name}</Text>
            </Surface>
        </Pressable>)
};

const CharacterTabScreen = () => {

    const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage, } = useAllCharacters();

    const renderItem = useCallback(
        ({ item }: { item: Character }) => (
            <CharacterItem character={item} />
        )
        , []);


    const handleNextPage = () => {
        if (hasNextPage) {
            fetchNextPage();
        }
    }

    const renderFooter = useCallback(
        () => <LoadingFooter loading={isFetchingNextPage} />,
        [isFetchingNextPage],
    );



    return (
        <View style={{ flex: 1 }}>
            {isLoading && <Text>Loading...</Text>}
            {!isLoading && data && data.pages.length && (
                <FlatList
                    contentContainerStyle={{ padding: 14, gap: 10 }}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    data={data.pages.flatMap(page => page.results)}
                    renderItem={renderItem}
                    numColumns={2}
                    ListFooterComponent={renderFooter}
                    onEndReached={handleNextPage}
                />
            )}

        </View>
    );
}

export default CharacterTabScreen;