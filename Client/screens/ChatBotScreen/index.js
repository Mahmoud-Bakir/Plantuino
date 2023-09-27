import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../assets/colors/colors";
import ScreenHeader from "../../Components/ScreensHeader";
import Message from "../../Components/Message";
import { useFonts } from "expo-font";
import { LargeButton } from "../../Components/Buttons/LargeButton";
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

  const [message, setMessage] = useState("");

  const [fontsLoaded] = useFonts({
    "Raleway-Bold": require("../../assets/fonts/Raleway-Bold.ttf"),
    "Raleway-Regular": require("../../assets/fonts/Raleway-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.topSafeArea} edges={['top']} />
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
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => handleSendMessage(message)}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  topSafeArea: {
    flex: 0,
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 60,
    borderColor: colors.Grey,
    backgroundColor: colors.White,
    marginBottom:5
  },

  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: colors.Grey,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },

  sendButton: {
    backgroundColor: colors.Green,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  sendButtonText: {
    color: colors.White,
    fontFamily: "Raleway-Bold",
    fontSize: 16,
  },
});
