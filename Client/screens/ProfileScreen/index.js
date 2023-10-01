import React, { useEffect, useState } from "react";
import ScreenHeader from "../../Components/ScreensHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
import MyProfile from "../../assets/pictures/myProfile.svg";
import LabeledInput from "../../Components/LabeledInput";
import { DeleteButton } from "../../Components/Buttons/DeleteButton";
import { useNavigation } from "@react-navigation/native";
import { setImage } from "../../Redux/Store/authSlice";
import { selectAuthState } from "../../Redux/Store/authSlice";
import ProfilePicture from "../../assets/pictures/ProfilePicture.svg";
import { useSelector } from "react-redux";
import { useFonts } from "expo-font";
import Colors from "../../assets/colors/colors";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const auth = useSelector(selectAuthState);
  const name = auth.name;
  const email = auth.email;
  
  const [image, setImage] = useState(null);

  useFonts({
    "Raleway-Regular": require("../../assets/fonts/Raleway-Regular.ttf"),
    "Raleway-SemiBold": require("../../assets/fonts/Raleway-SemiBold.ttf"),
  });

  const handleImageUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 0.2,
        base64: true,
      });

      if (!result.cancelled) {
        setImage(result.base64);
      }
    } catch (error) {
      console.error("Error picking image", error);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ScreenHeader component={MyProfile} />

        <View style={styles.contentContainer}>
          <TouchableOpacity onPress={handleImageUpload}>
            {image ? (
              <View style={styles.profileImageContainer}>
                <Image
                  source={{ uri: `data:image/png;base64,${image}` }}
                  style={styles.profileImage}
                />
              </View>
            ) : (
              <ProfilePicture />
            )}
          </TouchableOpacity>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
        <View style={styles.footer}>
          <DeleteButton
            title="Signout"
            handle={() => navigation.navigate("SigninScreen")}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginTop: 20,
    alignSelf: "center",
  },
  profileImageContainer: {
    width: 180,
    height: 180,
    borderRadius: 120,
    overflow: "hidden",
    alignSelf: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontFamily: "Raleway-Bold",
    fontSize: 24,
    textAlign: "center",
  },
  email: {
    fontFamily: "Raleway-Regular",
    color: Colors.Grey,
    textAlign: "center",
    fontSize: 18,
    marginTop: 5,
  },
  footer: {
    width: 300,
    alignSelf: "center",
  },
});
