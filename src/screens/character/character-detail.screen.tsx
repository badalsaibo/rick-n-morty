import { useCharacter } from "@/api/hooks/useCharacter";
import { NavigationStackParamList } from "@/types/navigation/navigation-stacks.type";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { ActivityIndicator, Appbar, Button, Card, MD2Colors, Surface, Text } from "react-native-paper";

const CharacterDetailScreen = ({ route, navigation }: NativeStackScreenProps<NavigationStackParamList, 'CharacterDetailScreen'>) => {

    const goBack = () => {
        navigation.goBack();
    }

    const id = route.params.id;

    const { data, isLoading } = useCharacter(id);

    console.log(id);

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={goBack} />
            </Appbar.Header>

            <Surface style={{ flex: 1, padding: 14 }}>
                {isLoading && <ActivityIndicator />}
                {!isLoading && data && (
                    <Card>
                        <Card.Content>
                            <Text variant="titleLarge">{data.name} </Text>
                            <Text variant="bodyMedium">{data.location.name}</Text>
                        </Card.Content>
                        <Card.Cover source={{ uri: data.image }} />
                        {/* <Card.Actions>
                            <Button>Cancel</Button>
                            <Button>Ok</Button>
                        </Card.Actions> */}
                    </Card>
                )}
            </Surface>
        </View>
    );
}

export default CharacterDetailScreen;