import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import LabeledInput from "../../Components/LabeledInput";
import Colors from "../../assets/colors/colors";
import { useFonts } from "expo-font";
import { LargeButton } from "../Buttons/LargeButton";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthState } from "../../Redux/Store/authSlice";
import { setProducts, selectProducts } from "../../Redux/Store/productSlice";

export default function ProductForm() {
  const info = {
    name: "",
    price: "",
    image: "",
  };
  const [fontsLoaded] = useFonts({
    "Raleway-Regular": require("../../assets/fonts/Raleway-Regular.ttf"),
    "Raleway-SemiBold": require("../../assets/fonts/Raleway-SemiBold.ttf"),
  });
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const token = authState.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [data, setData] = useState(info);
  const [err, Seterr] = useState("");
  const navigation = useNavigation();

  const handleImageUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.2,
        base64:true,
      });

      if (!result.canceled) {
        setData({ ...data, image: result.base64 });
      }
    } catch (error) {
      console.error("Error picking image", error);
    }
  };

  const handleDataChange = (key, value) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
    console.log(data);
  };
  function is_empty(name) {
    const test = name.trim();
    return test === "";
  }
  const handleAdd = async () => {
    try {
      if (is_empty(data.name)) return Seterr("Please provide a name");
      if (is_empty(data.price)) return Seterr("Please set a price");

      const response = await axios.post(
        "http://192.168.1.5:3000/users/add",
        data,
        {
          headers,
        }
      );
      const newProduct = {
        name: response.data.newProduct.name,
        price: response.data.newProduct.price,
        city: response.data.newProduct.city,
        country:response.data.newProduct.country,
        street:response.data.newProduct.street
      };

      console.log("Added Successfully:", newProduct);
      const updatedProducts = [...products, newProduct];
      dispatch(setProducts(updatedProducts));
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Add Plant</Text>
      <LabeledInput
        holder="Name"
        title="Name"
        naming="name"
        capital="words"
        onChange={handleDataChange}
        value={data.name}
      />
      <LabeledInput
        holder="Price"
        title="price"
        input_type="number-pad"
        onChange={handleDataChange}
        value={data.email}
        naming="price"
      />
      <LabeledInput
        title="Image"
        value={data.imageUrl}
        naming={"imageUrl"}
        file={true}
        handleAdd={handleImageUpload}
      />
      <Text style={styles.error}>{err}</Text>
      <LargeButton title="Add Product" handle={handleAdd} />
    </View>
  );
}
const styles = StyleSheet.create({
  form: {
    width: 350,
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
    backgroundColor: Colors.LightBlue,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  title: {
    alignSelf: "center",
    fontSize: 32,
    fontFamily: "Raleway-Regular",
    marginTop: 30,
    marginBottom: 50,
  },
  login: {
    textDecorationLine: "underline",
    fontSize: 14,
    fontFamily: "Raleway-SemiBold",
  },
  error: {
    color: Colors.Red,
    fontFamily: "Raleway-Regular",
  },
  uploadButton: {
    backgroundColor: Colors.Green,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },

  uploadButtonText: {
    color: Colors.White,
    fontFamily: "Raleway-Bold",
    fontSize: 16,
  },
});