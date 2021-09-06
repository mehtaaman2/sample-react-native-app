import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DayPicker from './DayPicker';
import Task from '../model/Task';

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

export interface TaskProps {
  task: Task;
}

const TaskView: React.FC<TaskProps> = ({task}) => {
  console.log(task);
  return (
  <View style={styles.container}>
    <Text >Task Name : {task.name} </Text>
    <Text >Time : {task.time && task.time.toLocaleTimeString().slice(0,5)} </Text>
    <DayPicker daysSelected={task && task.days} pressDisabled={true}/>
  </View>
);
}

export default TaskView;
