import React from "react";
import { View, Text, StyleSheet, TouchableOpacity,Linking  } from "react-native";
import Colors from "../../../assets/colors/colors";
import { useFonts } from "expo-font";
import Whatsapp from "../../../assets/pictures/Whatsapp.svg"
export const ContactButton = ({ title, handle }) => {
  const [fontsLoaded] = useFonts({
    "Raleway-SemiBold": require("../../../assets/fonts/Raleway-SemiBold.ttf"),
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={}>
        <View style={styles.details}>
        <Text style={styles.customButton} onPress={handle}>
          {title}
        </Text>
        <Whatsapp/>
        </View>
  
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
    borderRadius: 5,
    paddingHorizontal:5,
  },
  customButton: {
    textAlign: "center",
    fontSize: 18,
    color: Colors.White,
    padding: 10,
    width: 110,
    height: 40,
    fontFamily: "Raleway-SemiBold",
  },
  details:{
    paddingHorizontal:5,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center"
  }
});
