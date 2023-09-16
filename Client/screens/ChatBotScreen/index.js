import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../assets/colors/colors";
import ScreenHeader from "../../Components/ScreensHeader";
import Message from "../../Components/Message";
import { useFonts } from "expo-font";
import { LargeButton } from "../../Components/Buttons/LargeButton";
import ChatBot from "../../assets/pictures/ChatBot.svg";
import Toggle from "../../Components/Toggle";

export default function ChatBotScreen() {
  const [fontsLoaded] = useFonts({
    "Raleway-Bold": require("../../assets/fonts/Raleway-Bold.ttf"),
    "Raleway-Regular": require("../../assets/fonts/Raleway-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader component={ChatBot} />
      <View style={styles.toggleContainer}>
        <Toggle
          choice1="Notifications"
          choice2="ChatBot"
          style={styles.toggle}
        />
      </View>
      <ScrollView style={styles.chatArea}>
        <View style={styles.userMessage}>
          <Message type="user" message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque commodo aliquet sagittis. Sed iaculis ut nulla eu rhoncus. Maecenas consequat neque vel euismod interdum. Aliquam lacinia eros sed neque condimentum rhoncus vel sed erat. Praesent nec odio augue. Proin dignissim, nisl sed tempor interdum, quam massa egestas sem, vel m" time="10:52pm" />
        </View>
        <View style={styles.botMessage}>
          <Message type="bot" message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque commodo aliquet sagittis. Sed iaculis ut nulla eu rhoncus. Maecenas consequat neque vel euismod interdum. Aliquam lacinia eros sed neque condimentum rhoncus vel sed erat. Praesent nec odio augue. Proin dignissim, nisl sed tempor interdum, quam massa egestas sem, vel m" time="10:53 pm" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Raleway-Bold",
    fontSize: 24,
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: "Raleway-Regular",
    color: colors.Grey,
    fontSize: 14,
    marginBottom: 25,
  },
  toggle: {
    alignSelf: "center",
  },
  toggleContainer: {
    marginTop:30,
    marginHorizontal: 20,
    alignSelf: "center",
  },
  userMessage: {
    marginTop: 20,
    paddingHorizontal: 20,
    marginLeft: 50,
  },
  botMessage: {
    marginTop: 20,
    paddingHorizontal: 20,
    marginRight: 50,
  },
  chatArea: {
    marginTop: 20,
  },
});
