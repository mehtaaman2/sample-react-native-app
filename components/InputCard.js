import React, {useState} from 'react';
import { TextInput, View, StyleSheet, Button, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Task from '../model/Task';
import DayPicker from './DayPicker';

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 5,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  inputText: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
  },
  timeView: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    borderWidth: 2,
  },
  showPickerButton: {
    flex: 1,
    padding: 20,
    paddingLeft: 20,
  },
  timeDisplayText: {
    flex: 1,
    paddingLeft: 20,
  },
  dayPicker: {
    flex: 15,
    paddingTop: 20,
    flexWrap: "wrap",
  }
})

const InputCard = (props) => {
  const [showPicker, setShowPicker] = useState(false);
  const [currentTask, setCurrentTask] = useState(new Task());

  const onDateChange = (event, selectedTime) => {
    setShowPicker(false);
    if(event.type === 'set') {
      currentTask.time=selectedTime;
      setCurrentTask(currentTask);
      props.setTask(currentTask);
    }
  }

  const onChangeText = (text) => {
    currentTask.name = text;
    setCurrentTask(currentTask);
    props.setTask(currentTask);
  }

  const onDayPickerChange = (days) => {
    currentTask.days = days;
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
      <Text style={styles.timeDisplayText}>Time selected: {currentTask.time && currentTask.time.toLocaleTimeString().slice(0,5)}</Text>
      {showPicker && (<DateTimePicker mode="time" value={new Date()} onChange={onDateChange} />)}
    </View>
    <View style={styles.dayPicker}>
      <DayPicker setDays={onDayPickerChange}/>
    </View>
  </View>
);
}

export default InputCard;
