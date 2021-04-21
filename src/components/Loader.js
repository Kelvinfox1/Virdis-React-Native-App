/* eslint-disable prettier/prettier */
import React from 'react';
import {ActivityIndicator, Colors} from 'react-native-paper';

const Loader = () => (
  <ActivityIndicator animating={true} color={Colors.red800} />
);

export default Loader;
