import React, {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export const UserIdContext = React.createContext('undef');

export const UserIdProvider = ({children}) => {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    async function getOrInitUserId() {
      try {
        let temp = await AsyncStorage.getItem('USER_ID');
        if (temp == null) {
          console.log('USER_ID not found.');
          temp = uuid.v4();
          await AsyncStorage.setItem('USER_ID', temp);
          console.log('USER_ID generated: ' + temp);
        } else {
          console.log('USER_ID Found: ' + temp);
        }
        setUserId(temp);
      } catch (error) {
        console.error(error);
      }
    }
    if (!userId) {
      getOrInitUserId();
    }
  });

  return (
    <UserIdContext.Provider value={userId}>{children}</UserIdContext.Provider>
  );
};

export const useUserId = () => React.useContext(UserIdContext);
