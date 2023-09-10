import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LabeledInput from "../../Components/LabeledInput";
import Colors from "../../assets/colors/colors";
import { useFonts } from "expo-font";
import { LargeButton } from "../Buttons/LargeButton";
import { GoogleButton } from "../Buttons/GoogleButton";

export default function RegisterationForm () {
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
      <Text style={styles.subtitle}>Let's Get Growing!</Text>
      <LabeledInput holder="Full Name" title="Full Name" />
      <LabeledInput holder="Email" title="Email" input_type="email-address" />
      <LabeledInput holder="Password" title="Password" secure={true} />
      <LabeledInput
        holder="Phone Number"
        title="Phone Number"
        input_type="numeric"
      />
      <LabeledInput title="Are you a?" holder="test" picker={true} />
      <LargeButton title="Register" />
      <Text style={styles.footer}>
        Already registerd?
        <TouchableOpacity onPress={console.log("Lets check")}>
          <Text style={styles.login} onPress={() => navigation.navigate('SigninScreen')}> Login</Text>
        </TouchableOpacity>
      </Text>
    </View>
    <Text style={styles.Or}>
      Or
    </Text>
    <GoogleButton title="Register with Google"/>
    </>
    
    
  );
}
const styles = StyleSheet.create({
  form: {
    backgroundColor: Colors.White,
    paddingHorizontal: 60,
    borderWidth: 5,
    borderColor: Colors.Black,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 100,
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
    color:"#6A6A6A",
    fontWeight: 600,
    alignSelf: "center",
    marginBottom: 20,
  },
  login:{
    textDecorationLine: 'underline',
    fontSize:14,
    fontFamily:"Raleway-SemiBold"
  },
  footer:{
    lineHeight: 20,
    fontSize:14,
    fontFamily: "Raleway-Regular",
    marginBottom:40,
  },
  Or:{
    marginTop:30,
    alignSelf: "center",
    fontSize: 32,
    fontFamily: "Raleway-SemiBold",
    color:Colors.White
  }
});
