import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CharactersScreen from "./screens/characters.screen";

const Tab = createBottomTabNavigator();


const HomeScreen = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="CharactersScreen" component={CharactersScreen} />
        </Tab.Navigator>
    );
}

export default HomeScreen;