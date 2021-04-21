/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, StyleSheet} from 'react-native';

const Logo = ({style}) => {
  return (
    <Image
      style={[styles.logo, style]}
      resizeMode="contain"
      source={require('../assets/image2.png')}
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 260,
    height: 95,
    alignSelf: 'center',
    marginTop: 45,
    marginBottom: 15,
  },
});

export default Logo;
