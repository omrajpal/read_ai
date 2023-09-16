import { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Linking,
} from "react-native";
import {
  Stack,
  useRouter,
  Link,
  useLocalSearchParams,
  Redirect,
} from "expo-router";
import * as SecureStore from "expo-secure-store";

import { COLORS, icons, images, SIZES } from "../../../constants";
import {
  FoodList,
  CameraButton,
} from "../../../components";
import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from "@react-navigation/drawer";

const Page = () => {

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Text>NutritionAI</Text>
          <CameraButton />
          <FoodList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Page;
