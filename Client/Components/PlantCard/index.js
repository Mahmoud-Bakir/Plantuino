import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Linking,
  TextInput,
  Button,
} from "react-native";
import colors from "../../assets/colors/colors";
import { useFonts } from "expo-font";
import { ContactButton } from "../Buttons/ContactButton";
import { EditButton } from "../Buttons/EditButton";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthState } from "../../Redux/Store/authSlice";
import { useNavigation } from "@react-navigation/native";
import { setPlantDetails } from "../../Redux/Store/plantSlice";
import baseURL from "../../config";
import axios from "axios";
import { LargeButton } from "../Buttons/LargeButton";
import { DeleteButton } from "../Buttons/DeleteButton";
import Colors from "../../assets/colors/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { setProducts } from "../../Redux/Store/productSlice";
import { SaveButton } from "../Buttons/SaveButton";
import * as ImagePicker from "expo-image-picker";

export default function PlantCard({
  name,
  price,
  country,
  city,
  street,
  image,
  contact = false,
  edit = false,
  result = false,
  phoneNumber,
  productId,
  closeModal,
}) {
  const authState = useSelector(selectAuthState);
  const token = authState.token;
  const headers = { Authorization: `Bearer ${token}` };
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const combinedAddress = ` ${street},${city},${country}`;
  const [fontsLoaded] = useFonts({
    "Raleway-Bold": require("../../assets/fonts/Raleway-Bold.ttf"),
    "Raleway-Regular": require("../../assets/fonts/Raleway-Regular.ttf"),
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../../assets/fonts/Roboto-Bold.ttf"),
  });
  const info = {
    name,
    price,
    street,
    city,
    country,
    image
  };
  const [newEdition, setNewEdition] = useState(info);
  const sendMessage = () => {
    const message = "Hello! ";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    Linking.canOpenURL(whatsappUrl).then((supported) => {
      if (supported) {
        return Linking.openURL(whatsappUrl);
      } else {
        console.log("WhatsApp is not installed on the device");
      }
    });
  };
  const handleDataChange = (key, value) => {
    setNewEdition((prev) => ({
      ...prev,
      [key]: value,
    }));
    console.log(newEdition);
  };
  const handleSave = async () => {
    try {
      const response = await axios.post(
        `http://${baseURL}:3000/users/getPreferences`,
        { prompt: name },
        { headers }
      );
      const { maxLight, maxMoisture, minLight, minMoisture, plantName } =
        response.data.result;
      const updatedResult = {
        maxLight,
        maxMoisture,
        minLight,
        minMoisture,
        plantName,
        image: image,
      };

      dispatch(setPlantDetails(updatedResult));
      try {
        const updatedResponse = await axios.post(
          `http://${baseURL}:3000/users/updatePlants`,
          updatedResult,
          { headers }
        );

        console.log("Update Response:", updatedResponse.data.message);
        navigation.navigate("HomeScreen");
      } catch (updateError) {
        console.error("Update Error:", updateError);
      }
    } catch (error) {
      console.error("ANALYZING Error:", error);
    }
  };

  const handleDelete = async () => {
    console.log("wer are in delete", productId);

    try {
      response = await axios.post(
        `http://${baseURL}:3000/users/deleteProduct`,
        { productId },
        { headers }
      );
      console.log(response.data);
      dispatch(setProducts(response.data.updatedUser.products));
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  const handleImageUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 0.2,
        base64: true,
      });

      if (!result.canceled) {
        setNewEdition({ ...newEdition, image: result.base64 });
      }
    } catch (error) {
      console.error("Error picking image", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.post(
        `http://${baseURL}:3000/users/editProduct`,
        { newEdition, productId },
        { headers }
      );
      dispatch(setProducts(response.data.updatedUser.products));
      closeModal();
      console.log(response.data);
    } catch (error) {}
  };

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  if (contact) {
    return (
      <View style={styles.previewContainer}>
        <View style={styles.previewImageContainer}>
          <Image
            source={{ uri: `data:image/jpeg;base64,${image}` }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.resultName}>{name}</Text>
          <Text style={styles.resultPrice}>$ {price} </Text>
          <Text style={styles.resultDesciptions}>
            {street},{city},{country}
          </Text>
          <ContactButton title="WhatsApp" handle={sendMessage} />
        </View>
      </View>
    );
  }
  if (edit) {
    return (
      <View style={isEditing ? styles.editContainer : styles.previewContainer}>
        {isEditing ? (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.editInput}
              value={newEdition.name}
              onChangeText={(text) => handleDataChange("name", text)}
            />
            <TextInput
              style={styles.editInput}
              value={newEdition.price.toString()}
              onChangeText={(text) => handleDataChange("price", text)}
            />
            <TextInput
              style={styles.editInput}
              value={newEdition.street}
              onChangeText={(text) => handleDataChange("street", text)}
            />
            <TextInput
              style={styles.editInput}
              value={newEdition.city}
              onChangeText={(text) => handleDataChange("city", text)}
            />
            <TextInput
              style={styles.editInput}
              value={newEdition.country}
              onChangeText={(text) => handleDataChange("country", text)}
            />
            <LargeButton title="Change Image" handle={handleImageUpload} />
          </View>
        ) : (
          <>
            <View style={styles.previewImageContainer}>
              <Image
                source={{ uri: `data:image/jpeg;base64,${image}` }}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.resultName}>{name}</Text>
              <Text style={styles.resultPrice}> $ {price}</Text>
              <Text style={styles.resultDesciptions}>
                {street},{city},{country}
              </Text>
            </View>
          </>
        )}

        {isEditing ? (
          <View style={styles.editButtonsContainer}>
            <DeleteButton title="Delete" handle={handleDelete} />
            <SaveButton title="Save" handle={handleSaveChanges} />
          </View>
        ) : (
          <EditButton title="Edit" handle={() => setIsEditing(true)} />
        )}
      </View>
    );
  }

  if (result) {
    return (
      <View style={styles.resultContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.resultName}>{name}</Text>
        </View>
        <View style={styles.resultImageContainer}>
          <Image
            source={{ uri: `${image}` }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.saveButtonContainer}>
          <EditButton title="Save" handle={handleSave} />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `data:image/jpeg;base64,${image}` }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>$ {price}</Text>
        <Text style={styles.description}>
          {street},{city},{country}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 180,
    backgroundColor: colors.LightBlue,
    borderRadius: 20,
  },
  imageContainer: {
    height: 270,
    borderRadius: 25,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 10,
    gap: 2,
  },
  name: {
    fontFamily: "Raleway-Bold",
    fontSize: 18,
  },
  price: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    color: colors.Black,
  },
  description: {
    fontFamily: "Raleway-Bold",
    fontSize: 12,
    color: colors.Grey,
  },
  previewContainer: {
    width: "100%",
    height: "90%",
    backgroundColor: colors.White,
    borderRadius: 20,
  },
  editContainer: {
    width: "100%",
    height: 550,
    backgroundColor: colors.White,
    borderRadius: 20,
  },
  resultContainer: {
    padding: 20,
    marginVertical: 20,
    width: "100%",
    height: "90%",
    backgroundColor: colors.White,
    borderRadius: 20,
  },
  previewImageContainer: {
    height: "65%",
    width: "100%",
    overflow: "hidden",
  },
  resultImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
    width: 250,
    height: 500,
    borderRadius: 20,
    overflow: "hidden",
  },
  resultName: {
    fontFamily: "Raleway-Bold",
    fontSize: 24,
  },
  resultPrice: {
    fontFamily: "Roboto-Bold",
    fontSize: 20,
    color: colors.Black,
  },
  resultDesciptions: {
    fontFamily: "Raleway-Bold",
    fontSize: 18,
    color: colors.Grey,
  },
  contactButtonContainer: {
    borderWidth: 1,
    borderColor: "black",
    width: "100%",
    height: "10%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  saveButtonContainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
  },
  editButtonsContainer: {
    flexDirection: "row",
    gap: 10,
    alignContent: "center",
    justifyContent: "center",
  },
  editInput: {
    width: "90%",
    height: 40,
    fontFamily: "Raleway-Regular",
    fontSize: 18,
    borderWidth: 1,
    borderColor: Colors.LightGrey,
    backgroundColor: colors.LigherGrey,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  inputContainer: {
    marginTop: 30,
    paddingVertical: 30,
    alignItems: "center",
    gap: 15,
  },
});
