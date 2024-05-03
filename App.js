import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { NativeBaseProvider } from 'native-base';

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
