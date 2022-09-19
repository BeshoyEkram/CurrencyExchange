import React, {  useEffect } from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './navigation/AppStack';
import { navigationRef } from './navigation/NavigationServices';
import Reactotron from 'reactotron-react-native';
import reactotron from 'utils/Reactron'
import { Provider } from 'react-redux';
import {store} from 'store'
import { theme } from 'utils';

const App: any = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {

    if (__DEV__) {
      import('utils/Reactron').then(() =>
        Reactotron.logImportant?.('Reactotron Configured Successfully'),
      );
      Reactotron.display({
        name: 'custom',
        important: true,
        preview: 'iam custom',
        value: { a: 1, b: 2, c: [1, 2, 3, 4, 5] },
        image:
          'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
      });
    }
  }, [])

  return (
    <Provider store={store}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={theme.primary}
        />
        <NavigationContainer ref={navigationRef} >
          <AppStack />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );

};

const AppWithReactotron = __DEV__ ? reactotron.overlay(App) : App;
export default AppWithReactotron
