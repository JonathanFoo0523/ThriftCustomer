import React from 'react';
import {View} from 'react-native';

export const Line = ({thickness, color, style}) => {
  return <View style={[{height: thickness, backgroundColor: color}, style]} />;
};
