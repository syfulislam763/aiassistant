import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/AuthContext';
import AppNavigator from './navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
          <AppNavigator />
        </SafeAreaView>
      </NavigationContainer>
    </AuthProvider>
  );
}
