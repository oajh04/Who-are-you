/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Page from './Page';

interface ICarousel {
  gap: number;
  pages: any[];
  pageWidth: number;
}

const Slider = ({pages, pageWidth, gap}: ICarousel) => {
  function renderItem({item}: any) {
    return <Page item={item} key={item} />;
  }

  const onScroll = (e: any) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / (pageWidth + gap),
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        automaticallyAdjustContentInsets={false}
        data={pages}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item: any, index: number) => `page__${index}`}
        onScroll={onScroll}
        pagingEnabled
        renderItem={renderItem}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '65%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Slider;
