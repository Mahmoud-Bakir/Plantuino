import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import PlantCard from "../PlantCard";
import colors from "../../assets/colors/colors";
import { useSelector } from "react-redux";
import { selectProducts } from "../../Redux/Store/productSlice";
import { selectAuthState } from "../../Redux/Store/authSlice";
import PlantModal from "../PlantModal";

export default function UserMarket() {
  const authState = useSelector(selectAuthState);
  const userType = authState.userType;
  const products = useSelector(selectProducts);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);

  const openModal = (plant) => {
    setSelectedPlant(plant);
    setModalVisible(true);
  };

  useEffect(() => {
    console.log("useEffect is running ");
  }, []);

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPlant(null);
  };

  return (
    <>
      {products.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.Green} />
        </View>
      ) : (
        <View style={styles.productsContainer}>
          {products.map((plant, index) => {
            console.log("Phone Number:", plant.userPhoneNumber);
            return (
              <TouchableOpacity key={index} onPress={() => openModal(plant)}>
                <PlantCard
                  name={plant.name}
                  price={plant.price}
                  country={plant.country}
                  city={plant.city}
                  street={plant.street}
                  image={plant.image}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {userType === 1 && selectedPlant && (
        <PlantModal
          name={selectedPlant.name}
          image={selectedPlant.image}
          country={selectedPlant.country}
          city={selectedPlant.city}
          street={selectedPlant.street}
          price={selectedPlant.price}
          closeModal={closeModal}
          visible={isModalVisible}
          phoneNumber={selectedPlant.userPhoneNumber}
          userType="seller"
        />
      )}
      {userType === 0 && selectedPlant && (
        <PlantModal
          name={selectedPlant.name}
          image={selectedPlant.image}
          city={selectedPlant.city}
          street={selectedPlant.street}
          price={selectedPlant.price}
          closeModal={closeModal}
          visible={isModalVisible}
          phoneNumber={selectedPlant.userPhoneNumber}
          userType="plantOwner"
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
