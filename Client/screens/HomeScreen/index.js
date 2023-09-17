import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../assets/colors/colors";
import ScreenHeader from "../../Components/ScreensHeader";
import { useFonts } from "expo-font";
import { useState } from "react";
import { LargeButton } from "../../Components/Buttons/LargeButton";
import Home from "../../assets/pictures/homeLabel.svg";
import Toggle from "../../Components/Toggle";
import SearchInput from "../../Components/SearchInput";
import PlantCard from "../../Components/PlantCard";

export default function HomeScreen() {
  const [selectedChoice, setSelectedChoice] = useState("My Garden");
  const [fontsLoaded] = useFonts({
    "Raleway-Bold": require("../../assets/fonts/Raleway-Bold.ttf"),
    "Raleway-Regular": require("../../assets/fonts/Raleway-Regular.ttf"),
  });
  const handleChoiceSelection = (choice) => {
    setSelectedChoice(choice);
    console.log(choice);
  };

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader component={Home} />
      <View style={styles.toggleContainer}>
        <Toggle
          choice1="My Garden"
          choice2="Market"
          style={styles.toggle}
          onChoiceSelected={handleChoiceSelection}
        />
      </View>
      {selectedChoice === "My Garden" ? (
        <ScrollView>
          <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>No Plants</Text>
              <Text style={styles.subtitle}>
                Start by connecting your arduino kit
              </Text>
              <LargeButton title={"Connect"} />
            </View>
          </SafeAreaView>
        </ScrollView>
      ) : (
        <>
          <View style={styles.search}>
            <SearchInput />
          </View>
          <ScrollView style={styles.scroll}>
            <View style={styles.productsContainer}>
              <PlantCard />
              <PlantCard />
              <PlantCard />
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 1000,
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
  toggle: {
    alignSelf: "center",
  },
  toggleContainer: {
    marginTop: 30,
    marginHorizontal: 20,
    alignSelf: "center",
  },
  search: {
    alignItems: "center",
    marginHorizontal: 50,
    marginTop: 20,
  },
  productsContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    gap:12
  },
  scroll:{
    marginTop:20
  }
});
