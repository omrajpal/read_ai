import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator, Modal, Image } from "react-native";
import { useState } from "react";
import FoodModal from "./modal/FoodModal";
import {checkImageURL} from "../../../utils";

import styles from "./fooditem.style";

const FoodItem = ( {food} ) => {

    const [modalVisible, setModalVisible] = useState(false);

    const onPress = () => {
        setModalVisible(false);
    }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <FoodModal food={food} onPress={onPress} thumbnail={food.thumbnail} />
      </Modal>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={
            checkImageURL(food.thumbnail)
              ? { uri: food.thumbnail }
              : require("../../../assets/images/nutrition_logo.png")
          }
          resizeMode="contain"
          style={styles.logImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={2}>
          {food.id}
        </Text>
      </View>
      <View style={styles.calorieContainer}>
        <Text style={styles.jobName} numberOfLines={2}>
          Cal
        </Text>
        <Text style={styles.calories}>{food.calories}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FoodItem;
