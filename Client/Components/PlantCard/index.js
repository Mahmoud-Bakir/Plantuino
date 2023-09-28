import React from "react";
import { View, StyleSheet, Text, Image, Linking } from "react-native";
import colors from "../../assets/colors/colors";
import { useFonts } from "expo-font";
import { ContactButton } from "../Buttons/ContactButton";
import { EditButton } from "../Buttons/EditButton";

export default function PlantCard({
  name,
  price,
  country,
  city,
  street,
  imageUrl,
  contact = false,
  edit = false,
  result = false,
  phoneNumber,
}) {
  const [fontsLoaded] = useFonts({
    "Raleway-Bold": require("../../assets/fonts/Raleway-Bold.ttf"),
    "Raleway-Regular": require("../../assets/fonts/Raleway-Regular.ttf"),
  });

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

  const switchInputs = () => {};
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  if (contact == true) {
    return (
      <View style={styles.previewContainer}>
        <View style={styles.previewImageContainer}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.resultName}>{name}</Text>
          <Text style={styles.resultPrice}>{price} $</Text>
          <Text style={styles.resultDesciptions}>
            {country},{city},{street}
          </Text>
        </View>
        <ContactButton title="WhatsApp" handle={sendMessage} />
      </View>
    );
  }
  if (edit == true) {
    return (
      <View style={styles.previewContainer}>
        <View style={styles.previewImageContainer}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.resultName}>{name}</Text>
          <Text style={styles.resultPrice}>{price} $</Text>
          <Text style={styles.resultDesciptions}>
            {country},{city},{street}
          </Text>
        </View>
        <EditButton title="Edit" handle={switchInputs} />
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
            source={{ uri: `${imageUrl}` }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.saveButtonContainer}>
          <EditButton title="Save" handle={switchInputs} />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price} $</Text>
        <Text style={styles.description}>
          {country},{city},{street}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 180,
    height: 350,
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
    resizeMode: "contain",
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
    fontFamily: "Raleway-Bold",
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
    height: "70%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  resultImageContainer: {
    marginTop: 10,
    width: "80%",
    height: "70%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  resultName: {
    fontFamily: "Raleway-Bold",
    fontSize: 24,
  },
  resultPrice: {
    fontFamily: "Raleway-Bold",
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
