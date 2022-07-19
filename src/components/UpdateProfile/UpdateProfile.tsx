/* eslint-disable react-native/no-inline-styles */
import {RouteProp} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import React, {useEffect, useState} from 'react';
import {RootStackParamList} from '../../router/RootNavigation';
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
import {IProfile} from '../../libs/interfaces/Profile';
import {userCollection} from '../../libs/apis/user';
import {getUId} from '../../libs/functions/idManagement';

interface ITopic {
  award: string;
  certificate: string;
  skills: string;
  schools: string;
}

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'CreateProfile'>;
  route: RouteProp<RootStackParamList, 'CreateProfile'>;
}

const profileUrl =
  'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png';

const UpdateProfile = ({navigation, route}: Props) => {
  const toast = useToast();
  const [topic, setTopic] = useState<ITopic | any>({
    award: '',
    certificate: '',
    skills: '',
    schools: '',
  });

  const [data, setData] = useState<IProfile | any>({
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

  useEffect(() => {
    setData(route.params);
  }, [route]);

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
      const uid = (await getUId()) as any;
      await userCollection.doc(uid).set(data);
      toast.show('프로필 수정 성공', {
        type: 'success',
        duration: 1000,
      });
      navigation.navigate('Home');
    } catch (error: any) {
      toast.show('프로필 수정 실패', {
        type: 'danger',
        duration: 1000,
      });
    }
  };

  const deleteArrayIndex = (keyvalue: string, value: string) => {
    const index = data[keyvalue].indexOf(value);
    const array = data[keyvalue].filter((_: string, idx: number) => {
      return idx !== index;
    });

    setData({
      ...data,
      [keyvalue]: array,
    });
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
    if (topic[keyvalue] === ',') {
      return;
    }

    if (e.nativeEvent.key === ',') {
      setTopic({
        ...topic,
        [keyvalue]: '',
      });
      setData({
        ...data,
        [keyvalue]: [...data[keyvalue], topic[keyvalue].replace(/,$/, '')],
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
                style={styles.text}
                placeholder="이름"
                onChangeText={e => onChange('name', e)}
                value={data.name}
              />
              <TextInput
                style={styles.text}
                placeholder="이메일"
                onChangeText={e => onChangeContact('email', e)}
                value={data.contact.email}
              />
              <TextInput
                style={styles.text}
                placeholder="전화번호"
                onChangeText={e => onChangeContact('phone_number', e)}
                value={data.contact.phone_number}
              />
              <TextInput
                style={styles.text}
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
          <View style={styles.listBox}>
            {data.schools.map((i: string, index: number) => {
              return (
                <Pressable
                  key={`${i}-${index}`}
                  onPress={() => deleteArrayIndex('schools', i)}>
                  <Text>{i}</Text>
                </Pressable>
              );
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
            {data.skills.map((i: string, index: number) => {
              return (
                <Pressable
                  key={`${i}-${index}`}
                  onPress={() => deleteArrayIndex('skills', i)}>
                  <SkillCard key={i}>{i}</SkillCard>
                </Pressable>
              );
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
          <View style={styles.listBox}>
            {data.award.map((i: string, index: number) => {
              return (
                <Pressable
                  key={`${i}-${index}`}
                  onPress={() => deleteArrayIndex('award', i)}>
                  <Text>{i}</Text>
                </Pressable>
              );
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
          <View style={styles.listBox}>
            {data.certificate.map((i: string, index: number) => {
              return (
                <Pressable
                  key={`${i}-${index}`}
                  onPress={() => deleteArrayIndex('certificate', i)}>
                  <Text>{i}</Text>
                </Pressable>
              );
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
        수정 완료
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
  text: {
    padding: 5,
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
    marginBottom: 5,
  },
  listBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 5,
  },
  circle: {
    width: 70,
    height: 70,
    backgroundColor: 'gray',
    borderRadius: 35,
    overflow: 'hidden',
  },
});

export default UpdateProfile;
