import React, {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export const UserIdContext = React.createContext('undef');

export const UserIdProvider = ({children}) => {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    async function getOrInitUserId() {
      let temp = await AsyncStorage.getItem('USER_ID');
      if (temp == null) {
        temp = uuid.v4();
        await AsyncStorage.setItem('USER_ID', uuid.v4());
      }
      setUserId(temp);
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
