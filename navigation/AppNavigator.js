import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

export default function AppNavigator() {
  const { user } = useContext(AuthContext);
  return user ? <MainNavigator /> : <AuthNavigator />;
}
