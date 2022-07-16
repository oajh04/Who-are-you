import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import SkillBox from '../ProjectInfo/SkillBox/SkillBox';
import {getUser} from '../../libs/apis/user';
import Contact from './Contact';
import InfoBox from '../common/InfoBox/InfoBox';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../router/RootNavigation';
import {RouteProp} from '@react-navigation/native';
import {IProfile} from '../../libs/interfaces/Profile';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'UserProfile'>;
  route: RouteProp<RootStackParamList, 'UserProfile'>;
}

const UserProfile = ({navigation, route}: Props) => {
  const [data, setData] = useState<IProfile | any>();

  useEffect(() => {
    getUser(route.params.uid).then((response: any) => {
      if (!response) {
        return navigation.navigate('Home');
      }
      setData(response);
      navigation.setOptions({title: response.name});
    });
  }, [navigation, route]);

  return (
    <>
      {data && (
        <View style={styles.wrapper}>
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
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#121212',
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
