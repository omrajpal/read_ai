import React from 'react'
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import { COLORS } from '../../../constants';

const BookIcon = ({imgUri}) => {
  return (
    <TouchableOpacity>
      <Image
        height={100}
        width={100}
        source={{uri: imgUri}}
        style={{borderRadius: 20}}
      />
    </TouchableOpacity>
  )
}

export default BookIcon;

