import React from 'react';
import {Text} from 'react-native';
import DefaultBox from '../DefaultBox/DefaultBox';

interface Props {
  name: string;
  array?: string[];
}

const InfoBox = ({name, array}: Props) => {
  return (
    <>
      <DefaultBox name={name}>
        {array?.map((i: string) => {
          return <Text key={i}>{i}</Text>;
        })}
      </DefaultBox>
    </>
  );
};

export default InfoBox;
