/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Page from './Page';

interface ICarousel {
  pages: any[];
}

const Slider = ({pages}: ICarousel) => {
  function renderItem({item}: any) {
    return <Page item={item} key={item} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pages}
        horizontal
        keyExtractor={(index: number) => `page_${index}`}
        pagingEnabled
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Slider;
