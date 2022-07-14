import React, {useEffect, useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Card from './Card';
import Category from './Category';

const PortFolio = ({navigation}: any) => {
  const [data, setData] = useState([{}]);
  const projectCollection = firestore().collection('projectList');

  useEffect(() => {
    const callApi = async () => {
      try {
        const res = await projectCollection.get();
        setData(res.docs?.map((doc: any) => ({...doc.data(), id: doc.id})));
      } catch (error: any) {
        console.log(error.message);
      }
    };

    callApi();
  });

  return (
    <View>
      <Category />
      <ScrollView>
        {data.map((i: any) => {
          return (
            <TouchableOpacity
              key={i.id}
              onPress={() => navigation.navigate('ProjectInfo', {id: i.id})}>
              <Card {...i} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default PortFolio;
