import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import colors from "../../assets/colors/colors";
import { useFonts } from "expo-font";

export default function PlantCard({ name, price, destination }) {
  const [fontsLoaded] = useFonts({
    "Raleway-Bold": require("../../assets/fonts/Raleway-Bold.ttf"),
    "Raleway-Regular": require("../../assets/fonts/Raleway-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/pictures/example.jpg")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price} $</Text>
        <Text style={styles.description}>{destination}</Text>
      </View>
    </View>
  );
}


