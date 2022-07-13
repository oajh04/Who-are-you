import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import DefaultBox from '../../common/DefaultBox/DefaultBox';
import Slider from './Slider/Slider';

interface Props {
  description: string;
  image_arr: string[];
}

const Description = ({description, image_arr}: Props) => {
  const screenWidth = Math.round(Dimensions.get('window').width);

  return (
    <DefaultBox name="Content">
      <View>
        <Slider
          gap={10}
          offset={36}
          pages={image_arr}
          pageWidth={screenWidth - (16 + 36) * 2}
        />
        <Text>{description}</Text>
      </View>
    </DefaultBox>
  );
};

export default Description;
