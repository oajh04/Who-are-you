import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView, Text} from 'react-native';
import {RootStackParamList} from '../../router/RootNavigation';
import Description from './Description/Description';
import ProjectTitle from './ProjectTitle/ProjectTitle';
import SkillBox from './SkillBox/SkillBox';
import {getProject, projectCollection} from '../../libs/apis/project';
import {IProjectInfo} from '../../libs/interfaces/Project';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native';
import {useToast} from 'react-native-toast-notifications';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'ProjectInfo'>;
  route: RouteProp<RootStackParamList, 'ProjectInfo'>;
}

const ProjectInfo = ({navigation, route}: Props) => {
  const toast = useToast();
  const [data, setData] = useState<any | IProjectInfo>({});
  const {name, start_at, end_at, description, image_arr, skills} = data;

  const DeleteProject = async () => {
    try {
      await projectCollection.doc(route.params.id).delete();
      navigation.navigate('PortFolio');
      toast.show('프로젝트가 삭제되었습니다', {
        type: 'success',
        duration: 2000,
      });
    } catch (e) {
      toast.show('오류가 발생했습니다', {
        type: 'danger',
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    navigation.setOptions({title: 'Pick'});
    getProject(route.params.id).then(res => setData(res));
  }, [navigation, route]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <ProjectTitle name={name} start_at={start_at} end_at={end_at} />
        <SkillBox skill_arr={skills} />
        <Description image_arr={image_arr} description={description} />
      </ScrollView>
      <Text style={styles.deleteButton} onPress={DeleteProject}>
        프로젝트 삭제
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    margin: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#da4747',
    color: 'white',
    width: Dimensions.get('window').width - 30,
    textAlign: 'center',
  },
});

export default ProjectInfo;
