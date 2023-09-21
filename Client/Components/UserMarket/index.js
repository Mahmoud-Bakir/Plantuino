import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PlantCard from "../PlantCard";
import colors from "../../assets/colors/colors";
import { useSelector } from "react-redux";
import { selectProducts } from "../../Redux/Store/productSlice";

export default function UserMarket() {
  const products = useSelector(selectProducts);
  const navigation = useNavigation();

  useEffect(() => {
    console.log("useEffect is running ");
  }, []);
  return (
    <>
      {products.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.Green} />
        </View>
      ) : (
        <View style={styles.productsContainer}>
          {products.map((plant, index) => (
            <PlantCard
              name={plant.name}
              price={plant.price}
              destination={plant.destination}
              image_url={`data:image/jpeg;base64,${plant.image_url}`}
              key={index}
            />
          ))}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  productsContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
