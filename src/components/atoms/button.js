import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';

export const Button = ({color, size, role, text, style, onPress, ...props}) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'space-evenly',
      height: size * 2.5,
      borderRadius: size * 1.25,
      flexDirection: 'row',
    },
    text: {
      fontSize: size,
      fontWeight: 'bold',
    },
  });

  const activityIndicator =
    role === 'loading' ? (
      <ActivityIndicator size="small" color={color} />
    ) : (
      <></>
    );

  const activityIndicatorPlaceholder =
    role === 'loading' ? (
      <ActivityIndicator size="small" color="white" style={{opacity: 0}} />
    ) : (
      <></>
    );

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={role === 'disabled' || role === 'loading'}
      style={[
        styles.container,
        style,
        role === 'secondary'
          ? {borderColor: color, borderWidth: 3}
          : {
              backgroundColor:
                role === 'disabled' || role === 'loading'
                  ? color + '50'
                  : color,
            },
      ]}
      {...props}>
      {activityIndicator}
      <Text
        style={[
          styles.text,
          role === 'secondary' ? {color: color} : {color: 'white'},
        ]}>
        {text}
      </Text>
      {activityIndicatorPlaceholder}
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  role: 'primary',
  text: 'button',
  color: 'blue',
};
