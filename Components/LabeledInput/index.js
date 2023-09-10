import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { useFonts } from "expo-font";

export default function LabeledInput({
  title,
  holder,
  secure = false,
  number = "default",
  picker = false,
}) {
  const hold = {
    test:holder
};
  const [fontsLoaded] = useFonts({
    "Raleway-Regular": require("../../assets/fonts/Raleway-Regular.ttf"),
  });
  const [type, SetType] = useState("Plant Owner");

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <View style={styles.formGroup}>
        <Text style={styles.label}>{title}</Text>
        {picker ? (
            <RNPickerSelect
            style={styles.inputIOS}
            placeholder={hold.holder}
            onValueChange={(value) => console.log(value)}
            items={[
                { key:"plant owner", label: 'Plant Owner', value: 'plant owner' },
                { key:"seller", label: 'Seller', value: 'seller' },
            ]}
        />
        ) : (
          <TextInput
            style={styles.input}
            placeholder={holder}
            secureTextEntry={secure}
            keyboardType={number}
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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    fontFamily: "Raleway-Regular",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },

});
