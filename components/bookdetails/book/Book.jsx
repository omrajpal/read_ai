import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./book.style";
import { icons } from "../../../constants";
import { checkImageURL } from "../../../utils";

const Book = ({ score, bookLogo, title, subtitle, authors, rating, description, genre, pageCount, isbn, publisher, publishedDate, country }) => { // chnage to only show title or whatever you think looks good (remove unused props)
  return (
    <View style={styles.container}>
    <View style={styles.logoBox}>
      <Image
        source={{
          uri: checkImageURL(bookLogo)
            ? bookLogo
            : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
        }}
        style={styles.logoImage}
      />
    </View>

    <View style={styles.jobTitleBox}>
      <Text style={styles.jobTitle}>{title}</Text>
    </View>

    <View style={styles.companyInfoBox}>
      <Text style={styles.companyName}>{subtitle} / </Text>
      <View style={styles.locationBox}>
        <Image
          source={icons.location}
          resizeMode='contain'
          style={styles.locationImage}
        />
        <Text style={styles.locationName}>{country}</Text>
      </View>
    </View>
  </View>
  );
};

export default Book;