import { useCharacter } from '@/api/hooks/useCharacter';
import { NavigationStackParamList } from '@/types/navigation/navigation-stacks.type';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Appbar, Card, Surface, Text } from 'react-native-paper';

const FILTER_KEYS = ['name', 'status', 'species', 'type', 'gender'] as const;

const CharacterDetailScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<NavigationStackParamList, 'CharacterDetailScreen'>) => {
  const goBack = () => {
    navigation.goBack();
  };

  const id = route.params.id;

  const { data, isLoading } = useCharacter(id);

  console.log(id);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
      </Appbar.Header>

      <Surface style={{ flex: 1 }}>
        {isLoading && <ActivityIndicator />}
        {!isLoading && data && (
          <ScrollView>
            <Card.Cover style={{ borderRadius: 0 }} source={{ uri: data.image }} />
            <View style={{ padding: 14, rowGap: 10 }}>
              {Object.keys(data)
                .filter(f => FILTER_KEYS.includes(f as (typeof FILTER_KEYS)[number]))
                .filter(f => data[f as (typeof FILTER_KEYS)[number]])
                .map(prop => (
                  <View
                    key={prop}
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      alignItems: 'baseline',
                    }}>
                    <View style={{ flexBasis: '25%', alignItems: 'flex-end' }}>
                      <Text variant="bodyMedium">{prop}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text variant="titleLarge">{data[prop as (typeof FILTER_KEYS)[number]]}</Text>
                    </View>
                  </View>
                ))}
            </View>
            {/* <View style={{ padding: 14 }}>
                            <Text variant="titleLarge">{data.name} </Text>
                            <Text variant="bodyMedium">{data.location.name}</Text>
                        </View> */}
            {/* <Card.Actions>
                            <Button>Cancel</Button>
                            <Button>Ok</Button>
                        </Card.Actions> */}
          </ScrollView>
        )}
      </Surface>
    </View>
  );
};

export default CharacterDetailScreen;
