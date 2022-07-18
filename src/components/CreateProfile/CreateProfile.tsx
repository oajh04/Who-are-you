/* eslint-disable react-native/no-inline-styles */
import {RouteProp} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
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
  Pressable,
  Platform,
  Image,
} from 'react-native';
import DefaultBox from '../common/DefaultBox/DefaultBox';
import {useToast} from 'react-native-toast-notifications';
import SkillCard from '../ProjectInfo/SkillBox/SkillCard';
import {launchImageLibrary} from 'react-native-image-picker';
import {StackNavigationProp} from '@react-navigation/stack';

interface ITopic {
  award: string;
  certificate: string;
  skills: string;
  schools: string;
}

interface ICreateProfile {
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
  profile_image_url: string;
}

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'CreateProfile'>;
  route: RouteProp<RootStackParamList, 'CreateProfile'>;
}
const profileUrl =
  'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png';
const CreateProfile = ({navigation, route}: Props) => {
  const toast = useToast();
  const userCollection = firestore().collection('user');
  const [topic, setTopic] = useState<ITopic | any>({
    award: '',
    certificate: '',
    skills: '',
    schools: '',
  });
  const [data, setData] = useState<ICreateProfile | any>({
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
    profile_image_url: profileUrl,
  });

  const onSend = async () => {
    for (let variable in data) {
      if (!data[variable] || data[variable].length === 0) {
        console.log(data);
        return toast.show('빈칸을 다 채워주세요', {
          type: 'danger',
          duration: 1000,
        });
      }
    }

    try {
      await userCollection.doc(route.params.uid).set(data);
      toast.show('프로필 등록 성공', {
        type: 'success',
        duration: 1000,
      });
      navigation.navigate('Home');
    } catch (error: any) {
      toast.show('프로필 등록 실패', {
        type: 'danger',
        duration: 1000,
      });
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

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      res => {
        if (res.didCancel) return;
        imageUpload(res);
      },
    );
  };

  const imageUpload = async (response: any) => {
    let imageUrl = null;
    if (response) {
      const asset = response.assets[0];
      const reference = storage().ref(`/profile/${asset.fileName}`); // 업로드할 경로 지정
      if (Platform.OS === 'android') {
        await reference.putString(asset.base64, 'base64', {
          contentType: asset.type,
        });
      } else {
        await reference.putFile(asset.uri);
      }
      imageUrl = response ? await reference.getDownloadURL() : null;
    }
    setData({
      ...data,
      profile_image_url: imageUrl,
    });
  };

  return (
    <>
      <ScrollView>
        <DefaultBox name="정보">
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{display: 'flex', flexDirection: 'column'}}>
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
            </View>
            <Pressable onPress={onSelectImage}>
              <Image
                style={styles.circle}
                source={{uri: data?.profile_image_url}}
              />
            </Pressable>
          </View>
        </DefaultBox>
        <DefaultBox name="학력">
          <View>
            {data.schools.map((i: string) => {
              return <Text key={i}>{i}</Text>;
            })}
          </View>
          <TextInput
            value={topic.schools}
            placeholder="내용을 입력 후 ,를 입력해보세요"
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
            placeholder="내용을 입력 후 ,를 입력해보세요"
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
            placeholder="내용을 입력 후 ,를 입력해보세요"
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
            placeholder="내용을 입력 후 ,를 입력해보세요"
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
    overflow: 'hidden',
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
  circle: {
    width: 70,
    height: 70,
    backgroundColor: 'gray',
    borderRadius: 35,
    overflow: 'hidden',
  },
});

export default CreateProfile;
