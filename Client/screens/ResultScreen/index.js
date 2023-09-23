import React from "react";
import ProductForm from "../../Components/ProductForm";
import ScreenHeader from "../../Components/ScreensHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import Result from "../../assets/pictures/Result.svg";
import PlantCard from "../../Components/PlantCard";

export default function ResultScreen({}) {
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader component={Result} />
        <PlantCard result={true} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
    container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
