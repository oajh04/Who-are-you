import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

interface Props {
  image_url: string;
  name: string;
  email: string;
}

const UserCard = ({image_url, name, email}: Props) => {
  return (
    <View style={styles.wrapper}>
      <Text style={{marginRight: 10}}>
        {image_url && (
          <Image
            source={{
              uri: image_url,
            }}
            style={styles.image}
          />
        )}
      </Text>
      <View>
        <Text style={{marginBottom: 5}}>{name}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 5,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default UserCard;
