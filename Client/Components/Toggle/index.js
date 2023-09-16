import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { useFonts } from "expo-font";
import colors from "../../assets/colors/colors";

export default function Toggle({
  choice1,
  choice2,
  choice3,
}) {
  const [fontsLoaded] = useFonts({
    "Raleway-Bold": require("../../assets/fonts/Raleway-Bold.ttf"),
    "Raleway-Regular": require("../../assets/fonts/Raleway-Regular.ttf"),
  });

  const [selectedChoice, setSelectedChoice] = useState(choice1);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }


  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.contentContainer,
          selectedChoice === choice1 && styles.selectedContentContainer,
        ]}
      >
        <Text style={styles.content}>{choice1}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.contentContainer,
          selectedChoice === choice2 && styles.selectedContentContainer,
        ]}
      >
        <Text style={styles.content}>{choice2}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: colors.Grey,
    borderRadius: 5,
  },
  content: {
    fontFamily: "Raleway-SemiBold",
    fontSize: 18,
    color: colors.White,
    paddingVertical: 15,
    borderRadius: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.Grey,
    borderRadius: 5,
  },
  selectedContentContainer: {
    backgroundColor: colors.Green,
  },
});
