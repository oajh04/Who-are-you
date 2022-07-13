import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../components/Home/Home';
import PortFolio from '../components/PortFolio/PortFolio';
import List from '../components/List/List';
// import {HomeSVG, PortFolioSVG} from '../assets';
import {Text} from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName={'Home'}
        backBehavior="order"
        screenOptions={{tabBarStyle: {height: 50}}}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: '프로필',
            headerStyle: {
              backgroundColor: '#121212',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            tabBarIcon: () => {
              return <Text>Home</Text>;
            },
          }}
        />
        <Tab.Screen name="PortFolio" component={PortFolio} />
        <Tab.Screen name="List" component={List} />
      </Tab.Navigator>
    </>
  );
};

export default BottomTabNavigator;
