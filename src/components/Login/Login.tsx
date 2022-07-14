import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text, Alert} from 'react-native';
import {signIn, signUp} from '../../libs/apis/auth';
import {getUser} from '../../libs/apis/user';
import {setUId, getUId} from '../../libs/functions/idManagement';

const Login = () => {
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
      })
      .catch(err => {
        //console.log(err.code);
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

  const WRYSignIn = async () => {
    try {
      const {user} = await signIn(info);
      Alert.alert(`성공 ${user.uid}`);
      setUId(user.uid);
    } catch (e: any) {
      console.log(e);
      switch (e.code) {
        case 'auth/user-not-found':
          return console.log('입력한 아이디가 존재하지 않습니다');
        case 'auth/wrong-password':
          return console.log('비밀번호를 틀렸습니다.');
      }
    }
  };

  const WRYSign = () => {
    getUId();
  };

  return (
    <View style={{padding: 15}}>
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
      <Text onPress={WRYSignIn}>asd</Text>
      <Text onPress={WRYSign}>asd</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: '#34C557',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});

export default Login;
