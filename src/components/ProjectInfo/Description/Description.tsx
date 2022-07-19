import React from 'react';
import {Text, View} from 'react-native';
import DefaultBox from '../../common/DefaultBox/DefaultBox';
import Slider from './Slider/Slider';

interface Props {
  description: string;
  image_arr: string[];
}

const Description = ({description, image_arr}: Props) => {
  return (
    <DefaultBox name="Content">
      <View>
        <Slider pages={image_arr} />
        <Text>{description}</Text>
      </View>
    </DefaultBox>
  );
};

export default Description;
