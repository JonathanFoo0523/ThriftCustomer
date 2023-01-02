import React from 'react';
import {View, StyleSheet} from 'react-native';

import {RoundedMaterialCommunityIcons} from '../atoms/rounded-material-community-icons';
import {Line} from '../atoms/line';

export const OrderStatusProgress = ({size, status, style}) => {
  const SuccessProgressIcon = ({name}) => {
    return (
      <RoundedMaterialCommunityIcons
        size={size}
        color="white"
        name={name}
        style={{borderColor: '#36656F', backgroundColor: '#36656F'}}
      />
    );
  };

  const FailureProgressIcon = ({name}) => {
    return (
      <RoundedMaterialCommunityIcons
        size={size}
        color="white"
        name={name}
        style={{borderColor: '#E54B4B', backgroundColor: '#E54B4B'}}
      />
    );
  };

  const IncompleteProgressIcon = ({name}) => {
    return (
      <RoundedMaterialCommunityIcons size={size} color="#36656F" name={name} />
    );
  };

  const UnreachableProgressIcon = ({name}) => {
    return (
      <RoundedMaterialCommunityIcons size={size} color="grey" name={name} />
    );
  };

  const OrderRequestedStatusIcon = ({state}) => {
    if (state === 'O') {
      return <SuccessProgressIcon name="basket-check-outline" />;
    } else if (state === 'X') {
      return <FailureProgressIcon name="basket-remove-outline" />;
    } else {
      return <IncompleteProgressIcon name="basket-outline" />;
    }
  };

  const OrderConfirmedStatusIcon = ({state}) => {
    if (state === 'O') {
      return <SuccessProgressIcon name="text-box-check-outline" />;
    } else if (state === 'X') {
      return <FailureProgressIcon name="text-box-remove-outline" />;
    } else if (reachable(1)) {
      return <IncompleteProgressIcon name="text-box-check-outline" />;
    } else {
      return <UnreachableProgressIcon name="text-box-check-outline" />;
    }
  };

  const OrderAwaitingPickupStatusIcon = ({state}) => {
    if (state === 'O') {
      if (status[3] == 'O') {
        return <SuccessProgressIcon name="store-check-outline" />;
      } else {
        return <SuccessProgressIcon name="store-clock-outline" />;
      }
    } else if (state === 'X') {
      return <FailureProgressIcon name="store-remove-outline" />;
    } else if (reachable(2)) {
      return <IncompleteProgressIcon name="store-clock-outline" />;
    } else {
      return <UnreachableProgressIcon name="store-clock-outline" />;
    }
  };

  const OrderCompletedStatusIcon = ({state}) => {
    if (state === 'O') {
      return <SuccessProgressIcon name="food-outline" />;
    } else if (state === 'X') {
      return <FailureProgressIcon name="food-outline" />;
    } else if (reachable(3)) {
      return <IncompleteProgressIcon name="food-outline" />;
    } else {
      return <UnreachableProgressIcon name="food-outline" />;
    }
  };

  const ReachableLine = ({index}) => {
    if (status[index] === 'O' || reachable(index + 1)) {
      return <Line color="#36656F" thickness={3} style={{flex: 1}} />;
    } else {
      return <Line color="grey" thickness={3} style={{flex: 1}} />;
    }
  }

  function reachable(index) {
    if (status[index - 1] === 'O') {
      return true;
    } else if (!status[index - 1] && index > 1) {
      return reachable(index - 1);
    } else {
      return false;
    }
  }

  return (
    <View style={styles.container}>
      <OrderRequestedStatusIcon state={status[0]} />
      <ReachableLine index={0} />
      <OrderConfirmedStatusIcon state={status[1]} />
      <ReachableLine index={1} />
      <OrderAwaitingPickupStatusIcon state={status[2]} />
      <ReachableLine index={2} />
      <OrderCompletedStatusIcon state={status[3]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});
