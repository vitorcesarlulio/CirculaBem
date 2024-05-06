import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, extendTheme } from 'native-base';
import AppNavigator from './src/navigation/AppNavigator';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

export default function App() {
  const [fontsLoaded] = useFonts({
    RobotoRegular: Roboto_400Regular,
    RobotoBold: Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null;  // Ou algum componente de loading/spinner
  }

  // Configuração do tema com a fonte Roboto
  const theme = extendTheme({
    colors: {
      // Adicionando novas cores
      primary: {
        500: '#233ED9', // Azul
      },
      secondary: {
        500: '#16E024', // Verde
      },
      background: {
        50: '#F2F2F2', // Branco suave
        100: '#FFFFFF'  // Branco puro, se necessário
      }
    },
    fontConfig: {
      Roboto: {
        400: {
          normal: 'RobotoRegular',
          italic: 'Roboto_Italic',
        },
        700: {
          normal: 'RobotoBold',
          italic: 'Roboto_BoldItalic',
        },
      },
    },
    fonts: {
      heading: 'Roboto',
      body: 'Roboto',
      mono: 'Roboto',
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
