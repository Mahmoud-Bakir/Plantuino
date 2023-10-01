import React from "react";
import { useSelector } from "react-redux";
import ScreenHeader from "../../Components/ScreensHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import Result from "../../assets/pictures/Result.svg";
import PlantCard from "../../Components/PlantCard";
import {
  selectPlantName,
  selectPlantImage,
} from "../../Redux/Store/plantSlice";

export default function ResultScreen({}) {
  const plantName = useSelector(selectPlantName);
  const plantImage = useSelector(selectPlantImage);
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader component={Result}/>
      <PlantCard result={true} image={plantImage} name={plantName} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
