import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './RootNavigation';
import {SafeAreaView} from 'react-native';

const Navigation = () => {
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

export default Navigation;
