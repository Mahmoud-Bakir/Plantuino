import React from "react";
import Logo from "../../assets/pictures/darkLogo.svg";
import colors from "../../assets/colors/colors";

import { View, StyleSheet } from "react-native";

export default function ScreenHeader({ component: Component }) {
  return (
    <View style={styles.headerContainer}>
      <Component />
      <Logo />
    </View>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    paddingHorizontal: 30,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 80,
    backgroundColor: colors.LightBlue,
  },
});
