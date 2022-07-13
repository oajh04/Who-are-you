import React from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import DefaultBox from '../common/DefaultBox/DefaultBox';

const Home = () => {
  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.profile}>
          <Text style={styles.title}>한준호</Text>
          <Image
            source={{uri: 'https://picsum.photos/id/1048/5616/3744'}}
            style={styles.image}
          />
        </View>
        <ScrollView style={styles.contentWrapper}>
          <DefaultBox name={'학력'}>
            <Text>대덕소프트웨어마이스터고등학교</Text>
            <Text>20.03 ~ 재학중</Text>
          </DefaultBox>
          <DefaultBox name={'기술 스택'}>
            <Text>정보처리기능사</Text>
          </DefaultBox>
          <DefaultBox name={'자격증'}>
            <Text>정보처리기능사</Text>
          </DefaultBox>
          <DefaultBox name={'수상 및 기타 이력'}>
            <Text>나Be 한마당 코딩경진대회 동상</Text>
          </DefaultBox>
          <DefaultBox name={'포트폴리오'}>
            <Text>https://oajh04.super.site</Text>
          </DefaultBox>
        </ScrollView>
      </View>
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

export default Home;
