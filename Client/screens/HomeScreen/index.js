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
import { AntDesign } from "@expo/vector-icons";
import colors from "../../assets/colors/colors";
import { useFocusEffect } from "@react-navigation/native";
import ScreenHeader from "../../Components/ScreensHeader";
import { useFonts } from "expo-font";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { LargeButton } from "../../Components/Buttons/LargeButton";
import Home from "../../assets/pictures/homeLabel.svg";
import Market from "../../assets/pictures/market.svg";
import Toggle from "../../Components/Toggle";
import SearchInput from "../../Components/SearchInput";
import PlantCard from "../../Components/PlantCard";
import UserMarket from "../../Components/UserMarket";
import ProductForm from "../../Components/ProductForm";
import axios from "axios";
import { useSelector } from "react-redux";

export default function HomeScreen() {
  const route = useRoute();
  const test = route.params?.refresh;
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState("");
  const [fontsLoaded] = useFonts({
    "Raleway-Bold": require("../../assets/fonts/Raleway-Bold.ttf"),
    "Raleway-Regular": require("../../assets/fonts/Raleway-Regular.ttf"),
  });
  const token = useSelector((state) => state.user.token);
  const userType = useSelector((state) => state.user.userType);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  useEffect(() => {
    const getData = async () => {
      try {
        if (userType == 1) {
          setSelectedChoice("My Market");
          const response = await axios.get(
            "http://192.168.1.5:8000/users/personalMarket",
            {headers}
          );
          const data = response.data.products;
          setProducts(data);
        } else {
          setSelectedChoice("My Garden");
          const response = await axios.get(
            "http://192.168.1.5:8000/users/publicMarket",
            {headers}
          );
          const data = response.data;
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const handleChoiceSelection = (choice) => {
    console.log(selectedChoice);
    setSelectedChoice(choice);
    console.log(choice);
  };
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  if (userType == 1) {
    console.log(selectedChoice);

    return (
      <SafeAreaView style={styles.testContainer}>
        <ScreenHeader component={Market} />
        <Toggle
          choice1="My Market"
          choices={1}
          style={styles.toggle}
          onChoiceSelected={handleChoiceSelection}
        />
        <ScrollView style={styles.marketContainer}>
          <UserMarket products={products} />
        </ScrollView>
        <TouchableOpacity
          style={styles.addIcon}
          onPress={() => navigation.navigate("AddProductScreen")}
        >
          <AntDesign name="pluscircle" size={50} color="Black" />
        </TouchableOpacity>
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
        <Toggle
          choice1="My Garden"
          choice2="Market"
          style={styles.toggle}
          choices={2}
          onChoiceSelected={handleChoiceSelection}
        />
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
        ) : selectedChoice === "Market" ? (
          <>
            <SearchInput />
            <ScrollView style={styles.scroll}>
              <View style={styles.productsContainer}>
                <UserMarket products={products} />
              </View>
            </ScrollView>
          </>
        ) : (
          <></>
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
  search: {
    alignItems: "center",
    marginHorizontal: 50,
    marginTop: 20,
  },
  scroll: {
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
  addIcon: {
    position: "absolute",
    bottom: "10%",
    right: "10%",
  },
  marketContainer: {
  },
});
