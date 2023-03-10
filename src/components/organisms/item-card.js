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
import {normalize} from '../../utils/font-normalize';

export const ItemCard = ({item}) => {
  const navigation = useNavigation();
  const itemRemaining = item.quantity - item.ordered;

  return (
    <TouchableOpacity
      style={[styles.container,{opacity: itemRemaining ? 1.0 : 0.6}]}
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
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.businessCategoryText}>
                {item.business.category}
              </Text>
              <Text style={styles.businessNameText}>{item.business.name}</Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              {!itemRemaining ? (
                <View style={{backgroundColor: 'darkgray', borderRadius: 15}}>
                  <Text style={{fontWeight: 'bold', fontSize: normalize(15), padding: 5}}>
                    Sold Out
                  </Text>
                </View>
              ) : (
                <></>
              )}
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.itemInfoContainer}>
        <View style={styles.itemNameTimeContainer}>
          <Text style={styles.itemNameText}>{item.name}</Text>
          <Text style={styles.itemCollectionTimeText}>
            {pickupTimeDescription(
              item.collection.from.toDate(),
              item.collection.to.toDate(),
            )}
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
    fontSize: normalize(15),
    fontWeight: '600',
  },
  businessNameText: {
    color: 'white',
    fontSize: normalize(20),
    fontWeight: 'bold',
  },
  itemPriceContainer: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  itemWorthText: {
    color: 'grey',
    fontSize: normalize(13),
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  itemPriceText: {
    fontSize: normalize(17),
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
    fontSize: normalize(17),
    fontWeight: 'bold',
  },
  itemCollectionTimeText: {
    color: 'grey',
    fontSize: normalize(17),
    fontWeight: '700',
  },
});
