import React, {useEffect, useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import Card from './Card';
import {RootStackParamList} from '../../router/RootNavigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {getProjectList} from '../../libs/apis/project';
import {getUId} from '../../libs/functions/idManagement';
import {useIsFocused} from '@react-navigation/native';
import {IProjectInfo} from '../../libs/interfaces/Project';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Root'>;
}

const PortFolio = ({navigation}: Props) => {
  const [data, setData] = useState<IProjectInfo[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getUId().then(response => {
      if (response) {
        getProjectList(response).then(res => {
          setData(res.docs?.map((doc: any) => ({...doc.data(), id: doc.id})));
        });
      }
    });
  }, [isFocused]);

  return (
    <View>
      <ScrollView>
        {data.map((i: IProjectInfo) => {
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
