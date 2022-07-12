import React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import Card from './Card';
import Category from './Category';

const PortFolio = ({navigation}: any) => {
  return (
    <View>
      <Category />
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate('ProjectInfo')}>
          <Card />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PortFolio;
