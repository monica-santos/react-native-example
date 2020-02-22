import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';

const Stack = createStackNavigator();

const options = {
  headerBackTitleVisible: false,
  headerTitleAlign: 'center',
  headerShown: true,
  headerStyle: {
    backgroundColor: '#7159c1',
  },
  headerTintColor: '#fff',
};

const RootStack = () => (
  <Stack.Navigator
    initialRouteName="Main"
    screenOptions={{
      gestureEnabled: false,
    }}
  >
    <Stack.Screen
      name="Main"
      component={Main}
      options={{ ...options, headerTitle: 'Main Page' }}
    />
    <Stack.Screen
      name="User"
      component={User}
      options={{ ...options, headerTitle: 'Usuários' }}
    />
  </Stack.Navigator>
);

export default RootStack;
