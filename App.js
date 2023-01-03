import React, {useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {OrdersScreen} from './src/scenes/orders-screen';

import {UserIdProvider} from './src/utils/user-context-hook';
import {BagsNavigator} from './src/navigations/bags-navigator';

import {requestPermission} from './src/utils/notification';

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
  useEffect(() => {
    requestPermission();
  });

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
