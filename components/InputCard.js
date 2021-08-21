import React, {useState} from 'react';
import { TextInput, View, StyleSheet, Pressable, Text } from 'react-native';
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
  timePicker: {
    flex: 1,
    borderRadius: 20,
    elevation: 2,
    backgroundColor: '#2196F3',
    flex: 1,
    padding:10,
  },
  timeDisplayText: {
    flex: 1,
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dayPicker: {
    flex: 15,
    paddingTop: 50,
    flexWrap: "wrap",
  }
})

const InputCard = (props) => {
  const [showPicker, setShowPicker] = useState(false);
  const [currentTask, setCurrentTask] = useState(new Task());

  const onDateChange = (event, selectedTime) => {
    if(event.type === 'set') {
      currentTask.time=selectedTime;
      setCurrentTask(currentTask);
      props.setTask(currentTask);
    }
    setShowPicker(false);
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
    <View style={{flex: 1, flexDirection:'row', flexWrap: 'wrap'}}>
      <TextInput editable={true} maxlength={100} multiline={false} style={styles.inputText} placeholder="Task Name" maxLength={40}  onChangeText={onChangeText}/>
      <Pressable onPress={onSelectTimePress} style={styles.timePicker}>
        {showPicker && (<DateTimePicker mode="time" value={new Date()} onChange={onDateChange} />)}
        <Text style={styles.timeDisplayText}>{currentTask.time ? currentTask.time.toLocaleTimeString().slice(0,5) : new Date().toLocaleTimeString().slice(0,5)}</Text>
      </Pressable>
    </View>
    <View style={styles.dayPicker}>
      <DayPicker setDays={onDayPickerChange}/>
    </View>
  </View>
);
}

export default InputCard;
