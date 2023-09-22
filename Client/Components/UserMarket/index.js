import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PlantCard from "../PlantCard";
import colors from "../../assets/colors/colors";
import { useSelector } from "react-redux";
import { selectProducts } from "../../Redux/Store/productSlice";
import PlantModal from "../PlantModal";

export default function UserMarket() {
  const products = useSelector(selectProducts);
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);

  const handlePress = (plant) => {
    setSelectedPlant(plant);
    setModalVisible(true);
  };

  useEffect(() => {
    console.log("useEffect is running ");
  }, []);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      {products.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.Green} />
        </View>
      ) : (
        <View style={styles.productsContainer}>
          {products.map((plant, index) => (
            <TouchableOpacity key={index} onPress={() => handlePress(plant)}>
              <PlantCard
                name={plant.name}
                price={plant.price}
                destination={plant.destination}
                imageUrl={plant.imageUrl}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}

      {selectedPlant && (
        <PlantModal
          name={selectedPlant.name}
          imageUrl={selectedPlant.imageUrl}
          destination={selectedPlant.destination}
          price={selectedPlant.price}
          closeModal={closeModal}
          visible={isModalVisible}
        />
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
