import React from 'react';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {enableScreens} from 'react-native-screens';
import AppNavigator from './src/navigation/AppNavigator';
import store from './src/store';

import NavService from './src/navigation/NavigationService';

enableScreens();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PaperProvider>
          <AppNavigator
            ref={(navigatorRef) =>
              NavService.setTopLevelNavigator(navigatorRef)
            }
          />
        </PaperProvider>
      </Provider>
    );
  }
}

export default App;
