import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LabeledInput from "../LabeledInput";
import Colors from "../../assets/colors/colors";
import { useFonts } from "expo-font";
import { LargeButton } from "../Buttons/LargeButton";
import { GoogleButton } from "../Buttons/GoogleButton";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export default function SigninForm() {
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
  const handleDataChange = (key, value) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
    if (key === "user_type") {
      const user_type_value = value === "plant owner" ? 0 : 1;
      setData((prevData) => ({
        ...prevData,
        user_type: user_type_value,
      }));
    }
    console.log(data);
    setErr("");
  };
  function is_empty(name) {
    const test = name.trim();
    return test === "";
  }
  function is_valid_email(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  const signinHandler = async () => {
    if (is_empty(data.email) || is_empty(data.password))
      return setErr("All inputs are required");
    if (!is_valid_email(data.email)) return setErr("Incorrect credentials");
    try {
      const response = await axios.post(
        "http://192.168.1.14:8000/auth/login",
        data
      );
      const token = response.data.token;
      try {
        await SecureStore.setItemAsync("token", token);
        console.log("saved succesfully");
      } catch (error) {
        console.log(error);
      }
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
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
