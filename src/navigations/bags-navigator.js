import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {BagScreen} from '../scenes/bag-screen';
import {BagsScreen} from '../scenes/bags-screen';

const Stack = createNativeStackNavigator();

export const BagsNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Homescreen"
      component={BagsScreen}
      options={{
        headerLargeTitle: false,
        headerStyle: {
          backgroundColor: '#36656F',
        },
        headerTintColor: '#fff',
        title: 'Thrift',
      }}
    />
    <Stack.Screen
      name="BagDetail"
      component={BagScreen}
      options={{
        headerLargeTitle: true,
        headerStyle: {
          backgroundColor: 'rgba(0, 0, 0, 0)',
        },
        headerTintColor: '#fff',
        title: '',
      }}
    />
  </Stack.Navigator>
)