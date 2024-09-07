import useAllCharacters from "@/api/hooks/useAllCharacters";
import LoadingFooter from "@/components/flatlist-footer/loading-footer.component";
import { useCallback } from "react";
import { FlatList, View, Image, Pressable } from "react-native";
import { Surface, Text, TouchableRipple } from "react-native-paper";

type Character = {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
};


const renderItem = ({ item }: { item: Character }) => {

    const handlePress = () => {
        console.log('hello', item.id)
    }

    return (
        <Pressable style={{ padding: 10, alignItems: 'center', borderRadius: 8, width: '48%', backgroundColor: 'gray' }} onPress={handlePress}>
            <Image
                source={{ uri: item.image }}
                style={{ width: 50, height: 50, borderRadius: 25 }}
            />
            <Text style={{ marginLeft: 10 }}>{item.name}</Text>
        </Pressable>)
};

const CharacterTabScreen = () => {

    const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage, } = useAllCharacters();


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
        <View style={{ flex: 1, backgroundColor: 'powderblue' }}>
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