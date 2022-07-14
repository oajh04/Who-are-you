import React from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';

interface IPage {
  item: string;
}

const Page = ({item}: IPage) => {
  return (
    // <View >
    <Image source={{uri: item}} style={styles.wrapper} />
    // </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: Dimensions.get('window').width - 50,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});

export default Page;
