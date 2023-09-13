import React, { useState } from "react";
import axios from "axios";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LabeledInput from "../../Components/LabeledInput";
import Colors from "../../assets/colors/colors";
import { useFonts } from "expo-font";
import { LargeButton } from "../Buttons/LargeButton";
import { GoogleButton } from "../Buttons/GoogleButton";

export default function RegisterationForm() {
  const info = {
    name: "",
    email: "",
    password: "",
    phone_number: "",
    user_type: "",
  };

  const [fontsLoaded] = useFonts({
    "Raleway-Regular": require("../../assets/fonts/Raleway-Regular.ttf"),
    "Raleway-SemiBold": require("../../assets/fonts/Raleway-SemiBold.ttf"),
  });
  const [data, setData] = useState(info);
  const [err, Seterr] = useState("");
  const handleDataChange = (key, value) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
   
    console.log(data);
    Seterr("");
  };


  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  const navigation = useNavigation();

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Let's Get Growing!</Text>
      <LabeledInput
        holder="Full Name"
        title="Full Name"
        naming="name"
        capital="words"
        onChange={handleDataChange}
        value={data.name}
      />
      <LabeledInput
        holder="Email"
        title="Email"
        input_type="email-address"
        onChange={handleDataChange}
        value={data.email}
        naming="email"
      />
      <LabeledInput
        holder="Password"
        title="Password"
        secure={true}
        naming="password"
        onChange={handleDataChange}
        value={data.password}
      />
      <LabeledInput
        holder="Phone Number"
        title="Phone Number"
        input_type="numeric"
        naming="phone_number"
        onChange={handleDataChange}
        value={data.phone_number}
      />
      <LabeledInput
        title="Are you a?"
        holder="test"
        picker={true}
        onChange={handleDataChange}
        naming="user_type"
      />
      <LargeButton title="Register" />
      <Text style={styles.footer}>
        Already registerd?
        <TouchableOpacity>
          <Text
            style={styles.login}
            onPress={() => navigation.navigate("SigninScreen")}
          >
            {" "}
            Login
          </Text>
        </TouchableOpacity>
      </Text>
      <Text style={styles.Or}>Or</Text>
      <GoogleButton title="Register with Google" />
    </View>
  );
}
const styles = StyleSheet.create({
  form: {
    flex: 1,
    marginTop: 20,
    backgroundColor: Colors.White,
    paddingHorizontal: 30,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 5,
    marginHorizontal: 35,
  },
  title: {
    alignSelf: "center",
    fontSize: 32,
    fontFamily: "Raleway-Regular",
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
    marginBottom: 25,
  },
  Or: {
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