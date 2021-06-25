import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {InitialScreen} from './screens/first-screen';
// LoginScreen
import {LoginScreen} from './screens/login-screen';
const Stack = createStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="intialScreen" component={InitialScreen} />
    <Stack.Screen name="loginScreen" component={LoginScreen} />
  </Stack.Navigator>
</NavigationContainer>
  );
}





