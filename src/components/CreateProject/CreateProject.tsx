/* eslint-disable no-extend-native */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DateFormat from '../../libs/functions/DateFormat';

export default function Home() {
  DateFormat();

  const [isDatePickerVisible, setDatePickerVisibility] = useState('');
  const [text, setText] = useState('');

  const [inputs, setInputs] = useState({
    name: '',
    nickname: '',
    start_at: '',
    end_at: '',
    skills: [''],
  });

  const {name, nickname, start_at, end_at, skills} = inputs;

  const showDatePicker = (keyvalue: string) => {
    setDatePickerVisibility(keyvalue);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility('');
  };

  const handleConfirm = (keyvalue: string, date: any) => {
    hideDatePicker();
    setInputs({
      ...inputs,
      [keyvalue]: date.format('yyyy-MM-dd'),
    });
  };

  const changeSkills = (e: any) => {
    setText(e);
  };
  const changeSkillss = (e: any) => {
    console.log(e.nativeEvent.key);
    if (e.nativeEvent.key === ' ') {
      setInputs({
        ...inputs,
        skills: [...skills, text],
      });
      setText('');
    }
  };

  const onChange = (keyvalue: string, e: string) => {
    setInputs({
      ...inputs,
      [keyvalue]: e,
    });
  };

  return (
    <View style={styles.container}>
      {skills.map((i, index) => {
        return <Text key={index}>{i}</Text>;
      })}
      <TextInput
        style={styles.textInput}
        onChangeText={e => onChange('name', e)}
        value={name}
      />
      <TextInput
        style={styles.textInput}
        onChangeText={e => onChange('nickname', e)}
        value={nickname}
      />
      <TextInput
        placeholder="Skills"
        style={styles.textInput}
        placeholderTextColor="#000000"
        onChangeText={changeSkills}
        onKeyPress={changeSkillss}
        value={text}
      />
      <TouchableOpacity onPress={() => showDatePicker('start_at')}>
        <TextInput
          pointerEvents="none"
          style={styles.textInput}
          placeholder={'시작 날짜'}
          placeholderTextColor="#000000"
          underlineColorAndroid="transparent"
          editable={false}
          value={start_at}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible === 'start_at'}
          mode="date"
          onConfirm={e => handleConfirm('start_at', e)}
          onCancel={hideDatePicker}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => showDatePicker('end_at')}>
        <TextInput
          pointerEvents="none"
          style={styles.textInput}
          placeholder={'마감 날짜'}
          placeholderTextColor="#000000"
          underlineColorAndroid="transparent"
          editable={false}
          value={end_at}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible === 'end_at'}
          mode="date"
          onConfirm={e => handleConfirm('end_at', e)}
          onCancel={hideDatePicker}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textInput: {
    fontSize: 16,
    color: '#000000',
    height: 50,
    width: 300,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
  },
});
