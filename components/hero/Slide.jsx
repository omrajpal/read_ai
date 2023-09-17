import React from 'react'
import { Text, View, StyleSheet} from 'react-native';

import LottieView from 'lottie-react-native';
import { COLORS } from '../../constants';

const Slide = ( { heading, lottieFile, description, size}) => {

  const slideSize = size || 375;

  return (
    <View>
      <Text style={styles.baseText}>{heading}</Text>
      <LottieView
        autoPlay
        loop
        style={{
          width: slideSize,
          height: slideSize,
          backgroundColor: "#ffffff",
          alignContent: "center",
        }}
        source={lottieFile}
      />
      <Text style={styles.lowerText}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontWeight: 'bold',
    fontSize: 35,
    color: COLORS.primary,
    paddingLeft: 10,
    paddingTop: 10,
  },
  lowerText: {
    fontSize: 28,
    color: COLORS.primary,
    paddingLeft: 10,
    paddingTop: 10,
  },
});


export default Slide;