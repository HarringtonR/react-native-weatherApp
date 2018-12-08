import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import Home from './Home';
import Weather from './Weather';

const App = createSwitchNavigator(
    {
      Home,
      Weather
    },
    {
      initialRouteName: "Home"
    }
  );


export default App;
