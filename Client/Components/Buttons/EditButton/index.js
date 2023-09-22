import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../../assets/colors/colors";
import { useFonts } from "expo-font";

export const EditButton = ({ title,handle}) => {
  const [fontsLoaded] = useFonts({
    "Raleway-SemiBold": require("../../../assets/fonts/Raleway-SemiBold.ttf"),
  });
  return (
    <View style={styles.container} >
      <TouchableOpacity onPress={handle} style={styles.logo_container}>
        <Text style={styles.customButton}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

