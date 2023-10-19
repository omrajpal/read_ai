import React from "react";
import { View, TouchableOpacity, Text, Linking, Image } from "react-native";
import { COLORS } from "../../../../constants";
import { AntDesign } from "@expo/vector-icons";

const FoodModal = ({ food, onPress, thumbnail }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          width: "85%",
          backgroundColor: COLORS.secondary,
          padding: 40,
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
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
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View>
            <Image
              source={require("../../../../assets/images/nutrition_logo.png")
              }
              resizeMode="contain"
              style={{
                width: 100,
                height: 100,
              }}
            />
          </View>
          <Text style={{ color: COLORS.primary, fontSize: 25 }}>{food.id}</Text>
          <Text style={{ color: COLORS.primary, fontSize: 20, marginTop: 10 }}>
            Calories: {food.calories}
          </Text>
          <Text style={{ color: COLORS.primary, fontSize: 20, marginTop: 10 }}>
            Amount Eaten: {food.amountEaten} liters
          </Text>
          <Text style={{ color: COLORS.primary, fontSize: 20, marginTop: 10 }}>
            Protien: 15.0 g
          </Text>
          <Text style={{ color: COLORS.primary, fontSize: 20, marginTop: 10 }}>
            Carbohydrates: 2.1 g
          </Text>
          <Text style={{ color: COLORS.primary, fontSize: 20, marginTop: 10 }}>
            Sugar: 7.0 g
          </Text>
        </View>
      </View>
    </View>
  );
};

const checkImageURL = (url) => {
  return url && url.startsWith("http");
};

export default FoodModal;