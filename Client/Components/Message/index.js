import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../../assets/colors/colors";
import { useFonts } from "expo-font";
export default function Message({ type, message,time }) {
  const [fontsLoaded] = useFonts({
    "Raleway-Bold": require("../../assets/fonts/Raleway-Bold.ttf"),
    "Raleway-Regular": require("../../assets/fonts/Raleway-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <View
      style={[
        styles.userMessageContainer,
        type == "bot" && styles.botMessageContainer,
      ]}
    >
      <View style={styles.contentContainer}>
        <Text style={[styles.message, type == "bot" && styles.botMessage]}>
          {message}
        </Text>
        <Text style={[styles.userTimeStamp, type == "bot" && styles.botTimeStamp]}>
          {time}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  userMessageContainer: {
    backgroundColor: colors.DarkGrey,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 15,
    paddingLeft: 30,
    paddingRight: 30,
  },
  botMessageContainer: {
    backgroundColor: colors.LightBlue,
    borderBottomRightRadius: 25,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 0,
    paddingVertical: 15,
    paddingLeft: 30,
    paddingRight: 30,
  },
  contentContainer: {
    gap: 5,
  },
  message: {
    color: colors.White,
    fontFamily: "Raleway-Regular",
    fontSize: 16,
  },
  botMessage: {
    color: colors.Black,
    fontFamily: "Raleway-Regular",
    fontSize: 16,
  },
  userTimeStamp: {
    fontFamily: "Raleway-Regular",
    fontSize: 10,
    color: colors.LightGrey,
  },
  botTimeStamp: {
    fontFamily: "Raleway-Regular",
    fontSize: 10,
    color: colors.Grey,
    alignSelf: "flex-end",
    paddingRight: 20,
  },
});
