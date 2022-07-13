import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProjectInfo from '../components/ProjectInfo/ProjectInfo';
import BottomTabNavigator from './BottomTabNavigator';
import Login from '../components/Login/Login';

export type RootStackParamList = {
  Root: any;
  ProjectInfo: {id: number};
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProjectInfo"
        component={ProjectInfo}
        options={{
          title: '홈',
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      {/* <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen name="Modal" component={List} />
      </Stack.Group> */}
    </Stack.Navigator>
  );
}
