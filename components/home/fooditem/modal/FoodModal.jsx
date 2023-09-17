import React from 'react'
import { View, TouchableOpacity, Text, Linking} from 'react-native';
import { COLORS } from "../../../../constants";
import { AntDesign } from "@expo/vector-icons";

const FoodModal = ( {food, onPress} ) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          width: "85%",
          backgroundColor: COLORS.secondary, // <-- set background color
          padding: 40,
          borderRadius: 10,
          // Add shadow style for iOS
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          // Add shadow style for Android
          elevation: 5,
        }}
      >
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 10,
            top: 10,
          }}
          onPress={onPress}
        >
          <AntDesign name="close" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: COLORS.primary, fontSize: 20 }}>
            How We Use Your Data
          </Text>
        </View>
        <Text style={{ color: COLORS.primary, marginTop: 10 }}>
          ReadAI only asks the questions most relevant to maximize your
          self-improvement journey. To learn more visit our privacy policy{" "}
          <Text
            style={{ color: COLORS.primary, textDecorationLine: "underline" }}
            onPress={() =>
              Linking.openURL(
                "https://www.termsfeed.com/live/9b007a78-2d35-4e2d-bf53-d8dd2c5af8d3"
              )
            }
          >
            here
          </Text>
          .
        </Text>
      </View>
    </View>
  );
}

export default FoodModal;