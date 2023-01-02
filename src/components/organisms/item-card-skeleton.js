import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const ItemCardSkeleton = ({item}) => {
  return (
    <SkeletonPlaceholder
      borderRadius={10}
      backgroundColor="#36656F50"
      highlightColor="#36656F75">
      <View style={styles.container}>
        <View borderRadius={0} style={{flex: 8}} />
        <View style={styles.itemInfoContainer} borderRadius={5}>
          <View style={styles.itemNameTimeContainer}>
            <Text style={styles.itemNameText} />
            <Text style={styles.itemCollectionTimeText} />
          </View>
          <Text style={styles.itemPriceText} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 250,
    alignSelf: 'center',
    margin: 10,
    borderColor: 'grey',
    borderWidth: 2,
  },
  itemPriceContainer: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  itemPriceText: {
    fontSize: 17,
    fontWeight: 'bold',
    flex: 2,
    height: 25,
    marginLeft: 15,
    alignSelf: 'center',
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
    marginBottom: 5,
    width: '50%',
  },
  itemCollectionTimeText: {
    color: 'grey',
    fontSize: 17,
    fontWeight: '700',
    width: '90%',
  },
});
