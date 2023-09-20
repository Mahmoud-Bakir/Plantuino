import React from "react";
import ProductForm from "../../Components/ProductForm";
import ScreenHeader from "../../Components/ScreensHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { useRoute } from '@react-navigation/native';
import Market from "../../assets/pictures/market.svg";


export default function AddProductScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader component={Market}/>
      <ProductForm />
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
