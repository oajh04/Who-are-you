import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../components/Home/Home';
import PortFolio from '../components/PortFolio/PortFolio';
import List from '../components/List/List';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <>
      <Tab.Navigator initialRouteName={'Home'} backBehavior="order">
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="PortFolio" component={PortFolio} />
        <Tab.Screen name="List" component={List} />
      </Tab.Navigator>
    </>
  );
};

export default BottomTabNavigator;
