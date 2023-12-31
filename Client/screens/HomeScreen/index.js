import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../assets/colors/colors";
import ScreenHeader from "../../Components/ScreensHeader";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { LargeButton } from "../../Components/Buttons/LargeButton";
import Home from "../../assets/pictures/homeLabel.svg";
import Market from "../../assets/pictures/market.svg";
import Toggle from "../../Components/Toggle";
import SearchInput from "../../Components/SearchInput";
import UserMarket from "../../Components/UserMarket";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthState } from "../../Redux/Store/authSlice";
import { setProducts } from "../../Redux/Store/productSlice";
import {
  selectPlantDetails,
  selectPlantImage,
} from "../../Redux/Store/plantSlice";
import baseURL from "../../config";
import Colors from "../../assets/colors/colors";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const authState = useSelector(selectAuthState);
  const userType = authState.userType;
  const token = authState.token;
  const country = authState.country;
  const city = authState.city;
  const street = authState.street;
  const located = authState.located;
  const selectedPlant = useSelector(selectPlantDetails);
  const defined = selectedPlant.defined;
  const plantName = selectedPlant.plantName;
  const plantImage = selectedPlant.image;

  const addressing = {
    country,
    city,
    street,
  };
  const navigation = useNavigation();
  const [selectedChoice, setSelectedChoice] = useState("");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [fontsLoaded] = useFonts({
    "Raleway-Bold": require("../../assets/fonts/Raleway-Bold.ttf"),
    "Raleway-Regular": require("../../assets/fonts/Raleway-Regular.ttf"),
  });

  useEffect(() => {
    console.log("Useeffect is running");
    console.log(plantName, plantImage);
    const getData = async () => {
      try {
        if (userType == 1) {
          try {
            setSelectedChoice("My Market");
            const response = await axios.get(
              `http://${baseURL}:3000/users/personalMarket`,
              { headers }
            );
            dispatch(setProducts(response.data));
          } catch (error) {}
          if (!located) {
            try {
              console.log("addressing", addressing);
              await axios.put(
                `http://${baseURL}:3000/users/updateAddress`,
                addressing,
                { headers }
              );
            } catch (error) {}
          }
        } else {
          setSelectedChoice("My Garden");
          try {
            const response = await axios.get(
              `http://${baseURL}:3000/users/publicMarket`,
              { headers }
            );
            console.log("response testing ",response.data)
            dispatch(setProducts(response.data));
          } catch (error) {}
          if (!located) {
            try {
              console.log("addressing", addressing);
              await axios.put(
                `http://${baseURL}:3000/users/updateAddress`,
                addressing,
                { headers }
              );
              console.log("updated",response.data)
            } catch (error) {}
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [dispatch, plantName]);

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
          <View>
            <UserMarket />
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.addIcon}
          onPress={() => navigation.navigate("AddProductScreen")}
        >
          <AntDesign name="pluscircle" size={70} color="Black" />
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
          <View style={styles.container}>
            {defined ? (
              <View style={styles.contentContainer}>
                <Text style={styles.imageTitle}>{plantName}</Text>
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: `${plantImage}` }}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </View>
              </View>
            ) : (
              <View style={styles.contentContainer}>
                <Text style={styles.title}>No Plants</Text>
                <Text style={styles.subtitle}>
                  Start by connecting your arduino kit
                </Text>
                <LargeButton title={"Connect"} handle={()=>navigation.navigate("CameraScreen")}/>
              </View>
            )}
          </View>
        ) : selectedChoice === "Market" ? (
          <ScrollView style={styles.marketContainer}>
            <View>
              <UserMarket />
            </View>
          </ScrollView>
        ) : (
          <></>
        )}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",

  },
  contentContainer: {
    marginTop: 25,
    width: 350,
    alignSelf: "center",
    padding: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.LightBlue,
  },
  title: {
    fontFamily: "Raleway-Bold",
    fontSize: 24,
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
    marginTop: 10,
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
    bottom: "3%",
    right: "5%",
  },
  marketContainer: {
    marginTop: 5,
  },
  productsContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 35,
  },
  imageContainer: {
    height: 500,
    width: 250,
  },
  imageTitle: {
    fontFamily: "Raleway-Bold",
    fontSize: 24,
    marginBottom:10
  },
});
