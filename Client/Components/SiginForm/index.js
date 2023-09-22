import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LabeledInput from "../LabeledInput";
import Colors from "../../assets/colors/colors";
import { useFonts } from "expo-font";
import { LargeButton } from "../Buttons/LargeButton";
import { GoogleButton } from "../Buttons/GoogleButton";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { registerIndieID } from "native-notify";
import { useDispatch } from "react-redux";
import { setAuthData } from "../../Redux/Store/authSlice";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

function SigninForm() {
  const [fontsLoaded] = useFonts({
    "Raleway-Regular": require("../../assets/fonts/Raleway-Regular.ttf"),
    "Raleway-SemiBold": require("../../assets/fonts/Raleway-SemiBold.ttf"),
  });
  const navigation = useNavigation();
  const info = {
    email: "",
    password: "",
  };
  const [data, setData] = useState(info);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();

  const handleDataChange = (key, value) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
    console.log(data);
    setErr("");
  };

  const getUserLocation = async () => {
    try {
      const { status } = await requestForegroundPermissionsAsync();

      if (status !== "granted") {
        throw new Error("Location permission not granted");
      }
      const location = await getCurrentPositionAsync({});
      console.log(location.coords);
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      )
        .then((response) => response.json())
        .then((data) => {
          const address = data.address;
          const country = address.country;
          const city = address.city;
          const street = address.road;

          console.log(`Country: ${country}`);
          console.log(`City: ${city}`);
          console.log(`Street: ${street}`);
        })
        .catch((error) => console.error("Error:", error));
      return location.coords;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const is_empty = (name) => {
    const test = name.trim();
    return test === "";
  };

  const is_valid_email = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const signinHandler = async () => {
    if (is_empty(data.email) || is_empty(data.password))
      return setErr("All inputs are required");
    if (!is_valid_email(data.email)) return setErr("Incorrect credentials");

    try {
      const response = await axios.post(
        "http://192.168.1.5:8000/auth/login",
        data
      );

      const token = response.data.token;
      const { email, name, phoneNumber, _id, userType } = response.data.user;

      const userLocation = getUserLocation();

      dispatch(
        setAuthData({
          email,
          token,
          name,
          phoneNumber,
          _id,
          userType,
          userLocation,
        })
      );

      axios.post(`https://app.nativenotify.com/api/indie/notification`, {
        subID: { _id },
        appId: 12377,
        appToken: "YCjAsF4USBdjSLbUwETH8H",
        title: "Damn Son",
        message: "IT IS WORKING",
      });

      registerIndieID({ _id }, 12377, "YCjAsF4USBdjSLbUwETH8H");
      navigation.navigate("Home");
    } catch (error) {
      console.log("Error" + error.message);
      if (error.message === "Request failed with status code 404")
        setErr("Incorrect credentials");
    }
  };

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <View style={styles.form}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Reconnect with Your Plants</Text>
        <LabeledInput
          holder="Email Address"
          title="Email"
          input_type="email-address"
          naming="email"
          onChange={handleDataChange}
        />
        <LabeledInput
          holder="Password"
          title="Password"
          secure={true}
          naming="password"
          onChange={handleDataChange}
        />
        <Text style={styles.error}>{err}</Text>
        <LargeButton title="Login" handle={signinHandler} />
        <Text style={styles.footer}>
          Don't have an account?
          <TouchableOpacity>
            <Text
              style={styles.login}
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              {" "}
              Signup
            </Text>
          </TouchableOpacity>
        </Text>
        <Text style={styles.Or}>Or</Text>
        <GoogleButton title="Continue with Google" />
      </View>
    </>
  );
}

export default SigninForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
    backgroundColor: Colors.White,
    paddingHorizontal: 30,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 100,
    marginHorizontal: 35,
    paddingBottom: 35,
  },
  title: {
    alignSelf: "center",
    fontSize: 32,
    fontFamily: "Raleway-SemiBold",
    marginTop: 30,
  },
  subtitle: {
    fontFamily: "Raleway-Regular",
    fontSize: 14,
    color: "#6A6A6A",
    fontWeight: 600,
    alignSelf: "center",
    marginBottom: 20,
  },
  login: {
    textDecorationLine: "underline",
    fontSize: 14,
    fontFamily: "Raleway-SemiBold",
  },
  footer: {
    lineHeight: 20,
    fontSize: 14,
    fontFamily: "Raleway-Regular",
  },
  Or: {
    marginTop: 25,
    alignSelf: "center",
    fontSize: 16,
    fontFamily: "Raleway-SemiBold",
    color: Colors.Grey,
  },
  error: {
    color: Colors.Red,
    fontFamily: "Raleway-Regular",
  },
});
