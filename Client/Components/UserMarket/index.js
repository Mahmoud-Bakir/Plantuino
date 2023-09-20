import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PlantCard from "../PlantCard";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import colors from "../../assets/colors/colors";

export default function UserMarket({ refresh = false }) {
  console.log(refresh);
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const [userType, setUserType] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    console.log("useEffect is running ")
    const getData = async () => {
      try {
        const userType = await SecureStore.getItemAsync("userType");
        setUserType(userType);
        const id = await SecureStore.getItemAsync("_id");
        setId(id);
        const verify = await SecureStore.getItemAsync("token");
        const token = verify.slice(1, -1);
        if (userType == 1) {
          const response = await axios.get(
            "http://192.168.1.5:8000/users/personalMarket",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = response.data.products;
          setProducts(data);
        } else {
          const response = await axios.get(
            "http://192.168.1.5:8000/users/publicMarket",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = response.data;
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };

    getData();
  }, [refresh]);

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
  loadingContainer:{
    alignItems:"center",
    justifyContent:"center"
  }
});
