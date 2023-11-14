import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants';

const RoundButton = ({ onPress, legacyUser }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.buttonText}>{legacyUser === true ? "Jump back in!" : "Get Started"}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: COLORS.tertiary,
    borderRadius: 25, // Rounded corners to make it pill-shaped
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.lightWhite,
    fontSize: 16,
  },
});

export default RoundButton;
