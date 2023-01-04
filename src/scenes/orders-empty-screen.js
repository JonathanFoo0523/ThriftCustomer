import React from 'react';
import {View, Text} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FocusAwareStatusBar} from '../components/atoms/focus-aware-status-bar';
import {normalize} from '../utils/font-normalize';

export const OrderEmptyScreen = () => {
  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" animater={true} />
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <MaterialCommunityIcons
          name="basket-fill"
          size={120}
          color="lightgrey"
        />
        <Text style={{fontSize: normalize(25), fontWeight: 'bold', color: 'lightgrey'}}>
          Start Ordering Now
        </Text>
      </View>
    </>
  );
};
