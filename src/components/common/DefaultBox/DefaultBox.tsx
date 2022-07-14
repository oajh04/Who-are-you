import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  children: React.ReactNode;
  name: string;
}

const DefaultBox = ({children, name}: Props) => {
  return (
    <View style={styles.wrapper}>
      <Text style={{fontSize: 20, marginBottom: 10, color: 'black'}}>
        {name}
      </Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
    backgroundColor: 'white',
    margin: 5,
    marginLeft: 0,
    marginRight: 0,
  },
});

export default DefaultBox;
