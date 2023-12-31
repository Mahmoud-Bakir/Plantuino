import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LabeledInput from "../LabeledInput";
import Colors from "../../assets/colors/colors";
import { useFonts } from "expo-font";
import { LargeButton } from "../Buttons/LargeButton";
import { GoogleButton } from "../Buttons/GoogleButton";
import axios from "axios";
import { registerIndieID } from "native-notify";
import { useDispatch } from "react-redux";
import { setAddressData, setAuthData } from "../../Redux/Store/authSlice";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { setPlantDetails } from "../../Redux/Store/plantSlice";
import baseURL from '../../config';

export default SigninForm = () => {
  const [fontsLoaded] = useFonts({
    "Raleway-Regular": require("../../assets/fonts/Raleway-Regular.ttf"),
    "Raleway-SemiBold": require("../../assets/fonts/Raleway-SemiBold.ttf"),
  });
  const info = {
    email: "",
    password: "",
  };
  const handleDataChange = (key, value) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
    console.log(data);
    setErr("");
  };
  const [data, setData] = useState(info);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const getUserLocation = async () => {
    setLoading(true);
    try {
      const { status } = await requestForegroundPermissionsAsync();

      if (status !== "granted") {
        throw new Error("Location permission not granted");
      }
      const location = await getCurrentPositionAsync({});
      console.log(location.coords);
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;
      await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      )
        .then((result) => result.json())
        .then((final) => {
          const address = final.address;
          const country = address.country;
          const city = address.city;
          const street = address.road;
          dispatch(
            setAddressData({
              country,
              city,
              street,
            })
          );
          console.log(`Country: ${country}`);
          console.log(`City: ${city}`);
          console.log(`Street: ${street}`);
        })
        .catch((error) => console.error("Error:", error));
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const is_empty = (name) => {
    const full = name.trim();
    return full === "";
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
      setLoading(true)
      const response = await axios.post(
        `http://${baseURL}:3000/auth/login`,
        data
      );

      const token = response.data.token;
      const {
        email,
        name,
        phoneNumber,
        _id,
        userType,
        city,
        country,
        street,
        located,
        plants,
      } = response.data.user;
      registerIndieID(_id, 12747, "BDt99Jcmi6Wq2atbqo1sGR");

      if (located) {
        dispatch(
          setAuthData({
            email,
            token,
            name,
            phoneNumber,
            _id,
            userType,
            located,
            city,
            country,
            street,
          })
        );
      } else {
        dispatch(
          setAuthData({
            email,
            token,
            name,
            phoneNumber,
            _id,
            userType,
            located,
          })
        );
        await getUserLocation();
        setLoading(false)
      }
      if (plants.length > 0) {
        const firstPlant = plants[0];
        console.log(plants);
        dispatch(
          setPlantDetails({
            plantName: firstPlant.plantName,
            maxLight: firstPlant.maxLight,
            maxMoisture: firstPlant.maxMoisture,
            minLight: firstPlant.minLight,
            minMoisture: firstPlant.minMoisture,
            image:firstPlant.image
          })
        );
        console.log(firstPlant.plantName);
        navigation.navigate("Home");
      }
       axios.post(`https://app.nativenotify.com/api/indie/notification`, {
        subID: _id,
        appId: 12747,
        appToken: "BDt99Jcmi6Wq2atbqo1sGR",
        title: `Welcome ${name}`,
        message: "Are you ready for today?",
      });
      navigation.navigate("Home");
    } catch (error) {
      console.log("Error" + error.message);
      if (error.message === "Request failed with status code 404")
        setErr("Incorrect credentials");
      setLoading(false)
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
        {loading && (
          <View style={styles.activityIndicator}>
            <ActivityIndicator size="large" color={Colors.Green} />
            <Text></Text>
          </View>
        )}
      </View>
    </>
  );
};

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
