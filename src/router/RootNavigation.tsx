import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProjectInfo from '../components/ProjectInfo/ProjectInfo';
import BottomTabNavigator, {BottomTabParamList} from './BottomTabNavigator';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import CreateProfile from '../components/CreateProfile/CreateProfile';
import UserProfile from '../components/UserProfile/Profile';
import CreateProject from '../components/CreateProject/CreateProject';

export type RootStackParamList = BottomTabParamList & {
  Root: undefined;
  ProjectInfo: {id: string};
  Login: undefined;
  Register: undefined;
  CreateProfile: {uid: string};
  UserProfile: {uid: string};
  CreateProject: undefined;
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
          title: '프로젝트',
        }}
      />
      <Stack.Screen
        name="CreateProject"
        component={CreateProject}
        options={{
          title: '프로젝트',
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{title: '로그인'}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{title: '회원가입'}}
      />
      <Stack.Screen
        name="CreateProfile"
        component={CreateProfile}
        options={{title: '프로필 생성'}}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          title: '프로필',
          headerStyle: {
            backgroundColor: '#121212',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}
