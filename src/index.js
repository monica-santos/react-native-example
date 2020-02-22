import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import './config/ReactotronConfig';

import Stack from './routes';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
    </>
  );
};

export default App;
