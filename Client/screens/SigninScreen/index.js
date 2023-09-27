import React from "react";
import {StyleSheet, SafeAreaView } from "react-native";
import colors from "../../assets/colors/colors";
import Logo from "../../assets/pictures/logo.svg";
import SigninForm from "../../Components/SiginForm";
import { StatusBar } from "expo-status-bar";

export default function SigninScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Logo style={styles.logo} />
      <SigninForm />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Green,
    borderColor: "black",
  },
  logo_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    alignContent: "center",
  },
  arrow: {
    marginTop: 20,
    width: 50,
    height: 50,
  },
  logo: {
    marginTop: 80,
    marginBottom: 50,
    alignSelf: "center",
  },
});
