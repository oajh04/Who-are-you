import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const Home = () => {
  return (
    <>
      <View style={styles.wrapper}>
        <Text style={styles.title}>한준호</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  title: {
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#61dafb',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Home;
