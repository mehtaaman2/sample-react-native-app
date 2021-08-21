import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Modal, Pressable } from 'react-native';
import InputCard from './components/InputCard';
import Task from './model/Task';
import TaskView from './components/Task';

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(new Task());

  const handleClose = () => {
    setShowModal(false);
  }

  const addTask = () => {
    tasks.push(currentTask);
    setTasks(tasks);
    setCurrentTask({});
    setShowModal(false);
  }

  let taskViews = []
  for(let i=0; i < tasks.length; i++) {
    let task = tasks[i];
    taskViews.push(
      <View key = {i}>
        <TaskView task={task}/>
      </View>
    )
  }

  return (
    <React.Fragment>
    <View style={styles.container}>
      <Text>Welcome to the App!</Text>
    </View>
    {taskViews.length != 0 && taskViews}
    <View>
      <Button style={styles.addAlertButton} title="Add alert" onPress={() => {setShowModal(true);}}/>
    </View>


    <Modal visible={showModal}
             transparent={false}
             onRequestClose={handleClose}>
     <InputCard setTask={setCurrentTask}/>
     <View style={styles.buttonsView}>
       <Pressable style={[styles.button, styles.buttonClose]} onPress={handleClose}>
             <Text style={styles.textStyle}>Cancel</Text>
       </Pressable>
       <Pressable style={[styles.button, styles.buttonClose]} onPress={addTask}>
             <Text style={styles.textStyle}>Save task</Text>
       </Pressable>
     </View>
    </Modal>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  addAlertButton: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    flex: 1,
    backgroundColor: "#2196F3",
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});
