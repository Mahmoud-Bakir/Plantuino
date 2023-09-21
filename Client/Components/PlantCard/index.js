import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import colors from "../../assets/colors/colors";
import { useFonts } from "expo-font";

export default function PlantCard({
  name,
  price,
  destination,
  imageUrl,
  result = false,
}) {
  const [fontsLoaded] = useFonts({
    "Raleway-Bold": require("../../assets/fonts/Raleway-Bold.ttf"),
    "Raleway-Regular": require("../../assets/fonts/Raleway-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  if (result == true) {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image source={imageUrl} style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>{price} $</Text>
          <Text style={styles.description}>{destination}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={imageUrl} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price} $</Text>
        <Text style={styles.description}>{destination}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 180,
    height: 350,
    backgroundColor: colors.LightBlue,
    borderRadius: 20,
  },
  imageContainer: {
    height: 270,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "contain",
  },
  detailsContainer: {
    padding: 10,
    gap: 2,
  },
  name: {
    fontFamily: "Raleway-Bold",
    fontSize: 18,
  },
  price: {
    fontFamily: "Raleway-Bold",
    fontSize: 16,
    color: colors.Black,
  },
  description: {
    fontFamily: "Raleway-Bold",
    fontSize: 12,
    color: colors.Grey,
  },
});
