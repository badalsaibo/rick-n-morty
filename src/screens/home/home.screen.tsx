import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CharacterTabScreen from "./tab-screens/characters.tab";
import CustomTabBar from "@/components/tab/custom-tab.component";
import { Icon } from "react-native-paper";
import LocationsTabScreen from "./tab-screens/location.tab";
import EpisodesTabScreen from "./tab-screens/episodes.tab";
import { TabRootParamList } from "@/types/navigation/tab.type";

const Tab = createBottomTabNavigator<TabRootParamList>();

const DEFAULT_TABS = [
    { name: 'CharactersTabScreen', component: CharacterTabScreen, tabBarLabel: 'Characters', iconSource: 'account-group' },
    { name: 'LocationsTabScreen', component: LocationsTabScreen, tabBarLabel: 'Locations', iconSource: 'earth' },
    { name: 'EpisodesTabScreen', component: EpisodesTabScreen, tabBarLabel: 'Episodes', iconSource: 'play-box-multiple' }
]


const HomeScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
            tabBar={CustomTabBar}
        >
            {DEFAULT_TABS.map(({ name, iconSource, tabBarLabel, component }) => (
                <Tab.Screen
                    name={name as keyof TabRootParamList}
                    component={component}
                    options={{
                        tabBarLabel,
                        tabBarIcon: ({ color, size }) => {
                            return <Icon source={iconSource} size={size} color={color} />;
                        },
                    }}
                />
            ))}

        </Tab.Navigator>
    );
}

export default HomeScreen;