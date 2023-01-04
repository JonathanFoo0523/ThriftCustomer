import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import {ItemCard} from '../components/organisms/item-card';
import firestore from '@react-native-firebase/firestore';

import {ItemCardSkeleton} from '../components/organisms/item-card-skeleton';
import {FocusAwareStatusBar} from '../components/atoms/focus-aware-status-bar';

export function BagsScreen() {
  const businessRef = firestore().collection('business');
  const itemsRef = firestore()
    .collection('items')
    .where('collection.to', '>', firestore.Timestamp.now());
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const renderItem = ({item}) => <ItemCard item={item} />;

  useEffect(() => {
    return itemsRef.onSnapshot(async querySnapshot => {
      const list = [];

      for (let item of querySnapshot.docs) {
        const {name, price, worth, businessId, collection, quantity, ordered} =
          item.data();
        const business = await (await businessRef.doc(businessId).get()).data();
        list.push({
          id: item.id,
          name,
          price,
          worth,
          quantity,
          ordered,
          collection,
          businessId,
          business: business,
        });
      }

      setItems(list);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <FocusAwareStatusBar barStyle="light-content" animater={true} />
      {isLoading ? (
        <BagsListPlaceholder />
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={{flex: 1, width: '100%'}}
          contentContainerStyle={{justifyContent: 'center'}}
          contentInsetAdjustmentBehavior="automatic"
        />
      )}
    </>
  );
}

const BagsListPlaceholder = () => (
  <FlatList
    data={[0, 1, 2, 3, 4]}
    renderItem={ItemCardSkeleton}
    keyExtractor={item => item}
    style={{flex: 1, width: '100%'}}
    contentContainerStyle={{justifyContent: 'center'}}
    scrollEnabled={false}
  />
);
