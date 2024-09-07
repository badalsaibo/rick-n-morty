import useAllCharacters from "@/api/hooks/useAllCharacters";
import { FlatList, View, Image } from "react-native";
import { Surface, Text } from "react-native-paper";

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


const renderItem = ({ item }: { item: Character }) => (
    <Surface style={{ padding: 10, alignItems: 'center', borderRadius: 8, width: '48%' }} elevation={4}>
        <Image
            source={{ uri: item.image }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
        />
        <Text style={{ marginLeft: 10 }}>{item.name}</Text>
    </Surface>
);

const CharacterTabScreen = () => {

    const { data, isLoading } = useAllCharacters();


    console.log(data);
    if (isLoading) {
        return <Text>Loading</Text>
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'powderblue' }}>
            {!isLoading && data && data.pages.length && (
                <FlatList
                    contentContainerStyle={{ padding: 14, gap: 10 }}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    data={data.pages.flatMap(page => page.results)}
                    renderItem={renderItem}
                    numColumns={2}
                />
            )}

        </View>
    );
}

export default CharacterTabScreen;