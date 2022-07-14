import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../components/Home/Home';
import PortFolio from '../components/PortFolio/PortFolio';
import CreateProject from '../components/CreateProject/CreateProject';
import {HomeSVG, PortfolioSVG} from '../assets';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName={'Home'}
        backBehavior="order"
        screenOptions={{tabBarStyle: {height: 50}, tabBarShowLabel: false}}>
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
              return <HomeSVG />;
            },
          }}
        />
        <Tab.Screen
          name="PortFolio"
          component={PortFolio}
          options={{
            tabBarIcon: () => {
              return <PortfolioSVG />;
            },
          }}
        />
        <Tab.Screen name="CreateProject" component={CreateProject} />
      </Tab.Navigator>
    </>
  );
};

export default BottomTabNavigator;
