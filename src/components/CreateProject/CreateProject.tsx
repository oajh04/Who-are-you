/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {RootStackParamList} from '../../router/RootNavigation';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  ScrollView,
  Text,
  View,
  SafeAreaView,
  Platform,
  Pressable,
} from 'react-native';
import DefaultBox from '../common/DefaultBox/DefaultBox';
import {useToast} from 'react-native-toast-notifications';
import SkillCard from '../ProjectInfo/SkillBox/SkillCard';
import {IProjectCreate} from '../../libs/interfaces/Project';
import Slider from '../ProjectInfo/Description/Slider/Slider';
import {launchImageLibrary} from 'react-native-image-picker';
import {getUId} from '../../libs/functions/idManagement';
import {StackNavigationProp} from '@react-navigation/stack';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DateFormat from '../../libs/functions/DateFormat';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'CreateProject'>;
}

const CreateProject = ({navigation}: Props) => {
  DateFormat();
  const toast = useToast();
  const projectCollection = firestore().collection('projectList');
  const [topic, setTopic] = useState<string>('');
  const [data, setData] = useState<any | IProjectCreate>({
    name: '',
    start_at: '',
    end_at: '',
    description: '',
    image_arr: [],
    user_id: '',
    skills: [],
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState('');

  const showDatePicker = (isShow: string) => {
    setDatePickerVisibility(isShow);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility('');
  };

  const handleConfirm = (keyvalue: string, date: any) => {
    console.log(date);
    setData({
      ...data,
      [keyvalue]: date.format('yyyy-MM-dd'),
    });
    hideDatePicker();
  };

  useEffect(() => {
    getUId()
      .then(res => {
        if (res) {
          setData({...data, user_id: res});
        } else {
          navigation.navigate('Login');
        }
      })
      .catch(e => console.log(e));
  }, []);

  const onSend = async () => {
    console.log(data);
    for (let variable in data) {
      if (!data[variable] || data[variable].length === 0) {
        return toast.show('빈칸을 다 채워주세요', {
          type: 'danger',
          duration: 1000,
        });
      }
    }

    try {
      await projectCollection.doc().set(data);
      toast.show('프로젝트 추가 성공', {
        type: 'success',
      });
      navigation.navigate('PortFolio');
    } catch (error: any) {
      toast.show('프로젝트 추가 실패');
    }
  };

  const onChange = (keyvalue: string, e: string) => {
    setData({
      ...data,
      [keyvalue]: e,
    });
  };

  const onChangeArray = (e: string) => {
    setTopic(e);
  };

  const onKeyInput = (keyvalue: string, e: any) => {
    if (topic === ',') {
      return;
    }

    if (e.nativeEvent.key === ',') {
      setData({
        ...data,
        [keyvalue]: [...data[keyvalue], topic.replace(/,$/, '')],
      });
      setTopic('');
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
      image_arr: [...data.image_arr, imageUrl],
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <DateTimePickerModal
          isVisible={isDatePickerVisible === 'start_at'}
          mode="date"
          onConfirm={date => handleConfirm('start_at', date)}
          onCancel={hideDatePicker}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible === 'end_at'}
          mode="date"
          onConfirm={date => handleConfirm('end_at', date)}
          onCancel={hideDatePicker}
        />
        <DefaultBox name="기본 정보">
          <TextInput
            placeholder="프로젝트 이름"
            onChangeText={e => onChange('name', e)}
            value={data.name}
          />
          <Text style={{marginTop: 7}}>
            <Text onPress={() => showDatePicker('start_at')}>
              {data.start_at ? data.start_at : '시작 날짜'}
            </Text>
            ~
            <Text onPress={() => showDatePicker('end_at')}>
              {data.end_at ? data.end_at : '마감 날짜'}
            </Text>
          </Text>
        </DefaultBox>
        <DefaultBox name="프로젝트 설명">
          <TextInput
            placeholder="프로젝트 설명"
            value={data.description}
            textAlignVertical="top"
            multiline={true}
            onChangeText={e => onChange('description', e)}
          />
        </DefaultBox>
        <DefaultBox name="스킬">
          <View style={styles.skillBox}>
            {data.skills.map((i: string, index: number) => {
              return (
                <Pressable
                  key={`${i}-${index}`}
                  onPress={() => deleteArrayIndex('skills', i)}>
                  <SkillCard>{i}</SkillCard>
                </Pressable>
              );
            })}
          </View>
          <TextInput
            value={topic}
            placeholder="내용을 입력 후 ,를 입력해보세요 "
            onChangeText={e => onChangeArray(e)}
            onKeyPress={e => onKeyInput('skills', e)}
          />
        </DefaultBox>
        <DefaultBox name="프로젝트 사진">
          <Text onPress={onSelectImage}>사진 추가하기</Text>
          <Slider pages={data.image_arr} />
        </DefaultBox>
      </ScrollView>
      <Text style={styles.endButton} onPress={onSend}>
        입력 완료
      </Text>
    </SafeAreaView>
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
    overflow: 'hidden',
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

export default CreateProject;
