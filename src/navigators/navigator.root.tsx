import CharacterDetailScreen from '@/screens/character/character-detail.screen';
import HomeScreen from '@/screens/home/home.screen';
import { NavigationStackParamList } from '@/types/navigation/navigation-stacks.type';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<NavigationStackParamList>();

const NavigatorRoot = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CharacterDetailScreen" component={CharacterDetailScreen} />
    </Stack.Navigator>
  );
};

export default NavigatorRoot;
