import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  name: string;
  description: string;
  start_at: string;
  end_at: string;
}

const ProjectCard = ({name, description, start_at, end_at}: Props) => {
  return (
    <View>
      <Text style={styles.description}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text>
        {start_at} ~ {end_at}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    width: '100%',
    flexWrap: 'nowrap',
    display: 'flex',
    flexDirection: 'row',
  },
});

export default ProjectCard;
