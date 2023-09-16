import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from "react-native";
import { useState } from "react";

import styles from "../foodlist/foodlist.style";
import { COLORS, SIZES } from "../../../constants";
import FoodItem from "../fooditem/FoodItem";

const Date = ({ date, data}) => {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{date}</Text>
      </View>
      <View style={styles.cardsContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <FoodItem
              food={item}
            />
          )}
          keyExtractor={(food) => food.id}
          contentContainerStyle={{ columnGap: SIZES.medium }}
          vertical
        />
      </View>
    </View>
  );
};

export default Date;
