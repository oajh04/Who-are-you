import React from 'react';
import {StyleSheet, View} from 'react-native';
import DefaultBox from '../../common/DefaultBox/DefaultBox';
import SkillCard from './SkillCard';

interface Props {
  skill_arr: string[];
}

const SkillBox = ({skill_arr}: Props) => {
  return (
    <DefaultBox name="Skill">
      <View style={styles.skillBox}>
        {skill_arr.map((i: string) => {
          return <SkillCard key={i}>{i}</SkillCard>;
        })}
      </View>
    </DefaultBox>
  );
};

const styles = StyleSheet.create({
  skillBox: {
    width: '100%',
    flexWrap: 'wrap',
    display: 'flex',
    flexDirection: 'row',
  },
});

export default SkillBox;
