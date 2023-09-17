import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons"; // Import the Ionicons from @expo/vector-icons
import { COLORS, SHADOWS, SIZES } from "../../../../constants";
import { useRouter } from "expo-router";

const CameraButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={() => {
        console.log("test")
        router.push("camera");
    }}>
      <Ionicons name="camera" size={28} color="white" style={styles.icon} />
      <Text style={styles.buttonText}>
        Take a picture of your food
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 25, // Rounded corners to make it pill-shaped
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
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
    color: "white",
    fontSize: 20,
  },
  icon: {
    marginRight: 10, // Add some margin to the right of the icon
  },
});

export default CameraButton;
