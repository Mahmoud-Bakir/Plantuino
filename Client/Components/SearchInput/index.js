import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet,Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";

export default function SearchInput() {
  const [fontsLoaded] = useFonts({
    "Raleway-Bold": require("../../assets/fonts/Raleway-Bold.ttf"),
    "Raleway-Regular": require("../../assets/fonts/Raleway-Regular.ttf"),
  });
  const [keyWord, setKeyWord] = useState("");
  const handleSearch = () => {
    console.log("Search button pressed");
  };
  const handleChange = (text) => {
    setKeyWord(text);
    console.log(keyWord);
  };
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a plant ..."
        onChangeText={handleChange}
        keyboardType="web-search"
      />
      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <AntDesign name="search1" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    marginTop:10,
    marginHorizontal:40,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  searchInput: {
    flex: 1,
    padding:10,
    fontFamily: "Raleway-Regular",

  },
  searchButton: {
    backgroundColor: "black",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});
