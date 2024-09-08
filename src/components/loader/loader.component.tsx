import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const Loader = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
    </View>
  );
};

export default Loader;
