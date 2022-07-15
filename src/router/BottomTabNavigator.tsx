import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../components/Profile/Profile';
import PortFolio from '../components/PortFolio/PortFolio';
import {HomeSVG, LogOutSVG, PortfolioSVG, ProfileSVG} from '../assets';
import Home from '../components/Home/Home';
import {Text, View} from 'react-native';
import {setUId} from '../libs/functions/idManagement';

export type BottomTabParamList = {
  Home: undefined;
  PortFolio: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = ({navigation}: any) => {
  const onLogOut = () => {
    setUId('');
    navigation.navigate('Login');
  };

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
        <Tab.Screen
          name="Profile"
          component={Profile}
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
              return <ProfileSVG />;
            },
            headerRight: () => (
              <Text style={{marginRight: 15}} onPress={onLogOut}>
                <LogOutSVG />
              </Text>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default BottomTabNavigator;
