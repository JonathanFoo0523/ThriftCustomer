import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const OrderCardSkeleton = ({order}) => {
  return (
    <SkeletonPlaceholder backgroundColor='#00000030' highlightColor='#00000050' borderRadius={0}>
      <View style={styles.container}>
        <View style={{alignItems: 'center', paddingBottom: 25}}>
          <Text style={{width: 70, height: 20, marginBottom: 5}}>Order ID</Text>
          <Text style={{width: 150, height: 20}}>ORDERIDPLACEHOLDER</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 25, alignItems: 'center'}}>
          <View style={{width: 60, height: 60, borderRadius: 30}} />
          <View style={{flex: 1, height: 3}} />
          <View style={{width: 60, height: 60, borderRadius: 30}} />
          <View style={{flex: 1, height: 3}} />
          <View style={{width: 60, height: 60, borderRadius: 30}} />
          <View style={{flex: 1, height: 3}} />
          <View style={{width: 60, height: 60, borderRadius: 30}} />
        </View>
        

        <View style={{flexDirection: 'row'}}>
            <View style={{paddingBottom: 20, flex: 1}}>
                <View style={{height: 20, width: 70, borderRadius: 10, marginBottom: 5}} />
                <View style={{height: 20, width: 140, borderRadius: 10}} />
            </View>
            <View style={{paddingBottom: 20, flex: 1, alignItems: 'flex-end'}}>
                <View style={{height: 20, width: 70, borderRadius: 10, marginBottom: 5}} />
                <View style={{height: 20, width: 100, borderRadius: 10}} />
            </View>
        </View>

        <View style={{paddingBottom: 20}}>
            <View style={{height: 20, width: 70, borderRadius: 10, marginBottom: 5}} />
            <View style={{height: 20, width: 210, borderRadius: 10}} />
        </View>

        <View style={{height: 20, width: 70, borderRadius: 10, marginBottom: 5}} />
        <View style={{height: 150, width: '100%', borderRadius: 10, marginBottom: 25}} />

        <View
          style={{alignItems: 'center', alignSelf: 'center', width: '60%', height: 40, borderRadius: 20}}
        />
      </View>
    </SkeletonPlaceholder>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
  },
  headerContainer: {
    alignItems: 'center',
    paddingBottom: 15,
  },
  headerTitleText: {
    fontSize: 17,
    fontWeight: '500',
    width: 50,
  },
  orderIDText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#36656F',
  },
  orderTimeText: {
    fontSize: 15,
    fontWeight: '400',
    paddingBottom: 10,
    color: 'grey',
  },
  orderStatusContainer: {
    alignItems: 'center',
    paddingBottom: 15,
  },
  twinDescriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusDescriptionText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
});
