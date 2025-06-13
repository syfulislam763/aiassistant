import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatbotScreen from '../screens/ChatbotScreen';
import ExploreScreen from '../screens/ExploreScreen';
import { AuthContext } from '../contexts/AuthContext';
import LogoutScreen from '../screens/LogoutScreen';
import { View,Text } from 'react-native';
import AboutScreen from '../screens/AboutScreen';


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
export default function MainNavigator() {
  const {user} = useContext(AuthContext)

  return (
    <Drawer.Navigator>
      <Drawer.Screen 
        options={{
        headerRight: ({navigation}) => (
          <View style={{paddingRight:10}}>
            <Text style={{color:'#1F41BB', fontWeight:'bold', fontSize:17}}>{user?.username}</Text>
          </View>
          )
        }} 
        name="AI Assistant" 
        component={ChatbotScreen} 

      />
      <Drawer.Screen name="Explore" component={ExploreScreen} />
      <Drawer.Screen name="Who we are?" component={AboutScreen} />
      <Drawer.Screen options={{headerShown:false}} name='Logout' component={LogoutScreen}/>
    </Drawer.Navigator>
  );
}
