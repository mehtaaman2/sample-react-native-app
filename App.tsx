import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, ToastAndroid, Modal, Pressable, ScrollView, Image, ActivityIndicator } from 'react-native';
import InputCard from './components/InputCard';
import Task from './model/Task';
import TaskView from './components/Task';
import { scheduleTaskNotification } from './services/LocalPushNotifications';
import DeviceInfo from 'react-native-device-info';
import { saveTask, getAllTasks } from './services/PersistenceService';
import { AxiosResponse } from 'axios';

let userId = '';
DeviceInfo.getAndroidId().then((androidId) => {
  userId = androidId;
  console.log("Screen initialzed with user id : " + userId);
});

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task>(new Task());
  const [loading, setLoading] = useState(true);

  async function fetchTasks() {
    console.log("Fetching info!!");
    setLoading(true);
    let userId = await DeviceInfo.getAndroidId().then((androidId) => {
      return androidId;
    });
    let response: AxiosResponse<Task[]> = await getAllTasks(userId);
    let tasks: Task[] = response.data.map((task) => new Task(task));
    console.log('Response from GET API : ', tasks);
    setTasks(tasks);
    setLoading(false);
  }

  useEffect(() => {
    fetchTasks()
  }, []);

  
  const handleClose = () => {
    setShowModal(false);
  }

  const addTask = () => {
    tasks.push(currentTask);
    saveTask(userId, currentTask);
    scheduleTaskNotification(currentTask);
    setTasks(tasks);
    setCurrentTask(new Task());
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

  const viewDeviceInfo = () => {
    ToastAndroid.show("User id is : " + userId, ToastAndroid.SHORT)
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBanner}>
        <Text style={{flex:6}}>Welcome to the App!</Text>
        <Pressable style={{flex:1}} onPress={viewDeviceInfo}>
          <Image style={{width: 50, height: 50}} source={require('./images/profile-icon.png')}/>
        </Pressable>
      </View>
      <ScrollView style={styles.scrollView} persistentScrollbar={true}>
          {loading &&
            <View style={styles.loadingView}>
              <ActivityIndicator size="large" color="#0000ff"/>
              <Text>Loading tasks for the user!</Text>
            </View>
           }
          {!loading && tasks.map(function(task, i) {
            return (<View key = {i} style={styles.taskView}>
                      <TaskView task={task}/>
                  </View>)
          })}
      </ScrollView>
      <View style={styles.addAlertButton}>
        <Button title="Add alert" onPress={() => {setShowModal(true);}}/>
      </View>

      <Modal visible={showModal}
             transparent={false}
             onRequestClose={handleClose}>
     <InputCard setTask={setCurrentTask}/>
     <View style={styles.buttonsView}>
       <Pressable style={[styles.button, styles.buttonCancel]} onPress={handleClose}>
             <Text style={styles.textStyle}>Cancel</Text>
       </Pressable>
       <Pressable style={[styles.button, styles.buttonAdd]} onPress={addTask}>
             <Text style={styles.textStyle}>Save task</Text>
       </Pressable>
     </View>
    </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  topBanner: {
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  addAlertButton: {
    justifyContent: 'flex-end',
    alignContent: 'stretch'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonCancel: {
    flex: 1,
    backgroundColor: "#FA8072",
  },
  buttonAdd: {
    flex: 2,
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
  scrollView: {
    marginHorizontal: 10,
  },
  taskView: {
    padding: 5,
  },
  loadingView: {
    paddingTop: 200,
    alignItems: 'center',
  }
});
