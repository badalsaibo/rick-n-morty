import useLocation from '@/api/hooks/useLocation';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

const LocationDetails = ({ locationId }: { locationId: number }) => {
  const { data, isLoading } = useLocation(locationId);

  return (
    <View>
      {isLoading && <ActivityIndicator />}
      {!isLoading && data && (
        <View style={{ gap: 10 }}>
          <View>
            <Text>Type</Text>
            <Text variant="bodyLarge">{data.type}</Text>
          </View>

          <View>
            <Text>Dimension</Text>
            <Text variant="bodyLarge">{data.dimension}</Text>
          </View>
          <View>
            <Text>No. of residents</Text>
            <Text variant="bodyLarge">{data.residents.length}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default LocationDetails;
