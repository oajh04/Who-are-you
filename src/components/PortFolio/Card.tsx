import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Card = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Pick</Text>
      <Text>교내 방과후 출석부 시스템입니다.</Text>
      <Text>21.07 ~ 22.07</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    margin: 5,
    marginLeft: 0,
    marginRight: 0,
    padding: 15,
  },
});

export default Card;
