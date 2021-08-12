import React, { useState } from 'react';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import AppRoot from './app/AppRoot';
import { store } from './app/redux/store';

const App: React.FC = (): JSX.Element => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const loadResources = async (): Promise<void> => {
    await Promise.all([
      Font.loadAsync({
        'Gilroy-Bold': require('./assets/fonts/Gilroy-Bold.ttf'),
        'Gilroy-Regular': require('./assets/fonts/Gilroy-Regular.ttf'),
        'Gilroy-Semibold': require('./assets/fonts/Gilroy-Semibold.otf'),
        'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
        'Lato-Regular': require('./assets/fonts/Lato-Reg.ttf'),
        'Lato-Semibold': require('./assets/fonts/Lato-Semibold.ttf'),
      }),
    ]);
  };

  if (!loaded) {
    return (
      <AppLoading
        startAsync={loadResources}
        onFinish={(): void => setLoaded(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <AppRoot />
    </Provider>
  );
};

export default App;
