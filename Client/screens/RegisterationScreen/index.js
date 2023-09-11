import React from "react";
import { View, StyleSheet,ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RegisterationForm from "../../Components/RegisterationForm";
import colors from "../../assets/colors/colors";
import Logo from "../../assets/pictures/logo.svg";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function RegisterationScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={{backgroundColor:Colors.Green}} bounces={false} showsVerticalScrollIndicator={false} >
      <View style={styles.container}>
        <Logo style={styles.logo} />
        <RegisterationForm  />
      </View>
     </ScrollView> 
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Green,
    borderColor: "black",
  },
  logo: {
    marginTop: 40,
    marginBottom:20,
    width: 350,
    height: 50,
    alignSelf: "center",
  },
});
