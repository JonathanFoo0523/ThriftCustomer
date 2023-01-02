import React, {useState} from 'react';

import {Button} from '../atoms/button';

export const PressLoadingButton = ({onPress, state, ...props}) => {
  const [pressed, setPressed] = useState(false);

  if (!pressed) {
    return (
      <Button
        {...props}
        onPress={() => {
          setPressed(true);
          onPress();
        }}
      />
    );
  } else {
    return <Button {...props} role="loading" />;
  }
};
