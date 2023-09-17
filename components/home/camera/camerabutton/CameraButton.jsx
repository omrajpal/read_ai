import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons"; // Import the Ionicons from @expo/vector-icons
import { COLORS } from "../../../../constants";
import { useRouter } from "expo-router";

const CameraButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={() => {
        router.push("camera");
    }}>
      <Ionicons name="camera" size={24} color="white" style={styles.icon} />
      <Text style={styles.buttonText}>
        Take a picture of your item
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    backgroundColor: COLORS.tertiary,
    borderRadius: 25, // Rounded corners to make it pill-shaped
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  icon: {
    marginRight: 10, // Add some margin to the right of the icon
  },
});

export default CameraButton;
