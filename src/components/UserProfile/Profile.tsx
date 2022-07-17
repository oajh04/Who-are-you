import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import SkillBox from '../ProjectInfo/SkillBox/SkillBox';
import {getUser} from '../../libs/apis/user';
import Contact from './Contact';
import InfoBox from '../common/InfoBox/InfoBox';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../router/RootNavigation';
import {RouteProp} from '@react-navigation/native';
import {IProfile} from '../../libs/interfaces/Profile';
import DefaultBox from '../common/DefaultBox/DefaultBox';
import {IProjectInfo} from '../../libs/interfaces/Project';
import {getProjectList} from '../../libs/apis/project';
import ProjectCard from './ProjectCard';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'UserProfile'>;
  route: RouteProp<RootStackParamList, 'UserProfile'>;
}

const UserProfile = ({navigation, route}: Props) => {
  const [data, setData] = useState<IProfile | any>();
  const [projectData, setProjectData] = useState<IProjectInfo | any>([]);

  useEffect(() => {
    getUser(route.params.uid).then((response: any) => {
      if (!response) {
        return navigation.navigate('Home');
      }
      setData(response);
      navigation.setOptions({title: response.name});
    });

    getProjectList(route.params.uid).then(response => {
      setProjectData(
        response.docs?.map((doc: any) => ({...doc.data(), id: doc.id})),
      );
    });
  }, [navigation, route]);

  return (
    <>
      {data && (
        <SafeAreaView style={styles.wrapper}>
          <View style={styles.profile}>
            <Text style={styles.title}>{data.name}</Text>
            <Image
              source={{
                uri: data.profile_image_url,
              }}
              style={styles.image}
            />
          </View>
          <ScrollView style={styles.contentWrapper}>
            <Contact {...data.contact} />

            <InfoBox name="학력" array={data.schools} />

            <SkillBox skill_arr={data.skills} />

            <InfoBox name="자격증" array={data.certificate} />

            <InfoBox name="수상 및 기타 이력" array={data.award} />

            {projectData.length !== 0 && (
              <DefaultBox name="Projects">
                {projectData.map((i: any) => {
                  return (
                    <TouchableOpacity
                      key={i.id}
                      onPress={() =>
                        navigation.navigate('ProjectInfo', {id: i.id})
                      }>
                      <ProjectCard {...i} />
                    </TouchableOpacity>
                  );
                })}
              </DefaultBox>
            )}
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#121212',
    flex: 1,
  },
  contentWrapper: {
    backgroundColor: '#efefef',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    paddingTop: 5,
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default UserProfile;
