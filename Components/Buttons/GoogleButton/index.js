import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../../assets/colors/colors";
import { useFonts } from "expo-font";
import Logo from "../../../assets/pictures/Google.svg"

export const GoogleButton = ({ title }) => {
  const [fontsLoaded] = useFonts({
    "Raleway-SemiBold": require("../../../assets/fonts/Raleway-SemiBold.ttf"),
  });
  return (
    <View style={styles.container} >
      <TouchableOpacity onPress={() => {}} style={styles.logo_container}>
        <Logo style={styles.logo} />
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
    backgroundColor: Colors.White,
    width:250,
    borderRadius: 5,
    alignSelf:"center",
    paddingHorizontal:20,
    paddingVertical:5
  },
  customButton: {
    textAlign: "center",
    fontSize: 18,
    color: Colors.Black,
    padding: 10,
    width: 200,
    height: 40,
    fontFamily: "Raleway-SemiBold",
  },
  logo:{
    width:200,
    height:50,
    alignSelf:"center"
  },
  logo_container:{
    justifyContent:"center",    
    width:50,
    alignItems:4,
    flexDirection: 'row',
  }
});
