import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import PlantCard from "../PlantCard";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
export default function UserMarket() {
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const [userType, setUserType] = useState();
  useEffect(() => {
    const getData = async () => {
      try {
        const userType = await SecureStore.getItemAsync("userType");
        setUserType(userType);
        const id = await SecureStore.getItemAsync("_id");
        setId(id);
        const verify = await SecureStore.getItemAsync("token");
        const token = verify.slice(1, -1);
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
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };

    getData();
  }, []);
  return (
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
});
