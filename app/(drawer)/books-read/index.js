import { Text, View, SafeAreaView, ScrollView, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from '@react-navigation/drawer';
import { COLORS, icons, images, SIZES } from "../../../constants";
import useFetch from "../../../hook/useFetch";
import styles from "../../../styles/search";
import { useRouter} from "expo-router";
import { useState, useEffect } from "react";
import NearbyJobCard from "../../../components/common/cards/nearby/NearbyJobCard";
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import the Ionicons from @expo/vector-icons
import * as SecureStore from 'expo-secure-store';
import SearchButton from "../../../components/home/welcome/SearchButton";
// const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

const BooksReadPage = () => {

  const router = useRouter();

  const [booksRead, setBooksRead] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cat, setCat] = useState("");
  const [gen, setGen] = useState("");
  const [refreshing, setRefreshing] = useState(false);


  const handleSearchClick = () => {
    router.push({
      pathname: "(drawer)/home/search",
      params: {cat: cat, gen: gen}
    });
  }

  // TESTING
  const testData = false;

  async function save(key, value) { // only used for test cases
      await SecureStore.setItemAsync(key, value);
  }

  if (testData) {
    save("books-read", "uNMjeFMorPgC Xh2rEAAAQBAJ R2cqDAAAQBAJ"); // if we would just like to see app working
  }
  // TESTING

  async function getValueFor(key) { // used to get current books read
    let result = await SecureStore.getItemAsync(key);
    return result;
  }

  const loadBooksRead = () => {
    getValueFor("books-read")
      .then((rawData) => {
        setBooksRead(rawData ? rawData.split(" ") : []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        setIsLoading(false);
      });
  };

  const loadData = () => {
    setRefreshing(true);
    // Fetch Books Read
    loadBooksRead();
    setRefreshing(false);
  };

  useEffect(() => {
    // Assuming `yourPromiseFunction` is the function that returns your Promise
    getValueFor("data")
    .then((value) => {
        const data = value.split("*")[1];
        setCat(data.substring(0,24));
        setGen(data.substring(24))
        setIsLoading(false);
    })
    .catch((error) => {
        console.error("An error occurred:", error);
        setIsLoading(false);
    });

     // Fetch books read initially
     loadBooksRead();
  }, []);
  
  const { data, apiIsLoading, error } = useFetch("/getBooks", {
    cat: cat,
    gen: gen,
  });
  
  useEffect(() => {
    setIsLoading(apiIsLoading);
  }, [apiIsLoading]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Drawer.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.secondary },
          headerShadowVisible: false,
          headerLeft: () => <DrawerToggleButton tintColor={COLORS.lightWhite} />,
          title: '',
        }}
      />
      <FlatList
        data={data.filter((item) => booksRead.includes(item.id))}
        renderItem={({ item }) => (
          <NearbyJobCard
            book={item}
            handleNavigate={() =>
              router.push({
                pathname: `(drawer)/home/book-details/${item.id}`,
                params: { cat: cat, gen: gen },
                back: {}
              })
            }
          />
        )}
        keyExtractor={(book) => book.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadData} />
        }
        contentContainerStyle={{ rowGap: SIZES.medium, padding: SIZES.medium}}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <MaterialCommunityIcons 
                name="bookshelf" 
                size={50} 
                color={COLORS.primary}
                style={styles.icon} 
                />
              <Text style={styles.searchTitle}>Books Read</Text>
              <SearchButton 
                onPress={handleSearchClick}
                searchText={"Search for a book you've read!"}
              />
            </View>
            <View style={styles.loaderContainer}>
              {isLoading ? (
                <ActivityIndicator size='large' color={COLORS.primary} />
              ) : error && <Text>Oops something went wrong</Text>}
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default BooksReadPage;