import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

const Category = () => {
  return (
    <View>
      <Text>카테고리</Text>
      <ScrollView style={styles.categoryList} horizontal={true}>
        <Text style={styles.categoryItem}>전체</Text>
      </ScrollView>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  categoryList: {
    width: '100%',
  },
  categoryItem: {
    textAlign: 'center',
    padding: 5,
    backgroundColor: 'white',
    margin: 2,
    borderRadius: 10,
  },
});
