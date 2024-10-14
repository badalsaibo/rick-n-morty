import { NavigationContainer } from '@react-navigation/native';

import BootSplash from 'react-native-bootsplash';
import { useEffect } from 'react';
import NavigatorRoot from '@/navigators/navigator.root';
import { PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EpisodeListProvider from '@/providers/episode-list.provider';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);

  return (
    <EpisodeListProvider>
      <PaperProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <NavigatorRoot />
          </NavigationContainer>
        </QueryClientProvider>
      </PaperProvider>
    </EpisodeListProvider>
  );
};

export default App;
