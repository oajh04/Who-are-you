import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, ScrollView} from 'react-native';
import {getUserList} from '../../libs/apis/user';
import {IProfile} from '../../libs/interfaces/Profile';
import UserCard from './UserCard';

const Home = ({navigation}: any) => {
  const [data, setData] = useState<any | IProfile[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getUserList().then(res => {
      setData(res.docs?.map((doc: any) => ({...doc.data(), id: doc.id})));
    });
  }, [isFocused]);

  return (
    <>
      <ScrollView>
        {data.map((i: IProfile) => {
          const {profile_image_url, name, contact, id} = i;
          return (
            <TouchableOpacity
              key={id}
              onPress={() => navigation.navigate('UserProfile', {uid: id})}>
              <UserCard
                image_url={profile_image_url}
                name={name}
                email={contact.email}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </>
  );
};

export default Home;
