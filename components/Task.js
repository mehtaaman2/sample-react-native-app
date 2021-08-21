import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DayPicker from './DayPicker';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth: 4
  },
  text: {
    flex: 1,
  }
})

const TaskView = (props) => {
  console.log("props received");
  console.log(props);
  return (
  <View style={styles.container}>
    <Text >Task Name : {props.task.name} </Text>
    <Text >Time : {props.task.time && props.task.time.toLocaleTimeString().slice(0,5)} </Text>
    <DayPicker days={props.task && props.task.days} pressDisabled={true}/>
  </View>
);
}

export default TaskView;