import React from 'react';
import {View, Text} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const OrderEmptyScreen = () => {

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <MaterialCommunityIcons name="basket-fill" size={120} color="lightgrey" />
      <Text style={{fontSize: 25, fontWeight: 'bold', color: 'lightgrey'}}>Start Ordering Now</Text>
    </View>
  );
};
