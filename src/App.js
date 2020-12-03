import * as React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';

import {ThemeProvider} from './theme/ThemeProvider';

const ScreenHeight = Dimensions.get('window').height / 100;
const ScreenWidth = Dimensions.get('window').width / 100;

// store
import store from './store';

// Router
import Router from './Router';

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <ThemeProvider>
          <View style={styles.container}>
            <Router />
          </View>
        </ThemeProvider>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
  },
  miniPlayer: {
    position: 'absolute',
    // borderWidth: 1,
    bottom: ScreenHeight * 20,
  },
});
