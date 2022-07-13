import React from 'react';
import {Text} from 'react-native';
import DefaultBox from '../common/DefaultBox/DefaultBox';

const Card = () => {
  return (
    <DefaultBox name="Pick">
      <Text>교내 방과후 출석부 시스템입니다.</Text>
      <Text>21.07 ~ 22.07</Text>
    </DefaultBox>
  );
};

export default Card;
