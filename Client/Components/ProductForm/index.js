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

export default function ProductForm() {
  const info = {
    name: "",
    price: "",
    location: "default",
    imageUrl: "",
  };

  const [fontsLoaded] = useFonts({
    "Raleway-Regular": require("../../assets/fonts/Raleway-Regular.ttf"),
    "Raleway-SemiBold": require("../../assets/fonts/Raleway-SemiBold.ttf"),
  });
  const [token, setToken] = useState("");
  const [data, setData] = useState(info);
  const [err, Seterr] = useState("");
  const navigation = useNavigation();
  const handleImageUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const selectedImageUri = result.uri;
        setData({ ...data, imageUrl: selectedImageUri });
      }
    } catch (error) {
      console.error("Error picking image", error);
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const verify = await SecureStore.getItemAsync("token");
        const token = verify.slice(1, -1);
        setToken(token);
      } catch (error) {
        console.error("Error fetching :", error);
      }
    };

    getData();
  }, []);
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
        "http://192.168.1.5:8000/users/add",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Registration successful:", response.data);
      console.log("Hi");
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
      <LabeledInput title="Image" value={data.imageUrl} naming={"imageUrl"} file={true}/>
      <Text style={styles.error}>{err}</Text>
      <LargeButton title="Add Product" handle={handleAdd} />
    </View>
  );
}
const styles = StyleSheet.create({
  form: {
    width:350,
    flex: 1,
    paddingHorizontal:20,
    marginTop: 20,
    backgroundColor: Colors.LightBlue,
    marginHorizontal: 10,
    borderRadius:10
  },
  title: {
    alignSelf: "center",
    fontSize: 32,
    fontFamily: "Raleway-Regular",
    marginTop: 30,
    marginBottom:50
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
