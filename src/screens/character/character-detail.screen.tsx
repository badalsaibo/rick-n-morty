import { useCharacter } from '@/api/hooks/useCharacter';
import EpisodeDetails from '@/components/episode-details/episode-details.component';
import LocationDetails from '@/components/location-details/location-details.component';
import { STYLES } from '@/constants/style.constant';
import { NavigationStackParamList } from '@/types/navigation/navigation-stacks.type';
import { getIdFromUrl } from '@/utils/helper.util';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Appbar, Card, MD2Colors, MD3Colors, Surface, Text } from 'react-native-paper';

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
            <Card.Cover style={{ borderRadius: 0, height: 300 }} source={{ uri: data.image }} />
            <View style={{ padding: STYLES.GUTTER, rowGap: 10 }}>
              <Text variant="headlineLarge" style={{}}>
                {data.name}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 100,
                    backgroundColor: MD2Colors.green500,
                    overflow: 'hidden',
                  }}></View>
                <Text variant="bodyLarge">
                  {data.status} - {data.species}
                </Text>
              </View>
              <View>
                <Text>Last know location</Text>
                <Text variant="bodyLarge">{data.location.name}</Text>
              </View>
              <View>
                <Text>Gender</Text>
                <Text variant="bodyLarge">{data.gender}</Text>
              </View>
              <View>
                <Text>Origin</Text>
                <Text variant="bodyLarge">{data.origin.name}</Text>
              </View>
              <View>
                <LocationDetails locationId={getIdFromUrl(data.location.url)} />
              </View>
              <View>
                <View>
                  <Text>First seen in</Text>
                  <EpisodeDetails episodeId={getIdFromUrl(data.episode[0])} />
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </Surface>
    </View>
  );
};

export default CharacterDetailScreen;
