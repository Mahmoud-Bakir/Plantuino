import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import RegisterationForm from "../../Components/RegisterationForm";
import colors from "../../assets/colors/colors";
import Logo from "../../assets/pictures/logo.svg";
import Arrow from "../../assets/pictures/arrow.svg";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function RegisterationScreen() {
  const navigation = useNavigation();
  const navigate = () => {
    navigation.navigate("SigninScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.logo_container}>
        <Pressable onPress={navigate}>
          <Arrow style={styles.arrow} />
        </Pressable>
        <Logo style={styles.logo} />
      </View>
      <RegisterationForm />
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
    marginBottom: 30,
  },
  arrow: {
    marginTop: 20,
    width: 50,
    height: 50,
  },
});
