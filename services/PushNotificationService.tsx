import PushNotification, {ReceivedNotification} from 'react-native-push-notification'
import Task from '../model/Task'
import moment from 'moment';
import User from '../model/User';
import { upsertUser } from './PersistenceService';
import { updateUserToken, getUser } from '../App';

let firebaseClientSdkToken = ''
PushNotification.createChannel(
    {
      channelId: "channel-id", // (required)
      channelName: "My channel", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created: boolean) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );

PushNotification.configure({

  onRegister: function(token) {
    console.log('TOKEN:', token)
    firebaseClientSdkToken = token.token;
    updateUserToken(firebaseClientSdkToken);
    getUser().userId !== '' && updateUser(getUser())
  },
  
  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification: Omit<ReceivedNotification, 'userInfo'>) {
    console.log('Notification recieved ==>', notification)
    if(notification.channelId === 'fcm_fallback_notification_channel') {
      console.log('Notification recieved is remote, sending a local notificaton for same!')
      let taskName = notification.title
      let timeOffset = notification.data['timeOffset']
      let time = moment(moment().format('YYYY-MM-DD') + 'T' + timeOffset).toDate()
      console.log("Date : ", time, " Title: ", taskName)
      PushNotification.localNotificationSchedule({
        autoCancel: true,
        bigText: 'This is scheduled notification for task: ' + taskName + '. Task done?',
        subText: taskName,
        title: taskName,
        message: 'Task done?',
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
        actions: ["Yes", "No"],
        channelId: 'channel-id',
        date: time
      })
    } else {
      console.log('The notification recieved is a local one!')
      console.log('Action: ', notification.action, ' for notification ', notification.title)
    }
  },

  popInitialNotification: true,
  requestPermissions: true
})

export const updateUser = async (user: User) => {
  if(firebaseClientSdkToken !== '') {
    user.token = firebaseClientSdkToken;
    await upsertUser(user);
  }
}
