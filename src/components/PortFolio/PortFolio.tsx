import React, {useEffect, useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import Card from './Card';
import {RootStackParamList} from '../../router/RootNavigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {getProjectList} from '../../libs/apis/project';
import {getUId} from '../../libs/functions/idManagement';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Root'>;
}

const PortFolio = ({navigation}: Props) => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    getUId().then(response => {
      if (response) {
        getProjectList(response).then(res => {
          setData(res.docs?.map((doc: any) => ({...doc.data(), id: doc.id})));
        });
      }
    });
  }, []);

  return (
    <View>
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
