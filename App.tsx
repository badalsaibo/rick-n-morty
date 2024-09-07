import { NavigationContainer } from '@react-navigation/native';

import BootSplash from "react-native-bootsplash";
import { useEffect } from 'react';
import NavigatorRoot from '@/navigators/navigator.root';
import { PaperProvider } from 'react-native-paper';

const App = () => {

  useEffect(() => {
    BootSplash.hide({ fade: true });
    console.log("BootSplash has been hidden successfully");
  }, []);


  return (
    <PaperProvider>
      <NavigationContainer>
        <NavigatorRoot />
      </NavigationContainer>
    </PaperProvider>

  );
};

export default App;
