import React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import Card from './Card';
import Category from './Category';

const PortFolio = ({navigation}: any) => {
  return (
    <View>
      <Category />
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProjectInfo', {id: 1})}>
          <Card />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Card />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PortFolio;
