import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LayoutScreen from '../screens/LayoutScreen';

const Stack = createNativeStackNavigator();


export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown:false}} name="Layout" component={LayoutScreen} />
      <Stack.Screen options={{headerShown:false}} name="Login" component={LoginScreen} />
      <Stack.Screen options={{headerShown:false}} name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
