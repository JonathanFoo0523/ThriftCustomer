import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Vibration,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, {Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';

import {Line} from '../components/atoms/line';
import {Button} from '../components/atoms/button';
import {pickupTimeDescription} from '../utils/date-time-formater';

import {useUserId} from '../utils/current-user-context';

export const BagScreen = ({navigation, route}) => {
  const itemParam = route.params.item;
  const userId = useUserId();
  const itemRef = firestore().collection('items').doc(itemParam.id);
  const orderRef = firestore()
    .collection('orders')
    .where('itemId', '==', itemParam.id)
    .where('userId', '==', userId)
    .orderBy('time', 'desc');
  const businessRef = firestore()
    .collection('business')
    .doc(itemParam.businessId);

  const [item, setItem] = useState(itemParam);
  const [buttonState, setButtonState] = useState('initial');
  const [orderId, setOrderId] = useState();

  useEffect(() => {
    return itemRef.onSnapshot(async itemSnapshot => {
      const item = itemSnapshot.data();
      item.business = await (await businessRef.get()).data();
      item.collection.from = item.collection.from.toDate();
      item.collection.to = item.collection.to.toDate();
      item.business.address.coordinate =
        item.business.address.coordinate.toJSON();

      const userOrder = await orderRef.get();
      
      if (userOrder.size !== 0 && userOrder.docs[0].data().status !== 'OX') {
        setButtonState('ordered');
        setOrderId(userOrder.docs[0].id);
      } else if (item.quantity - item.ordered === 0) {
        setButtonState('soldOut');
      } else {
        setButtonState('available');
      }
      setItem(item);
    });
  }, []);

  return (
    <>
      <ScrollView automaticallyAdjustContentInsets={true}>
        <Image
          source={{
            uri: item.business.coverImage,
          }}
          style={styles.coverImage}
        />

        <View style={styles.itemOverviewContainer}>
          <View style={styles.itemOverviewTopContainer}>
            <View>
              <Text style={styles.itemNameText}>{item.name}</Text>
              <Text style={styles.locationNameText}>{item.business.name}</Text>
              <Text style={styles.noAvailableText}>
                {item.quantity - item.ordered + ' Bag(s) Remaining'}
              </Text>
            </View>

            <View style={styles.itemOverviewBottomContainer}>
              <Text style={styles.worthText}>{'RM' + item.worth}</Text>
              <Text style={styles.priceText}>{'RM' + item.price}</Text>
            </View>
          </View>

          <View style={styles.pickupTimeContainer}>
            <Text style={{fontWeight: 'bold'}}>Pickup</Text>
            <Text style={{fontWeight: '500'}}>
              {pickupTimeDescription(item.collection.from, item.collection.to)}
            </Text>
          </View>
        </View>

        <Section title="Description">
          <Text style={{fontSize: 15, textAlign: 'justify'}}>
            {item.description}
          </Text>
        </Section>

        <Section title="Location">
          <Text style={{fontSize: 15}}>{item.business.address.line1}</Text>
          <Text style={{fontSize: 15, paddingBottom: 7}}>
            {item.business.address.line2}
          </Text>
          <MapView
            style={{height: 200, width: '100%', borderRadius: 10}}
            initialRegion={{
              latitude: item.business.address.coordinate.latitude,
              longitude: item.business.address.coordinate.longitude,
              latitudeDelta: 0.0025,
              longitudeDelta: 0.0025,
            }}>
            <Marker
              coordinate={{
                latitude: item.business.address.coordinate.latitude,
                longitude: item.business.address.coordinate.longitude,
              }}
            />
          </MapView>
        </Section>

        <Section title="Contact">
          <ContactButton
            value={item.business.contact.primary}
            iconName="phone-outline"
          />

          <Line
            thickness={1}
            color="lightgrey"
            style={{alignSelf: 'center', width: '95%'}}
          />

          <ContactButton value={item.business.contact.website} iconName="web" />
        </Section>
      </ScrollView>

      <View style={{alignItems: 'center', padding: 15}}>
        <OrderButton
          navigation={navigation}
          itemId={itemParam.id}
          userId={userId}
          state={buttonState}
          orderId={orderId}
        />
      </View>
    </>
  );
};

function OrderButton({navigation, itemId, userId, state, orderId}) {
  switch (state) {
    case 'initial':
      return (
        <Button
          color="#36656F"
          size={18}
          text="Order Now"
          style={{width: '100%'}}
          role="disabled"
        />
      );
    case 'available':
      return (
        <Button
          color="#36656F"
          size={18}
          text="Order Now"
          style={{width: '100%'}}
          onPress={() => {
            onSubmitOrder(itemId, userId);
            Vibration.vibrate();
            navigation.navigate('Orders', {hasNewOrder: true});
          }}
        />
      );
    case 'ordered':
      return (
        <Button
          text="View Order"
          size={18}
          color="#36656F"
          style={{width: '100%'}}
          role="secondary"
          onPress={() => navigation.navigate('Orders', {jumpTo: orderId})}
        />
      );
    case 'soldOut':
      return (
        <Button
          color="#36656F"
          size={18}
          text="Item Sold Out"
          style={{width: '100%'}}
          role="disabled"
        />
      );
  }
}

function onSubmitOrder(itemId, userId) {
  const itemRef = firestore().collection('items').doc(itemId);
  const newOrderRef = firestore().collection('orders').doc();

  return firestore().runTransaction(async transaction => {
    const item = await (await transaction.get(itemRef)).data();

    if (item.quantity - item.ordered < 1) {
      throw 'Item Sold Out';
    }

    transaction.update(itemRef, {
      ordered: item.ordered + 1,
    });

    await transaction.set(newOrderRef, {
      itemId: itemId,
      businessId: item.businessId,
      status: 'O',
      userId: userId,
      time: firestore.FieldValue.serverTimestamp(),
    });
  });
}

const Section = ({children, title}) => {
  return (
    <View style={{padding: 15, paddingBottom: 20}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', paddingBottom: 7}}>
        {title}
      </Text>
      {children}
    </View>
  );
};

const ContactButton = ({value, iconName}) => (
  <TouchableOpacity
    style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
    <MaterialCommunityIcons
      name={iconName}
      size={30}
      color={'#36656F'}
      style={{paddingRight: 10}}
    />
    <Text style={{fontSize: 15}}>{value}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  coverImage: {
    width: '100%',
    height: 350,
  },
  itemOverviewContainer: {
    backgroundColor: 'white',
    padding: 15,
  },
  itemOverviewTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  itemOverviewBottomContainer: {
    alignItems: 'flex-end',
  },
  itemNameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  locationNameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
  },
  noAvailableText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#36656F',
  },
  priceText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  worthText: {
    color: 'grey',
    fontSize: 14,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  pickupTimeContainer: {
    alignSelf: 'center',
    backgroundColor: '#FAF5F0',
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    padding: 10,
  },
});
