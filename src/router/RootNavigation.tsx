import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import List from '../components/List/List';
import ProjectInfo from '../components/PortFolio/ProjectInfo/ProjectInfo';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ProjectInfo" component={ProjectInfo} />
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen name="Modal" component={List} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
