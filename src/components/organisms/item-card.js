import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import {pickupTimeDescription} from '../../utils/date-time-formater';

export const ItemCard = ({item}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('BagDetail', {
          item: item,
        })
      }>
      <ImageBackground
        source={{
          uri: item.business.coverImage,
        }}
        style={{flex: 8}}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.0)']}
          style={styles.gradientOverlay}>
          <View>
            <Text style={styles.businessCategoryText}>
              {item.business.category}
            </Text>
            <Text style={styles.businessNameText}>{item.business.name}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.itemInfoContainer}>
        <View style={styles.itemNameTimeContainer}>
          <Text style={styles.itemNameText}>{item.name}</Text>
          <Text style={styles.itemCollectionTimeText}>
            {pickupTimeDescription(item.collection.from, item.collection.to)}
          </Text>
        </View>
        <View style={styles.itemPriceContainer}>
          <Text style={styles.itemWorthText}>{'RM' + item.worth}</Text>
          <Text style={styles.itemPriceText}>{'RM' + item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 250,
    alignSelf: 'center',
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: 'grey',
    borderWidth: 0.5,
  },
  gradientOverlay: {
    flex: 1,
    padding: 15,
  },
  businessCategoryText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  businessNameText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemPriceContainer: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  itemWorthText: {
    color: 'grey',
    fontSize: 13,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  itemPriceText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  itemInfoContainer: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 10,
    flexDirection: 'row',
  },
  itemNameTimeContainer: {
    flex: 5,
    alignContent: 'flex-start',
    justifyContent: 'center',
  },
  itemNameText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  itemCollectionTimeText: {
    color: 'grey',
    fontSize: 17,
    fontWeight: '700',
  },
});
