import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { CommonActions } from "@react-navigation/native";
import { BottomNavigation } from "react-native-paper";


type CustomTabBarProps = BottomTabBarProps & {
};


const CustomTabBar = ({ navigation, state, descriptors, insets }: CustomTabBarProps) => (
    <BottomNavigation.Bar
        navigationState={state}
        safeAreaInsets={insets}
        onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
            });

            if (event.defaultPrevented) {
                preventDefault();
            } else {
                navigation.dispatch({
                    ...CommonActions.navigate(route.name, route.params),
                    target: state.key,
                });
            }
        }}
        renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
                return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
        }}
        getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
                options.tabBarLabel !== undefined
                    ? options.tabBarLabel as string
                    : options.title !== undefined
                        ? options.title
                        : route.name;

            return label;
        }}
    />
)


export default CustomTabBar;