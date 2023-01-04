import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const ContactDetailButton = ({value, iconName, ...props}) => (
  <TouchableOpacity
    style={{flexDirection: 'row', alignItems: 'center', padding: 5}}
    {...props}>
    <MaterialCommunityIcons
      name={iconName}
      size={30}
      color={'#36656F'}
      style={{paddingRight: 10}}
    />
    <Text style={{fontSize: 15}}>{value}</Text>
  </TouchableOpacity>
);
