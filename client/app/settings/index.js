
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { resetLocalAndBackendData } from "../../hook/storageHelpers";
import { useState, useEffect, useCallback } from "react";
import { fetchLocalData } from "../../hook/storageHelpers";
import { ActivityIndicator } from "react-native";
import { RefreshControl } from "react-native";
import styles from "../../styles/search";
import { COLORS, SIZES, FONT } from "../../constants";
import { FontAwesome5 } from '@expo/vector-icons';


export default function Settings() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [key, setKey] = useState(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    initializeData();
    setRefreshing(false);
  }, []);

  // Load initial data and set states
  const initializeData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Fetch UUID and local data
      const uuid = await fetchLocalData("uuidv4"); // dont need uuid4 because using locally
      const localData = await fetchLocalData(uuid); // Adjust this if fetchLocalData doesn't need uuid
      setKey(localData.key);

    } catch (error) {
      setError(error)
      console.error("An error occurred while initializing data:", error);
      // Optionally set an error state to display an error message to the user
    } finally {
      setIsLoading(false);
    }
  }, []); // If you use any external values in this function, they should be added to the dependency array

  useEffect(() => {
    initializeData();
  }, [initializeData]); // Run this effect when the component mounts

  const handleAccountDelete = async (key) => {
    try {
      // Delete account
      await resetLocalAndBackendData(key);
      // Redirect to login
      router.push("/hero")
    } catch (error) {
      console.error("An error occurred while deleting account:", error);
      // Optionally set an error state to display an error message to the user
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.secondary },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
            ><Ionicons name="arrow-back" size={24} color={COLORS.lightWhite} style={{ padding: 10 }} /></TouchableOpacity>
          ),
          headerTitle: "",
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{padding: 20}}>
          <View style={{ backgroundColor: COLORS.lightWhite }}>
            <View style={styles.container}>
              <Ionicons
                name='settings'
                size={50}
                color={COLORS.primary}
                style={styles.icon}
              />
              <Text style={styles.searchTitle}>Settings</Text>
              <Text style={styles.noOfSearchedJobs}>General</Text>
            </View>
            <View style={styles.loaderContainer}>
              {isLoading ? (
                <ActivityIndicator size='large' color={COLORS.primary} />
              ) : error && <Text>Oops something went wrong</Text>}
            </View>
            <TouchableOpacity style={buttonStyles.buttonContainer} onPress={() => handleAccountDelete(key)}>
              <FontAwesome5 name="trash" size={24} color="white" style={buttonStyles.icon} />
              <Text style={buttonStyles.buttonText}>Restart Account</Text>
            </TouchableOpacity>
            <Text style={{ padding: 5 }}>If you press the button, we will restart your account and you can re-take the inital survey.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

buttonStyles = StyleSheet.create({
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: COLORS.tertiary,
    borderRadius: 25, // Rounded corners to make it pill-shaped
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: 'white',
    fontSize: SIZES.medium,
    fontFamily: FONT.regular
  }, icon: {
    marginRight: 10, // Add some margin to the right of the icon
  },
});