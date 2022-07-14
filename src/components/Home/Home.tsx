/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';

import DefaultBox from '../common/DefaultBox/DefaultBox';
import SkillBox from '../ProjectInfo/SkillBox/SkillBox';
import {getUId} from '../../libs/functions/idManagement';
import {getUser} from '../../libs/apis/user';
import Contact from './Contact';

interface IProfile {
  name: string;
  contact: {
    email: string;
    phone_number: string;
    github: string;
  };
  award: string[];
  certificate: string[];
  skills: string[];
  schools: string[];
}

const Home = ({navigation}: any) => {
  const [data, setData] = useState<any | IProfile>({});
  const {name, contact, award, certificate, skills, schools} = data;

  useEffect(() => {
    getUId().then(res => {
      getUser(res).then((response: any) => {
        setData(response);
      });
    });
  }, [navigation]);

  return (
    <>
      {data && (
        <View style={styles.wrapper}>
          <View style={styles.profile}>
            <Text style={styles.title}>{name}</Text>
            <Image
              source={{uri: 'https://picsum.photos/id/1048/5616/3744'}}
              style={styles.image}
            />
          </View>
          <ScrollView style={styles.contentWrapper}>
            <Contact {...contact} />

            <DefaultBox name={'학력'}>
              {schools?.map((i: string) => {
                return <Text key={i}>{i}</Text>;
              })}
            </DefaultBox>

            <SkillBox skill_arr={skills} />

            <DefaultBox name={'자격증'}>
              {certificate?.map((i: string) => {
                return <Text key={i}>{i}</Text>;
              })}
            </DefaultBox>

            <DefaultBox name={'수상 및 기타 이력'}>
              {award?.map((i: string) => {
                return <Text key={i}>{i}</Text>;
              })}
            </DefaultBox>

            <DefaultBox name={'포트폴리오'}>
              <Text>https://oajh04.super.site</Text>
            </DefaultBox>
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
});

export default Home;
