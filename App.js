import React, {useEffect} from 'react';
import {StatusBar, Alert} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {OrdersScreen} from './src/scenes/orders-screen';

import {UserIdProvider} from './src/utils/user-context-hook';
import {BagsNavigator} from './src/navigations/bags-navigator';

import {requestPermission} from './src/utils/notification';

import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    background: '#FAF5F0',
  },
};

const Tab = createBottomTabNavigator();

const App = () => {
  // Reset Badge count when app is opened
  useEffect(() => {
    notifee.setBadgeCount(0);
  }, []);

  // request permission when app launcesd
  useEffect(() => {
    async function requestUserPermission() {
      let authStatus = await messaging().hasPermission();

      if (authStatus !== messaging.AuthorizationStatus.AUTHORIZED) {
        authStatus = await messaging().requestPermission({
          alert: true,
          announcement: false,
          badge: true,
          carPlay: false,
          provisional: false,
          sound: true,
        });
      }
      const token = await messaging().getToken();
      console.log(token);
    }
    requestUserPermission();
  });

  // Listen For foreground notificatios
  useEffect(() => {
    async function displayNotification(notification) {
      await notifee.displayNotification({
        title: notification.title,
        body: notification.body,
      });
    }
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      displayNotification(remoteMessage.notification);
    });

    return unsubscribe;
  }, []);

  return (
    <UserIdProvider>
      <NavigationContainer theme={MyTheme}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Bags') {
                iconName = focused ? 'basket' : 'basket-outline';
              } else if (route.name === 'Orders') {
                iconName = focused ? 'reader' : 'reader-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'white',
            tabBarShowLabel: true,
            tabBarStyle: {backgroundColor: '#36656F', paddingVertical: 10},
          })}>
          <Tab.Screen
            name="Bags"
            options={{
              title: 'Bags',
              headerBlurEffect: 'light',
              headerLargeTitleShadowVisible: false,
              headerLargeTitle: true,
              headerStyle: {
                backgroundColor: '#36656F',
              },
              headerTintColor: '#fff',
              headerShown: false,
            }}
            component={BagsNavigator}
          />
          <Tab.Screen
            name="Orders"
            component={OrdersScreen}
            options={{
              title: 'Orders',
              headerLargeTitle: true,
              headerStyle: {
                backgroundColor: '#FAF5F0',
              },
              headerTintColor: '#000',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </UserIdProvider>
  );
};

export default App;
