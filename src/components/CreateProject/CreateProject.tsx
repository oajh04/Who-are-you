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
  SafeAreaView,
} from 'react-native';
import DefaultBox from '../common/DefaultBox/DefaultBox';
import {useToast} from 'react-native-toast-notifications';
import SkillCard from '../ProjectInfo/SkillBox/SkillCard';
import {IProjectCreate} from '../../libs/interfaces/Project';

interface Props {
  navigation: any;
  route: RouteProp<RootStackParamList, 'CreateProfile'>;
}

const CreateProject = ({navigation, route}: Props) => {
  const toast = useToast();
  const userCollection = firestore().collection('user');
  const [topic, setTopic] = useState<any>('');
  const [data, setData] = useState<any | IProjectCreate>({
    name: '',
    start_at: '',
    end_at: '',
    description: '',
    image_url: [],
    user_id: '',
    skills: [],
  });

  const onSend = async () => {
    for (let variable in data) {
      if (!data[variable] || data[variable].length === 0) {
        return toast.show('빈칸을 다 채워주세요', {
          type: 'danger',
          duration: 1000,
        });
      }
    }

    try {
      await userCollection.doc(route.params.uid).set(data);
      toast.show('프로젝트 추가 성공', {
        type: 'success',
      });
      navigation.navigate('Home');
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

  const onChangeArray = (keyvalue: string, e: string) => {
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

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <DefaultBox name="기본 정보">
          <TextInput
            placeholder="프로젝트 이름"
            onChangeText={e => onChange('name', e)}
            value={data.name}
          />
        </DefaultBox>
        <DefaultBox name="프로젝트 설명">
          <TextInput
            placeholder="프로젝트 설명"
            onChangeText={e => onChangeArray('description', e)}
          />
        </DefaultBox>
        <DefaultBox name="스킬">
          <View style={styles.skillBox}>
            {data.skills.map((i: string, index: number) => {
              return <SkillCard key={`${i}-${index}`}>{i}</SkillCard>;
            })}
          </View>
          <TextInput
            value={topic}
            placeholder="내용을 입력 후 ,를 입력해보세요 "
            onChangeText={e => onChangeArray('skills', e)}
            onKeyPress={e => onKeyInput('skills', e)}
          />
        </DefaultBox>
        <DefaultBox name="프로젝트 사진">
          <TextInput
            placeholder="내용을 입력 후 ,를 입력해보세요"
            onChangeText={e => onChangeArray('start_at', e)}
          />
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
