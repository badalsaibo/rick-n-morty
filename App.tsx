import { NavigationContainer } from '@react-navigation/native';

import BootSplash from "react-native-bootsplash";
import { useEffect } from 'react';
import NavigatorRoot from '@/navigators/navigator.root';
import { PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()


const App = () => {

  useEffect(() => {
    BootSplash.hide({ fade: true });
    console.log("BootSplash has been hidden successfully");
  }, []);


  return (

    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <NavigatorRoot />
        </NavigationContainer>
      </QueryClientProvider>
    </PaperProvider>

  );
};

export default App;
