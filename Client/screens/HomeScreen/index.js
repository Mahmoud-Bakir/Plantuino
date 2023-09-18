import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import colors from "../../assets/colors/colors";
import ScreenHeader from "../../Components/ScreensHeader";
import { useFonts } from "expo-font";
import { useState, useEffect } from "react";
import { LargeButton } from "../../Components/Buttons/LargeButton";
import Home from "../../assets/pictures/homeLabel.svg";
import Market from "../../assets/pictures/market.svg";
import axios from "axios";
import Toggle from "../../Components/Toggle";
import SearchInput from "../../Components/SearchInput";
import PlantCard from "../../Components/PlantCard";
import UserMarket from "../../Components/UserMarket";

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [token, setToken] = useState("");
  const [userType, setUserType] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const [selectedChoice, setSelectedChoice] = useState("");
  const [fontsLoaded] = useFonts({
    "Raleway-Bold": require("../../assets/fonts/Raleway-Bold.ttf"),
    "Raleway-Regular": require("../../assets/fonts/Raleway-Regular.ttf"),
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const userType = await SecureStore.getItemAsync("userType");
        setUserType(userType);
        const id = await SecureStore.getItemAsync("_id");
        setId(id);
        const token = await SecureStore.getItemAsync("token");
        setToken(token);
        if (userType == 0) {
          setSelectedChoice("My Garden");
        } else {
          setSelectedChoice("My Market");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const handleChoiceSelection = (choice) => {
    setSelectedChoice(choice);
    if (choice === "Add a Plant") setModalVisible(true);
  };
  // IS it okay to leave it like this or should I put each part as a component?
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  if (userType == 1) {
    return (
      <SafeAreaView style={styles.testContainer}>
        <ScreenHeader component={Market} />
        <View style={styles.toggleContainer}>
          <Toggle
            choice1="My Market"
            choice2="Add a Plant"
            style={styles.toggle}
            onChoiceSelected={handleChoiceSelection}
          />
        </View>
        {selectedChoice === "Add a Plant" ? (
          <View style={styles.container}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(false);
              }}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text>Modal Content</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text>Close Modal</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        ) : (
          <>
            <ScrollView style={styles.scroll}>
              <UserMarket />
            </ScrollView>
          </>
        )}
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        {selectedChoice === "My Garden" ? (
          <ScreenHeader component={Home} />
        ) : (
          <ScreenHeader component={Market} />
        )}
        <View style={styles.toggleContainer}>
          <Toggle
            choice1="My Garden"
            choice2="Market"
            style={styles.toggle}
            onChoiceSelected={handleChoiceSelection}
          />
        </View>
        {selectedChoice === "My Garden" ? (
          <ScrollView>
            <SafeAreaView style={styles.container}>
              <View style={styles.contentContainer}>
                <Text style={styles.title}>No Plants</Text>
                <Text style={styles.subtitle}>
                  Start by connecting your arduino kit
                </Text>
                <LargeButton title={"Connect"} />
              </View>
            </SafeAreaView>
          </ScrollView>
        ) : (
          <>
            <View style={styles.search}>
              <SearchInput />
            </View>
            <ScrollView style={styles.scroll}>
              <View style={styles.productsContainer}>
                <PlantCard
                  name="Dracaena reflexa"
                  price="15"
                  destination="Tripoli-Abi Samraa"
                />
                <PlantCard
                  name="Dracaena reflexa"
                  price="15"
                  destination="Tripoli-Abi Samraa"
                />
                <PlantCard
                  name="Dracaena reflexa"
                  price="15"
                  destination="Tripoli-Abi Samraa"
                />
                <PlantCard
                  name="Dracaena reflexa"
                  price="15"
                  destination="Tripoli-Abi Samraa"
                />
                <PlantCard
                  name="Dracaena reflexa"
                  price="15"
                  destination="Tripoli-Abi Samraa"
                />
                <PlantCard
                  name="Dracaena reflexa"
                  price="15"
                  destination="Tripoli-Abi Samraa"
                />
              </View>
            </ScrollView>
          </>
        )}
      </SafeAreaView>
    );
  }
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
    marginTop: 30,
    marginHorizontal: 20,
    alignSelf: "center",
  },
  search: {
    alignItems: "center",
    marginHorizontal: 50,
    marginTop: 20,
  },
  scroll: {
    marginTop: 20,
  },
  testContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    height: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
});
