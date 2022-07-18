import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text, Dimensions} from 'react-native';
import {signIn} from '../../libs/apis/auth';
import {setUId} from '../../libs/functions/idManagement';
import {useToast} from 'react-native-toast-notifications';
import {getUser} from '../../libs/apis/user';

const Login = ({navigation}: any) => {
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

  const WRYSignIn = async () => {
    try {
      const {user} = await signIn(info);
      toast.show('로그인 성공!', {
        type: 'success',
        duration: 2000,
      });
      setUId(user.uid);
      getUser(user.uid).then(res => {
        if (res) {
          navigation.navigate('Home');
        } else {
          console.log(user.uid);
          navigation.navigate('CreateProfile', {uid: user.uid});
        }
      });
    } catch (e: any) {
      console.log(e);
      switch (e.code) {
        case 'auth/user-not-found':
          return toast.show('입력한 아이디가 존재하지 않습니다', {
            type: 'danger',
            duration: 2000,
          });
        case 'auth/wrong-password':
          return toast.show('비밀번호를 틀렸습니다.', {
            type: 'danger',
            duration: 2000,
          });
      }
    }
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
      <Text onPress={() => navigation.navigate('Register')}>
        회원가입하러 가기
      </Text>
      <Text onPress={WRYSignIn} style={styles.loginButton}>
        로그인
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
  loginButton: {
    position: 'absolute',
    left: 15,
    overflow: 'hidden',
    bottom: 15,
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
});

export default Login;
