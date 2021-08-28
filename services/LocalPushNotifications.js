import PushNotification from 'react-native-push-notification'
import Task from '../model/Task'

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
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    console.log('Action: ', notification.action)
    console.log('LOCAL NOTIFICATION ==>', notification)
  },

  popInitialNotification: true,
  requestPermissions: true
})

export const scheduleTaskNotification = (task: Task) => {
  console.log('Adding notification for task : ', task)
  PushNotification.localNotificationSchedule({
    autoCancel: true,
    bigText:
      'This is scheduled notification for task: ' + task.name + '. Task done?',
    subText: task.name,
    title: task.name,
    message: 'Task done?',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]',
    channelId: 'channel-id',
    date: task.time
  })
}
