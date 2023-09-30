import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../../assets/colors/colors";
import { useFonts } from "expo-font";
import Whatsapp from "../../../assets/pictures/Whatsapp.svg";

export const ContactButton = ({ title, handle }) => {
  useFonts({
    "Raleway-SemiBold": require("../../../assets/fonts/Raleway-SemiBold.ttf"),
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handle} style={styles.logo_container}>
        <Whatsapp style={styles.logo} />
        <Text style={styles.customButton}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: Colors.Black,
    width: 180,
    borderRadius: 5,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  customButton: {
    textAlign: "center",
    fontSize: 18,
    color: Colors.White,
    padding: 10,
    fontFamily: "Raleway-SemiBold",
  },
  logo_container: {
    justifyContent: "center",
    width: 150,
    alignItems: "center",
    flexDirection: "row",
  },
});
