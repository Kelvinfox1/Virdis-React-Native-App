/* eslint-disable prettier/prettier */
import React from 'react';
import {Snackbar} from 'react-native-paper';

const Message = ({children}) => {
  const [visible, setVisible] = React.useState(true);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismissSnackBar}
      action={{
        label: 'Dismiss',
        onPress: () => {
          // Do something
        },
      }}>
      {children}
    </Snackbar>
  );
};

export default Message;
