import React, { Component } from 'react'
import {StyleSheet, Text, View, Button } from 'react-native'

import Swiper from 'react-native-swiper'
import Slide from './Slide'
import { width } from 'deprecated-react-native-prop-types/DeprecatedImagePropType'

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default class SwiperComponent extends Component {
  render() {
    return (
      <Swiper style={styles.wrapper} showsButtons={false}>
        <Slide
          style={styles.slide1}
          heading={"Welcome to NutritionAI!"}
          lottieFile={require("./../../assets/lottie/food_bowl.json")}
          description={
            "Track your food intake and get personalized recommendations to reach your health goals."
          }
        />
        <Slide
          style={styles.slide2}
          heading={"Grow with Computer Vision."}
          lottieFile={require("./../../assets/lottie/comp_vision.json")}
          description={
            "We use state of the art computer vision to identify your food and track your calories."
          }
          size={320}
        />
        <Slide
          style={styles.slide3}
          heading={"Eat confidently."}
          lottieFile={require("./../../assets/lottie/eating.json")}
          description={
            "With personalized recommendations, you can eat confidently knowing you are on track to reach your goals."
          }
        />
      </Swiper>
    );
  }
}