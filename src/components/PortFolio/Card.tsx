import React from 'react';
import {StyleSheet, Text} from 'react-native';
import DefaultBox from '../common/DefaultBox/DefaultBox';

interface Props {
  name: string;
  description: string;
  start_at: string;
  end_at: string;
}

const Card = ({name, description, start_at, end_at}: Props) => {
  return (
    <DefaultBox name={name}>
      <Text style={styles.description} ellipsizeMode="tail" numberOfLines={1}>
        {description}
      </Text>
      <Text>
        {start_at} ~ {end_at}
      </Text>
    </DefaultBox>
  );
};

const styles = StyleSheet.create({
  description: {
    marginBottom: 5,
  },
});

export default Card;
