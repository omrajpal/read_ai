import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from "react-native";
import { useState } from "react";

import styles from "./foodlist.style";
import { COLORS, SIZES } from "../../../constants";
import Date from "../date/Date";

const data = {
  items: [
    {
      date: "08-09-23",
      data: [
        {
          id: "Apple",
          calories: 110,
          thumbnail:
            "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          amountEaten: 1.1,
        },
        {
          id: "Orange",
          calories: 200,
          thumbnail:
            "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          amountEaten: 10.5,
        },
        {
          id: "Bannana",
          calories: 70,
          thumbnail:
            "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          amountEaten: 2.9,
        },
      ],
    },
    {
      date: "08-21-23",
      data: [
        {
          id: "Grapes",
          calories: 110,
          thumbnail:
            "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          amountEaten: 1.1,
        },
        {
          id: "Orange",
          calories: 200,
          thumbnail:
            "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          amountEaten: 1,
        },
        {
          id: "Bannana",
          calories: 70,
          thumbnail:
            "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          amountEaten: 3.1,
        },
      ],
    },
    {
      date: "08-13-23",
      data: [
        {
          id: "Bread",
          calories: 200,
          thumbnail:
            "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          amountEaten: 4.9,
        },
        {
          id: "Blueberries",
          calories: 250,
          thumbnail:
            "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          amountEaten: 12.5,
        },
        {
          id: "Kiwi",
          calories: 300,
          thumbnail:
            "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          amountEaten: 0.5,
        },
      ],
    },
  ]
};

const FoodList = () => {

  // const { data, isLoading, error } = useFetch("/getBooks/top", {});

  const isLoading = false;
  const error = false;

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <View>
            <FlatList
              data={data.items}
              renderItem={({ item }) => (
                <Date date={item.date} data={item.data} />
              )}
              keyExtractor={(item) => item.date}
              contentContainerStyle={{ columnGap: SIZES.medium }}
              vertical
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default FoodList;
