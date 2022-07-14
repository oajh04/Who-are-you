import AsyncStorage from '@react-native-async-storage/async-storage';

export const setUId = (userId: string) => {
  AsyncStorage.setItem('uid', userId, () => {
    console.log('유저 id저장');
  });
};

//읽어오기
export const getUId = () => {
  return AsyncStorage.getItem('uid');
};
