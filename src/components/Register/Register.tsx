import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import {signUp} from '../../libs/apis/auth';
import {useToast} from 'react-native-toast-notifications';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../router/RootNavigation';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Register'>;
}

const Register = ({navigation}: Props) => {
  const toast = useToast();
  const [info, setInfo] = useState<{email: string; password: string}>({
    email: '',
    password: '',
  });

  const setUserInfo = (keyvalue: string, text: string) => {
    setInfo({
      ...info,
      [keyvalue]: text,
    });
  };

  const WRYSignUp = () => {
    signUp(info)
      .then(res => {
        console.log(res);
        if (res.user.uid) {
          toast.show('회원가입 성공!', {
            type: 'success',
            duration: 2000,
          });
          navigation.navigate('Login');
        }
      })
      .catch(err => {
        console.log(err);
        switch (err.code) {
          case 'auth/weak-password':
            console.log('비밀번호는 6자리 이상이어야 합니다');
            break;
          case 'auth/invalid-email':
            console.log('잘못된 이메일 주소입니다');
            break;
          case 'auth/email-already-in-use':
            console.log('이미 가입되어 있는 계정입니다');
            break;
        }
      });
  };

  return (
    <View
      style={{
        padding: 15,
        backgroundColor: 'white',
        height: '100%',
        paddingTop: 40,
      }}>
      <TextInput
        onChangeText={text => setUserInfo('email', text)}
        style={styles.input}
        placeholder="Email"
      />
      <TextInput
        onChangeText={text => setUserInfo('password', text)}
        style={styles.input}
        placeholder="password"
        secureTextEntry={true}
      />
      <Text onPress={WRYSignUp} style={styles.registerButton}>
        회원가입
      </Text>
    </View>
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
  registerButton: {
    position: 'absolute',
    left: 15,
    bottom: 15,
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
});

export default Register;
