import {StackNavigationProp, RouteProp} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {RootStackParamList} from '../../router/RootNavigation';
import Description from './Description/Description';
import ProjectTitle from './ProjectTitle/ProjectTitle';
import SkillBox from './SkillBox/SkillBox';
import data from '../../../Data.json';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'ProjectInfo'>;
  route: RouteProp<RootStackParamList, 'ProjectInfo'>;
}

const ProjectInfo = ({navigation, route}: Props) => {
  const {name, start_at, end_at, description, image_arr, skills} = data;
  useEffect(() => {
    navigation.setOptions({title: 'Pick'});
    // console.log(route.params.id);
  }, [navigation, route]);

  return (
    <View>
      <ProjectTitle name={name} start_at={start_at} end_at={end_at} />
      <SkillBox skill_arr={skills} />
      <Description image_arr={image_arr} description={description} />
    </View>
  );
};

export default ProjectInfo;
