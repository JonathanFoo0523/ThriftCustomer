import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList} from 'react-native';
import {OrderCard} from '../components/organisms/order-card';
import firestore from '@react-native-firebase/firestore';
import {useUserId} from '../utils/current-user-context';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {OrderCardSkeleton} from '../components/organisms/order-card-skeleton';
import {OrderEmptyScreen} from './orders-empty-screen';

export function OrdersScreen({route}) {
  const ordersRef = firestore()
    .collection('orders')
    .where('userId', '==', useUserId())
    .orderBy('time', 'desc');
  const businessRef = firestore().collection('business');
  const itemsRef = firestore().collection('items');
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingNewOrder, setIsOrderNewLoading] = useState(false);
  const flatListRef = useRef(null);

  const renderItem = ({item}) => <OrderCard order={item} />;

  useEffect(() => {
    return ordersRef.onSnapshot(async querySnapshot => {
      const list = [];

      for (let order of querySnapshot.docs) {
        const {status, time, businessId, itemId} = order.data();
        const business = await (await businessRef.doc(businessId).get()).data();
        const item = await (await itemsRef.doc(itemId).get()).data();
        list.push({
          id: order.id,
          status,
          time: time.toDate(),
          item: {
            id: itemId,
            name: item.name,
            price: item.price,
            from: item.collection.from.toDate(),
            to: item.collection.to.toDate(),
          },
          business: {
            name: business.name,
            contact: business.contact.primary,
            location: business.address.coordinate.toJSON(),
          },
        });
      }
      setOrders(list);
      setIsLoading(false);
      setIsOrderNewLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!route.params) {
      return;
    }

    var index = -1;
    if (route.params.hasNewOrder) {
      setIsOrderNewLoading(true);
      index = 0;
    } else {
      index = orders.findIndex(order => order.id === route.params.jumpTo);
    }

    if (index != -1 && orders.length > 0 && flatListRef.current) {
      console.log(flatListRef);
      flatListRef.current.scrollToIndex({
        animated: true,
        index: index,
        viewPosition: 0.5,
      });
    }
  }, [route]);

  return isLoading ? (
    <OrdersListPlaceholder />
  ) : <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FlatList
        ref={flatListRef}
        data={orders}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={{flex: 1, width: '100%'}}
        ListHeaderComponent={isLoadingNewOrder ? OrderCardSkeleton : <></>}
        ListEmptyComponent={!isLoadingNewOrder ? OrderEmptyScreen : <></>}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
        scrollEnabled={orders.length != 0}
      />
    </View>
}

const OrdersListPlaceholder = () => (
  <FlatList
    data={[0, 1]}
    renderItem={OrderCardSkeleton}
    keyExtractor={item => item.id}
    style={{flex: 1, width: '100%'}}
    contentContainerStyle={{justifyContent: 'center'}}
    scrollEnabled={false}
  />
);
