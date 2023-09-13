import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LabeledInput from "../LabeledInput";
import Colors from "../../assets/colors/colors";
import { useFonts } from "expo-font";
import { LargeButton } from "../Buttons/LargeButton";
import { GoogleButton } from "../Buttons/GoogleButton";

export default function SigninForm() {
  const [fontsLoaded] = useFonts({
    "Raleway-Regular": require("../../assets/fonts/Raleway-Regular.ttf"),
    "Raleway-SemiBold": require("../../assets/fonts/Raleway-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  const navigation = useNavigation();
  

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
        />
        <LabeledInput
          holder="Password"
          title="Password"
          secure={true}
          naming="password"
        />
        <Text style={styles.error}>{err}</Text>
        <LargeButton title="Login"  />
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
