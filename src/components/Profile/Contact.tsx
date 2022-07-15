/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DefaultBox from '../common/DefaultBox/DefaultBox';
import {GithubSVG, EmailSVG, PhoneSVG} from '../../assets';

interface Props {
  email: string;
  phone_number: string;
  github: string;
}

const Contact = ({email, phone_number, github}: Props) => {
  return (
    <DefaultBox name={'연락처'}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
        <View style={styles.infoBox}>
          <Text style={{width: 20}}>
            <EmailSVG />
          </Text>
          <Text>{email}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={{width: 20}}>
            <PhoneSVG />
          </Text>
          <Text>{phone_number}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={{width: 20}}>
            <GithubSVG />
          </Text>
          <Text>{github}</Text>
        </View>
      </View>
    </DefaultBox>
  );
};

export default Contact;

const styles = StyleSheet.create({
  infoBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 3,
  },
});
