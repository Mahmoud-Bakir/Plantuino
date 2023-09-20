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
import { useState } from "react";
import { NotificationsScreen } from "../NotificationsScreen";
import ChatBot from "../../assets/pictures/chatBot.svg";
import Notification from "../../assets/pictures/notification.svg";

import Toggle from "../../Components/Toggle";

export default function ChatBotScreen() {
  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleChoiceSelection = (choice) => {
    setSelectedChoice(choice);
    console.log(choice);
  };

  const [fontsLoaded] = useFonts({
    "Raleway-Bold": require("../../assets/fonts/Raleway-Bold.ttf"),
    "Raleway-Regular": require("../../assets/fonts/Raleway-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      {selectedChoice === "Notifications" ? (
        <>
          <ScreenHeader component={Notification} />
        </>
      ) : (
        <>
          <ScreenHeader component={ChatBot} />
        </>
      )}
      <Toggle
        choice1="ChatBot"
        choice2="Notifications"
        style={styles.toggle}
        choices={2}
        onChoiceSelected={handleChoiceSelection}
      />
      <ScrollView style={styles.chatArea}>
        {selectedChoice === "Notifications" ? (
          <>
            <NotificationsScreen />
          </>
        ) : (
          <>
            <View style={styles.userMessage}>
              <Message
                type="user"
                message="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
                time="10:52pm"
              />
            </View>
            <View style={styles.botMessage}>
              <Message
                type="bot"
                message="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
                time="10:53 pm"
              />
            </View>
          </>
        )}
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
    marginTop: 5,
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
