import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {getUserList} from '../../libs/apis/user';

const Home = ({navigation}: any) => {
  const [data, setData] = useState<any>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getUserList().then(res => {
      setData(res.docs?.map((doc: any) => ({...doc.data(), id: doc.id})));
    });
  }, [isFocused]);

  return (
    <>
      <View>
        {data.map((i: any) => {
          return (
            <Text
              key={i.id}
              onPress={() => navigation.navigate('UserProfile', {uid: i.id})}>
              {i.name}
            </Text>
          );
        })}
      </View>
    </>
  );
};

export default Home;
