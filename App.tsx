import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import BootSplash from "react-native-bootsplash";
import { useEffect } from 'react';
import NavigatorRoot from '@/navigators/navigator.root';

const App = () => {

  useEffect(() => {
    BootSplash.hide({ fade: true });
    console.log("BootSplash has been hidden successfully");
  }, []);


  return (
    <NavigationContainer>
      <NavigatorRoot />
    </NavigationContainer>
  );
};

export default App;
