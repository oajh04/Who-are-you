import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './RootNavigation';

const Navigation = () => {
  return (
    <>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </>
  );
};

export default Navigation;
