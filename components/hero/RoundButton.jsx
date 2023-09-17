import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, SHADOWS } from '../../constants';

const RoundButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.buttonText}>Get Started</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 25, // Rounded corners to make it pill-shaped
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  buttonText: {
    color: COLORS.lightWhite,
    fontSize: 20,
  },
});

export default RoundButton;
