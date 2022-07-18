import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {RootStackParamList} from '../../router/RootNavigation';
import Description from './Description/Description';
import ProjectTitle from './ProjectTitle/ProjectTitle';
import SkillBox from './SkillBox/SkillBox';
import {getProject} from '../../libs/apis/project';
import {IProjectInfo} from '../../libs/interfaces/Project';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'ProjectInfo'>;
  route: RouteProp<RootStackParamList, 'ProjectInfo'>;
}

const ProjectInfo = ({navigation, route}: Props) => {
  const [data, setData] = useState<any | IProjectInfo>({});
  const {name, start_at, end_at, description, image_arr, skills} = data;

  useEffect(() => {
    navigation.setOptions({title: 'Pick'});
    getProject(route.params.id).then(res => setData(res));
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
