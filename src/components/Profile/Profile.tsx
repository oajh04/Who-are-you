import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import SkillBox from '../ProjectInfo/SkillBox/SkillBox';
import {getUId} from '../../libs/functions/idManagement';
import {getUser} from '../../libs/apis/user';
import Contact from './Contact';
import InfoBox from '../common/InfoBox/InfoBox';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../router/RootNavigation';
import {useIsFocused} from '@react-navigation/native';
import {IProfile} from '../../libs/interfaces/Profile';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Root'>;
}

const Profile = ({navigation}: Props) => {
  const [data, setData] = useState<IProfile | any>();
  const isFocused = useIsFocused();

  useEffect(() => {
    getUId().then(res => {
      if (!res) {
        return navigation.navigate('Login');
      } else {
        getUser(res).then((response: string | any) => {
          if (!response) {
            return navigation.navigate('Login');
          }
          setData(response);
        });
      }
    });
  }, [navigation, isFocused]);

  const updateProfileMove = () => {
    navigation.navigate('UpdateProfile', data);
  };

  return (
    <>
      {data && (
        <View style={styles.wrapper}>
          <View style={styles.profile}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}>
              <Text style={styles.title}>{data.name}</Text>
              <Text onPress={updateProfileMove} style={styles.changeTitle}>
                수정
              </Text>
            </View>
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
    height: Dimensions.get('window').height - 240,
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
  changeTitle: {
    fontSize: 14,
    paddingLeft: 5,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Profile;
