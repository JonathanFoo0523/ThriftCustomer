import React from 'react';
import {TouchableOpacity, View, Linking, Appearance} from 'react-native';
import {RoundedMaterialCommunityIcons} from '../atoms/rounded-material-community-icons';
import MapView, {Marker} from 'react-native-maps';

export const MapViewWithLink = ({address, height}) => {
  const colorScheme = Appearance.getColorScheme();
  return (
    <View>
      <MapView
        style={{height: height, width: '100%', borderRadius: 10}}
        initialRegion={{
          latitude: address.coordinate.latitude,
          longitude: address.coordinate.longitude,
          latitudeDelta: 0.0025,
          longitudeDelta: 0.0025,
        }}>
        <Marker
          coordinate={{
            latitude: address.coordinate.latitude,
            longitude: address.coordinate.longitude,
          }}
        />
      </MapView>
      <TouchableOpacity
        style={{alignSelf: 'flex-end', position: 'absolute', padding: 7}}
        onPress={() =>
          Linking.openURL(
            encodeURI(
              `http://maps.apple.com/?q=${address.line1}?ll=${address.coordinate.latitude},${address.coordinate.longitude}`,
            ),
          )
        }>
        <RoundedMaterialCommunityIcons
          name="google-maps"
          size={35}
          color={colorScheme === 'light' ? '#36656F' : '#FAF5F0'}
        />
      </TouchableOpacity>
    </View>
  );
};
