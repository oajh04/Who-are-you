import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  children: React.ReactNode;
}

const SkillCard = ({children}: Props) => {
  return (
    <View style={styles.wrapper}>
      <Text>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 7,
    borderColor: '#f7f7f7',
    borderWidth: 1,
    color: 'f7f7f7',
    borderRadius: 15,
  },
});

export default SkillCard;
