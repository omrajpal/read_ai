import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES, FONT } from "../../../constants";
import { FoodList, CameraButton } from "../../../components";
import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from "@react-navigation/drawer";
import TextTicker from "react-native-text-ticker";
import Slide from "../../../components/hero/Slide";
import { black } from "react-native-ios-kit/src/styles/colors";

const Page = () => {
  const [title, setTitle] = useState(""); // State for the animated title
  const titleRef = useRef(null);

  useEffect(() => {
    // Simulate a typing animation by updating the title character by character
    const targetTitle = "NutritionAI";
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < targetTitle.length) {
        setTitle(targetTitle.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 200); // Adjust the typing speed as needed
    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <View>
        <Drawer.Screen
          options={{
            headerStyle: { backgroundColor: COLORS.secondary },
            headerShadowVisible: false,
            headerLeft: () => (
              <DrawerToggleButton tintColor={COLORS.lightWhite} />
            ),
            title: "",
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              padding: SIZES.medium,
              paddingBottom: 90, // Add padding to create space for the button
            }}
          >
            {/* Use the TextTicker component for the title */}
            <TextTicker
              ref={titleRef}
              style={{
                fontFamily: FONT.bold,
                fontSize: SIZES.xxLarge,
                color: COLORS.primary,
              }}
              duration={4000} // Adjust the duration for animation speed
              loop
              bounce
              repeatSpacer={50}
              marqueeDelay={1000}
            >
              {title}
            </TextTicker>
            <Slide
              doesLoop={false}
              style={styles.slide4}
              lottieFile={require("./../../../assets/lottie/diet_plan")}
              size={200}
            />
            <FoodList />
          </View>
        </ScrollView>
        <View style={styles.cameraButtonContainer}>
          <CameraButton />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cameraButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.medium,
    backgroundColor: "transparent",
  },
  slide4: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: black,
  },
});

export default Page;