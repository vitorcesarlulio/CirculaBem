import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import SelectDateScreen from '../screens/SelectDateScreen';
import FinalizeRentalScreen from '../screens/FinalizeRentalScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Forgot Password' }} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SearchResults" component={SearchResultsScreen} options={{ title: 'Search Results' }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Product Details' }} />
      <Stack.Screen name="SelectDate" component={SelectDateScreen} options={{ title: 'Select Date' }} />
        <Stack.Screen name="FinalizeRental" component={FinalizeRentalScreen} options={{ title: 'Finalize Rental' }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;