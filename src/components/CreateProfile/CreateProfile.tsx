import {RouteProp} from '@react-navigation/native';
// import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {RootStackParamList} from '../../router/RootNavigation';
import firestore from '@react-native-firebase/firestore';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  ScrollView,
  Text,
  View,
} from 'react-native';
import DefaultBox from '../common/DefaultBox/DefaultBox';
import {useToast} from 'react-native-toast-notifications';
import SkillCard from '../ProjectInfo/SkillBox/SkillCard';

interface Props {
  navigation: any;
  route: RouteProp<RootStackParamList, 'CreateProfile'>;
}

const CreateProfile = ({navigation, route}: Props) => {
  const toast = useToast();
  const userCollection = firestore().collection('user');
  const [topic, setTopic] = useState<any>({
    award: '',
    certificate: '',
    skills: '',
    schools: '',
  });
  const [data, setData] = useState<any>({
    name: '',
    contact: {
      email: '',
      phone_number: '',
      github: '',
    },
    award: [],
    certificate: [],
    skills: [],
    schools: [],
    profile_image_url: '',
  });

  const onSend = async () => {
    try {
      console.log(route.params.uid);
      await userCollection.doc(route.params.uid).set(data);
      toast.show('프로필 등록 성공', {
        type: 'success',
      });
      navigation.navigate('Home');
    } catch (error: any) {
      toast.show('프로필 등록 실패');
    }
  };

  const onChange = (keyvalue: string, e: string) => {
    setData({
      ...data,
      [keyvalue]: e,
    });
  };

  const onChangeContact = (keyvalue: string, e: string) => {
    setData({
      ...data,
      contact: {
        ...data.contact,
        [keyvalue]: e,
      },
    });
  };

  const onChangeArray = (keyvalue: string, e: string) => {
    setTopic({
      ...topic,
      [keyvalue]: e,
    });
  };

  const onKeyInput = (keyvalue: string, e: any) => {
    console.log(e.nativeEvent.key, topic[keyvalue]);

    if (topic[keyvalue] === ',') {
      console.log('asd');
      return;
    }

    if (e.nativeEvent.key === ',') {
      setData({
        ...data,
        [keyvalue]: [...data[keyvalue], topic[keyvalue].replace(/,$/, '')],
      });
      setTopic({
        ...topic,
        [keyvalue]: '',
      });
    }
  };

  return (
    <>
      <ScrollView>
        <DefaultBox name="정보">
          <TextInput
            placeholder="이름"
            onChangeText={e => onChange('name', e)}
            value={data.name}
          />
          <TextInput
            placeholder="이메일"
            onChangeText={e => onChangeContact('email', e)}
            value={data.contact.email}
          />
          <TextInput
            placeholder="전화번호"
            onChangeText={e => onChangeContact('phone_number', e)}
            value={data.contact.phone_number}
          />
          <TextInput
            placeholder="깃허브"
            onChangeText={e => onChangeContact('github', e)}
            value={data.contact.github}
          />
        </DefaultBox>
        <DefaultBox name="학력">
          <View>
            {data.schools.map((i: string) => {
              return <Text key={i}>{i}</Text>;
            })}
          </View>
          <TextInput
            value={topic.schools}
            placeholder="ex) 대덕소프트웨어마이스터고등학교 재학중"
            onChangeText={e => onChangeArray('schools', e)}
            onKeyPress={e => onKeyInput('schools', e)}
          />
        </DefaultBox>
        <DefaultBox name="스킬">
          <View style={styles.skillBox}>
            {data.skills.map((i: string) => {
              return <SkillCard key={i}>{i}</SkillCard>;
            })}
          </View>
          <TextInput
            value={topic.skills}
            placeholder="ex) 대덕소프트웨어마이스터고등학교 재학중"
            onChangeText={e => onChangeArray('skills', e)}
            onKeyPress={e => onKeyInput('skills', e)}
          />
        </DefaultBox>
        <DefaultBox name="수상 및 기타 이력">
          <View style={styles.skillBox}>
            {data.award.map((i: string) => {
              return <Text key={i}>{i}</Text>;
            })}
          </View>
          <TextInput
            value={topic.award}
            placeholder="ex) 대덕소프트웨어마이스터고등학교 재학중"
            onChangeText={e => onChangeArray('award', e)}
            onKeyPress={e => onKeyInput('award', e)}
          />
        </DefaultBox>
        <DefaultBox name="자격증">
          <View style={styles.skillBox}>
            {data.certificate.map((i: string) => {
              return <Text key={i}>{i}</Text>;
            })}
          </View>
          <TextInput
            value={topic.certificate}
            placeholder="ex) 대덕소프트웨어마이스터고등학교 재학중"
            onChangeText={e => onChangeArray('certificate', e)}
            onKeyPress={e => onKeyInput('certificate', e)}
          />
        </DefaultBox>
      </ScrollView>
      <Text style={styles.endButton} onPress={onSend}>
        입력 완료
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: '#34C557',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  endButton: {
    margin: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#34C557',
    color: 'white',
    width: Dimensions.get('window').width - 30,
    textAlign: 'center',
  },
  skillBox: {
    width: '100%',
    flexWrap: 'wrap',
    display: 'flex',
    flexDirection: 'row',
  },
});

export default CreateProfile;