import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image} from 'react-native';

import {BagScreen} from '../scenes/bag-screen';
import {BagsScreen} from '../scenes/bags-screen';

const Stack = createNativeStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{width: 100, height: 30}}
      source={require('../assets/images/thrift-logo.jpeg')}
    />
  );
}

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
        headerTitle: () => <LogoTitle />,
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
);
