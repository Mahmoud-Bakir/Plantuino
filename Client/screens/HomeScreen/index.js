import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../assets/colors/colors";
import ScreenHeader from "../../Components/ScreensHeader";
import { useFonts } from "expo-font";
import { LargeButton } from "../../Components/Buttons/LargeButton";
import Home from "../../assets/pictures/homeLabel.svg";

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    "Raleway-Bold": require("../../assets/fonts/Raleway-Bold.ttf"),
    "Raleway-Regular": require("../../assets/fonts/Raleway-Regular.ttf"),
  });
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader component={Home} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>No Plants</Text>
        <Text style={styles.subtitle}>
          Start by connecting your arduino kit
        </Text>
        <LargeButton title={"Connect"} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Raleway-Bold",
    fontSize: 24,
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: "Raleway-Regular",
    color: colors.Grey,
    fontSize: 14,
    marginBottom: 25,
  },
});
