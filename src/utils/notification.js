import notifee, {TriggerType} from '@notifee/react-native';
import {amPmTimeDescription} from './date-time-formater';

export const requestPermission = async () => {
  await notifee.requestPermission();
};

const OrderIdNotificationIdMap = {};

export const scheduleItemCollectionNotification = async item => {
  const collectionTime = item.collection.from.toDate().getTime();
  if (collectionTime < Date.now()) {
    console.log('Collection Began: Do not scedhule notification');
    return;
  } else {
    console.log('Scheduling Notification')
  }

  const trigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: collectionTime,
  };

  // Create a trigger notification
  const notificationId = await notifee.createTriggerNotification(
    {
      title: 'Your order is ready for collection',
      body:
        'Collect ' +
        item.name +
        ' at ' +
        item.business.name +
        ' before ' +
        amPmTimeDescription(item.collection.to.toDate()),
    },
    trigger,
  );

  return notificationId;
};
