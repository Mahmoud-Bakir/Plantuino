import React from "react";
import { View, StyleSheet, Text, Image, Linking } from "react-native";
import colors from "../../assets/colors/colors";
import { useFonts } from "expo-font";
import { ContactButton } from "../Buttons/ContactButton";
import { EditButton } from "../Buttons/EditButton";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthState } from "../../Redux/Store/authSlice";
import { useNavigation } from "@react-navigation/native";
import { setPlantDetails } from "../../Redux/Store/plantSlice";
import baseURL from '../../config';

import axios from "axios";

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
}) {
  const [fontsLoaded] = useFonts({
    "Raleway-Bold": require("../../assets/fonts/Raleway-Bold.ttf"),
    "Raleway-Regular": require("../../assets/fonts/Raleway-Regular.ttf"),
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../../assets/fonts/Roboto-Bold.ttf"),
  });

  const authState = useSelector(selectAuthState);
  const token = authState.token;
  const headers = { Authorization: `Bearer ${token}` };
  const navigation = useNavigation();
  const dispatch = useDispatch();

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

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `http://${baseURL}:3000/users/getPreferences`,
        { prompt: name },
        { headers }
      );

      const combinedResult = {
        plantName: response.data.result.plantName,
        ...response.data.result,
      };

      console.log("Combined Result:", combinedResult);
      dispatch(setPlantDetails(combinedResult));

      const updateResponse = await axios.post(
       `http://${baseURL}:3000/users/updatePlants`,
        {
          maxLight: combinedResult.maxLight,
          maxMoisture: combinedResult.maxMoisture,
          minLight: combinedResult.minLight,
          minMoisture: combinedResult.minMoisture,
          plantName: combinedResult.plantName,
        },
        { headers }
      );

      console.log("Update Response:", updateResponse.data.message);

      navigation.navigate("HomeScreen");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  if (contact == true) {
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
  if (edit == true) {
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
          <Text style={styles.resultPrice}> $ {price}</Text>
          <Text style={styles.resultDesciptions}>
          {street},{city},{country}
          </Text>
        </View>
        <EditButton title="Edit"  />
      </View>
    );
  }
  if (result == true) {
    return (
      <View style={styles.resultContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.resultName}>{name}</Text>
        </View>
        <View style={styles.resultImageContainer}>
          <Image
            source={{ uri:image }}
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    width:"100%",
    overflow: "hidden",
  },
  resultImageContainer: {
    marginTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
});
