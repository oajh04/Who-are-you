import React from 'react';
import {Text} from 'react-native';
import DefaultBox from '../../common/DefaultBox/DefaultBox';

interface Props {
  name: string;
  start_at: string;
  end_at: string;
}

const ProjectTitle = ({name, start_at, end_at}: Props) => {
  return (
    <DefaultBox name={name}>
      <Text>
        {start_at} ~ {end_at}
      </Text>
    </DefaultBox>
  );
};

export default ProjectTitle;
