/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import {name as appName} from './app.json';
import notifee, {EventType} from '@notifee/react-native';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('setBackgroundMessageHandler');
  await notifee.displayNotification({
    title: remoteMessage.data.title,
    body: remoteMessage.data.bod,
  });

  console.log(remoteMessage);
  // Increment the count by 1
  await notifee.incrementBadgeCount();
});

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;

  // Check if the user pressed the "Mark as read" action
  console.log(type);
  console.log(detail);
  console.log("hello2");
});

AppRegistry.registerComponent(appName, () => App);
