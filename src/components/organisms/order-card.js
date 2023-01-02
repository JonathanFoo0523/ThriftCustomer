import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, {Marker} from 'react-native-maps';

import {OrderStatusProgress} from '../molecules/order-status-progress';
import {Button} from '../atoms/button';
import {PressLoadingButton} from '../molecules/press-loading-button';
import {
  pickupTimeDescription,
  monthShorthands,
  pad,
} from '../../utils/date-time-formater';

import firestore from '@react-native-firebase/firestore';

export const OrderCard = ({order}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitleText}>Order ID</Text>
        <Text style={styles.orderIDText}>{order.id.slice(0, 10)}</Text>
        <Text style={styles.orderTimeText}>
          {order.time.getDate()} {monthShorthands[order.time.getMonth()]} •{' '}
          {pad(order.time.getHours(), 2)}:{pad(order.time.getMinutes(), 2)}
        </Text>
      </View>

      <View style={styles.orderStatusContainer}>
        <OrderStatusProgress size={50} status={order.status} />
        <Text
          style={[
            styles.statusDescriptionText,
            {color: order.status.slice(-1) !== 'X' ? '#36656F' : '#E54B4B'},
          ]}>
          {statusDesciption(order.status)}
        </Text>
      </View>

      <View style={styles.twinDescriptionContainer}>
        <TitleDescription title="Item" description={order.item.name} />
        <TitleDescription
          title="Total Price"
          description={'RM' + order.item.price}
          style={{alignItems: 'flex-end'}}
        />
      </View>

      <TitleDescription
        title="Collection Time"
        description={pickupTimeDescription(order.item.from, order.item.to)}
      />

      <View style={{paddingBottom: 25}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TitleDescription
            title="Restaurant"
            description={order.business.name + '\n' + order.business.contact}
            style={{flex: 1}}
          />
          <TouchableOpacity style={{alignContent: 'center'}}>
            <MaterialCommunityIcons
              name="phone-outgoing"
              size={27}
              color={'#36656F'}
            />
          </TouchableOpacity>
        </View>

        <MapView
          style={{height: 150, width: '100%', borderRadius: 10}}
          initialRegion={{
            latitude: order.business.location.latitude,
            longitude: order.business.location.longitude,
            latitudeDelta: 0.0025,
            longitudeDelta: 0.0025,
          }}>
          <Marker
            coordinate={{
              latitude: order.business.location.latitude,
              longitude: order.business.location.longitude,
            }}
          />
        </MapView>
      </View>

      <View style={{alignItems: 'center'}}>
        <OrderActionButton
          status={order.status}
          orderId={order.id}
          itemId={order.item.id}
        />
      </View>
    </View>
  );
};

const TitleDescription = ({style, title, description}) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: 'flex-start',
      paddingBottom: 15,
    },
    titleText: {
      fontSize: 17,
      fontWeight: '500',
    },
    descriptionText: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'grey',
    },
  });

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.descriptionText}>{description}</Text>
    </View>
  );
};

const OrderActionButton = ({status, orderId, itemId}) => {
  switch (status) {
    case 'O':
    case 'OO':
      return (
        <PressLoadingButton
          text="Cancel Order"
          size={17}
          color="#E54B4B"
          style={{width: '60%'}}
          onPress={() => onCancelOrder(orderId, itemId)}
        />
      );
    case 'OX':
    case 'OOOO':
    case 'OOX':
      return (
        <Button
          text="Give Feedback"
          size={17}
          color="#36656F"
          style={{width: '60%'}}
          role="secondary"
        />
      );
    case 'OOO':
      return (
        <Button
          text="Arrived For Pickup"
          size={17}
          color="#36656F"
          style={{width: '60%'}}
          onPress={() => onPickupOrder(orderId)}
        />
      );
  }
};

function onCancelOrder(orderId, itemId) {
  const orderRef = firestore().collection('orders').doc(orderId);
  const itemRef = firestore().collection('items').doc(itemId);

  return firestore().runTransaction(async transaction => {
    const orderSnapshot = await transaction.get(orderRef);
    const itemSnapshot = await transaction.get(itemRef);

    transaction.update(orderRef, {
      status: 'OX',
    });

    transaction.update(itemRef, {
      ordered: itemSnapshot.data().ordered - 1,
    });
  });
}

function onPickupOrder(orderId) {
  const orderRef = firestore().collection('orders').doc(orderId);

  return firestore().runTransaction(async transaction => {
    const orderSnapshot = await transaction.get(orderRef);

    transaction.update(orderRef, {
      status: 'OOOO',
    });
  });
}

function statusDesciption(status) {
  switch (status) {
    case 'X':
      return 'Error Placing Order';
    case 'O':
      return 'Awaiting Order Confirmation';
    case 'OX':
      return 'Order Cancelled';
    case 'OO':
      return 'Order Confirmed';
    case 'OOX':
      return 'Order Not Collected';
    case 'OOO':
      return 'Pickup Now';
    case 'OOOO':
      return 'Order Completed';
    default:
      return 'Unknown Status';
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  headerContainer: {
    alignItems: 'center',
    paddingBottom: 15,
  },
  headerTitleText: {
    fontSize: 17,
    fontWeight: '500',
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
