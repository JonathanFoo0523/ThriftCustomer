import React from 'react';
import {View, StyleSheet, useColorScheme} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const RoundedMaterialCommunityIcons = ({size, color, name, style}) => {
  const styles = StyleSheet.create({
    iconContainer: {
      width: size,
      height: size,
      borderRadius: size / 2,
      borderColor: color,
      borderWidth: size / 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={[styles.iconContainer, style]}>
      <MaterialCommunityIcons name={name} size={size * 0.6} color={color} />
    </View>
  );
};
