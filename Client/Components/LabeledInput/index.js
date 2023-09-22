import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../assets/colors/colors";
import CountryCodeDropdown from "../CountryCodeDropdown";

export default function LabeledInput({
  title,
  firstHolder,
  secondHolder,
  secure = false,
  input_type = "default",
  picker = false,
  file = false,
  onChange,
  naming,
  capital = "none",
  handleAdd,
  numberInput,
}) {
  const hold = {
    test: firstHolder,
  };
  const [fontsLoaded] = useFonts({
    "Raleway-Regular": require("../../assets/fonts/Raleway-Regular.ttf"),
    "Raleway-Regular": require("../../assets/fonts/Raleway-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <View style={styles.formGroup}>
        <Text style={styles.label}>{title}</Text>
        {picker ? (
          <RNPickerSelect
            style={styles.input}
            placeholder={hold.firstHolder}
            onValueChange={(value) => onChange(naming, value)}
            items={[
              {
                key: "plant owner",
                label: "Plant Owner",
                value: "plant owner",
              },
              { key: "seller", label: "Seller", value: "seller" },
            ]}
          />
        ) : file ? (
          <View style={styles.fileContainer}>
            <TouchableOpacity style={styles.fileInput} onPress={handleAdd}>
              <AntDesign name="plus" size={36} color="white" />
            </TouchableOpacity>
          </View>
        ) : numberInput ? (
          <View style={styles.phoneInputContainer}>
            <TextInput
              style={styles.country}
              placeholder={firstHolder}
              secureTextEntry={secure}
              keyboardType={input_type}
              autoCapitalize={capital}
              onChangeText={(text) => onChange(naming, text)}
            />
            <TextInput
              style={styles.numberInput}
              placeholder={secondHolder}
              secureTextEntry={secure}
              keyboardType={input_type}
              autoCapitalize={capital}
              onChangeText={(text) => onChange(naming, text)}
            />
          </View>
        ) : (
          <TextInput
            style={styles.input}
            placeholder={firstHolder}
            secureTextEntry={secure}
            keyboardType={input_type}
            autoCapitalize={capital}
            onChangeText={(text) => onChange(naming, text)}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    fontFamily: "Raleway-SemiBold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
    fontFamily: "Raleway-Regular",
    backgroundColor: colors.White,
  },
  fileInput: {
    padding: 40,
    flex: 1,
  },
  fileContainer: {
    width: 120,
    height: 110,
    backgroundColor: colors.LightGrey,
    alignItems: "center",
  },
  phoneInputContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 5,
  },
  country: {
    width: "20%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
    fontFamily: "Raleway-Regular",
    backgroundColor: colors.White,
    textAlign: "center",
  },
  numberInput: {
    width: "78%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
    fontFamily: "Raleway-Regular",
    backgroundColor: colors.White,
  },
});
