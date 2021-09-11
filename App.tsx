import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, ToastAndroid, Modal, Pressable, ScrollView, Image, ActivityIndicator } from 'react-native';
import InputCard from './components/InputCard';
import Task from './model/Task';
import TaskView from './components/Task';
import DeviceInfo from 'react-native-device-info';
import { saveTask, getAllTasks, upsertUser, getAllUsers } from './services/PersistenceService';
import { AxiosResponse } from 'axios';
import './services/PushNotifications'
import User from './model/User';
import { updateUser } from './services/PushNotifications';

let user = new User()

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task>(new Task());
  const [loading, setLoading] = useState(true);

  async function initializeScreen() {
    console.log("Initializing the screen!");
    await initializeUser()
    await fetchTasks()
  }

  async function initializeUser() {
    console.log("Fetching user info!!");
    setLoading(true);
    user.userId = await DeviceInfo.getAndroidId().then((androidId) => androidId);
    user.deviceName = await DeviceInfo.getDeviceName().then((name) => name);
    console.log("Initialized user : ", user);
    updateUser(user);
  }

  async function fetchTasks() {
    console.log("Fetching all tasks!!");
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
    initializeScreen()
  }, []);

  
  const handleClose = () => {
    setShowModal(false);
  }

  const addTask = () => {
    tasks.push(currentTask);
    saveTask(user.userId, currentTask);
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

  async function viewProfile() {
    let response = await getAllUsers();
    console.log(response.data);
    ToastAndroid.show(`You are : ${user.deviceName} . The following devices are part of the group : ${response.data.map((user) => user.deviceName)}` , ToastAndroid.LONG)
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBanner}>
        <Text style={{flex:6}}>Welcome to the App!</Text>
        <Pressable style={{flex:1}} onPress={viewProfile}>
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
          {!loading &&
           taskViews.length === 0 && 
           <Text>No tasks for the day, please add one!</Text>} 
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

export const getUser = () => {
  return user;
}

export const updateUserToken = (token: string) => {
  user.token = token;
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
