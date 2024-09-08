import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const LoadingFooter = ({ loading = false }: { loading?: boolean }) => {
  return (
    <View style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
      {loading && <ActivityIndicator />}
    </View>
  );
};

export default LoadingFooter;
