import React, {useState} from 'react';
import { TextInput, View, StyleSheet, Button, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Task from '../model/Task';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  inputText: {
    padding: 10,
    borderBottomWidth: 1,
  },
  showPickerButton: {
    padding: 20,
    paddingLeft: 20,
  },
  timeView: {
    flexDirection: 'row',
  }
})

const InputCard = (props) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [currentTask, setCurrentTask] = useState(new Task());

  const onDateChange = (event, selectedTime) => {
    setShowPicker(false);
    if(event.type === 'set') {
      setDate(selectedTime);
      currentTask.time=selectedTime.toLocaleTimeString().slice(0,5);
      setCurrentTask(currentTask);
      props.setTask(currentTask);
    }
  }


  const onChangeText = (text) => {
    currentTask.name = text;
    setCurrentTask(currentTask);
    props.setTask(currentTask);
  }

  const onSelectTimePress = () => {
    setShowPicker(true);
  }

  return (
  <View style={styles.container}>
    <TextInput editable={true} maxlength={100} multiline={false} style={styles.inputText} placeholder="Task Name" maxLength={40}  onChangeText={onChangeText}/>
    <View style={styles.timeView}>
      <Button title="Select time" onPress={onSelectTimePress} style={styles.showPickerButton}/>
      <Text>{date.toLocaleTimeString().slice(0,5)}</Text>
      {showPicker && (<DateTimePicker mode="time" value={new Date()} onChange={onDateChange} />)}
    </View>
  </View>
);
}

export default InputCard;
