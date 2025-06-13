import React from 'react';
import { View, Text, Button } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function HomeScreen() {
  const { logout, user } = useContext(AuthContext);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome, {user?.username}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
