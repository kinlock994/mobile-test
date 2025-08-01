import React from 'react';
import { Provider } from 'react-redux';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import BootSplash from 'react-native-bootsplash';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { store } from '@store/index';
import RootNavigator from '@navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer
          onReady={() => BootSplash.hide({ fade: true })}
          theme={{
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              background: '#ffffff',
            },
          }}
        >
          <RootNavigator />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
