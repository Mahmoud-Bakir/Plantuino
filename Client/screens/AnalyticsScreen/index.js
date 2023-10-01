import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BarChart } from "react-native-chart-kit";
import axios from "axios";
import ScreenHeader from "../../Components/ScreensHeader";
import Analytics from "../../assets/pictures/Analytics.svg";
import { selectAuthState } from "../../Redux/Store/authSlice";
import { useSelector } from "react-redux";
import { useFonts } from "expo-font";
import { selectPlantDetails } from "../../Redux/Store/plantSlice";
import { LargeButton } from "../../Components/Buttons/LargeButton";
import { useNavigation } from "@react-navigation/native";
import baseURL from "../../config";

export default function AnalyticsScreen() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const plant = useSelector(selectPlantDetails);
  const auth = useSelector(selectAuthState);
  const id = auth._id;
  const { maxLight, minLight, maxMoisture, minMoisture,plantName } = plant;
  const defined = plant.defined;
  const [latestMoisture, setLatestMoisture] = useState(0);
  const [latestSunlight, setLatestSunlight] = useState(0);
  const latestMoistureRef = useRef(latestMoisture);
  const latestSunlightRef = useRef(latestSunlight);
  const navigation = useNavigation();

  useFonts({
    "Raleway-Regular": require("../../assets/fonts/Raleway-Regular.ttf"),
    "Raleway-SemiBold": require("../../assets/fonts/Raleway-SemiBold.ttf"),
  });

  const getDayOfWeek = (timestamp) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(timestamp);
    const dayOfWeek = date.getDay();
    return daysOfWeek[dayOfWeek];
  };

  const lowMoistureAlert = async () => {
    await axios.post(`https://app.nativenotify.com/api/indie/notification`, {
      subID: id,
      appId: 12747,
      appToken: "BDt99Jcmi6Wq2atbqo1sGR",
      title: `WARNING`,
      message: `${plantName} needs Water!`,
    });
  };

  const highMoistureAlert = async () => {
    await axios.post(`https://app.nativenotify.com/api/indie/notification`, {
      subID: id,
      appId: 12747,
      appToken: "BDt99Jcmi6Wq2atbqo1sGR",
      title: `WARNING`,
      message: `${plantName} is in excess of Water!`,
    });
  };

  const lowLightAlert = async () => {
    await axios.post(`https://app.nativenotify.com/api/indie/notification`, {
      subID: id,
      appId: 12747,
      appToken: "BDt99Jcmi6Wq2atbqo1sGR",
      title: `WARNING`,
      message: `${plantName} needs Sunlight!`,
    });
  };

  const highLightAlert = async () => {
    await axios.post(`https://app.nativenotify.com/api/indie/notification`, {
      subID: id,
      appId: 12747,
      appToken: "BDt99Jcmi6Wq2atbqo1sGR",
      title: `WARNING`,
      message: `${plantName} needs shade!`,
    });
  };

  const test = () => {
    console.log(
      minLight,
      maxLight,
      minMoisture,
      maxMoisture,
      latestMoisture,
      latestSunlight
    );
  };

  useEffect(() => {
    if (!defined) return;
    try {
      console.log("Hello from Analytics");
      test();
      axios.get(`http://${baseURL}:3000/arduino/getData`).then((response) => {
        setData(response.data);
        setLoading(false);
        const lastItem = response.data[response.data.length - 1];
        console.log("last ITem", lastItem);
        console.log(lastItem.moisture);
        setLatestMoisture(lastItem.moisture);
        setLatestSunlight(lastItem.sunlight);
        latestMoistureRef.current = lastItem.moisture;
        latestSunlightRef.current = lastItem.sunlight;
        if (lastItem.moisture < minMoisture) lowMoistureAlert();
        if (lastItem.moisture > maxMoisture) highMoistureAlert();
        if (lastItem.sunlight < minLight) lowLightAlert();
        if (lastItem.sunlight > maxLight) highLightAlert();
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    const interval = setInterval(async () => {
      console.log(latestMoistureRef.current, latestSunlightRef.current);
      console.log("Second TIme");
      axios
        .get(`http://${baseURL}:3000/arduino/getData`)
        .then((response) => {
          setData(response.data);
          setLoading(false);
          const lastItem = response.data[response.data.length - 1];
          setLatestMoisture(lastItem.moisture);
          setLatestSunlight(lastItem.sunlight);
          latestMoistureRef.current = lastItem.moisture;
          latestSunlightRef.current = lastItem.sunlight;
          if (lastItem.moisture < minMoisture) lowMoistureAlert();
          if (lastItem.moisture > maxMoisture) highMoistureAlert();
          if (lastItem.sunlight < minLight) lowLightAlert();
          if (lastItem.sunlight > maxLight) highLightAlert();
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }, 1 * 60 * 1000);

    return () => clearInterval(interval);
  }, [defined]);

  const processData = () => {
    const result = {
      moisture: {},
      sunlight: {},
      count: {},
    };

    data.forEach((item) => {
      const dayOfWeek = getDayOfWeek(item.createdAt);
      if (!result.moisture[dayOfWeek]) {
        result.moisture[dayOfWeek] = 0;
        result.sunlight[dayOfWeek] = 0;
        result.count[dayOfWeek] = 0;
      }

      result.moisture[dayOfWeek] += item.moisture;
      result.sunlight[dayOfWeek] += item.sunlight;
      result.count[dayOfWeek] += 1;
    });

    Object.keys(result.moisture).forEach((day) => {
      if (result.count[day] !== 0) {
        result.moisture[day] /= result.count[day];
        result.sunlight[day] /= result.count[day];
      }
    });

    return result;
  };

  const averagedData = processData();

  const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader component={Analytics} />
      {defined ? (
        loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#38D13E" />
          </View>
        ) : (
          <ScrollView>
            <View>
              <Text style={[styles.title]}>Weekly Average Moisture</Text>
              <BarChart
                data={{
                  labels: daysOfWeek,
                  datasets: [
                    {
                      data: [
                        averagedData.moisture.Sunday || 0,
                        averagedData.moisture.Monday || 0,
                        averagedData.moisture.Tuesday || 0,
                        averagedData.moisture.Wednesday || 0,
                        averagedData.moisture.Thursday || 0,
                        averagedData.moisture.Friday || 0,
                        averagedData.moisture.Saturday || 0,
                      ],
                    },
                  ],
                }}
                width={380}
                height={500}
                yAxisSuffix="%"
                yAxisInterval={1}
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#000000",
                  backgroundGradientTo: "#000000",
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(78, 172, 222, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                  },
                  barPercentage: 0.5,
                  categoryPercentage: 2,
                }}
                style={{
                  marginVertical: 20,
                  borderRadius:20,
                }}
              />
              <Text style={[styles.feedBack, styles.moisture]}>
                Last Moisture level: {latestMoisture} %
              </Text>

              <Text style={styles.title}>Weekly Average Sunlinght</Text>
              <BarChart
                data={{
                  labels: daysOfWeek,
                  datasets: [
                    {
                      data: [
                        averagedData.sunlight.Sunday || 0,
                        averagedData.sunlight.Monday || 0,
                        averagedData.sunlight.Tuesday || 0,
                        averagedData.sunlight.Wednesday || 0,
                        averagedData.sunlight.Thursday || 0,
                        averagedData.sunlight.Friday || 0,
                        averagedData.sunlight.Saturday || 0,
                      ],
                    },
                  ],
                }}
                width={380}
                height={500}
                yAxisSuffix="%"
                yAxisInterval={1}
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#000000",
                  backgroundGradientTo: "#000000",
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(227, 141, 62, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                  },
                  barPercentage: 0.5,
                  categoryPercentage: 2,
                }}
                style={{
                  borderRadius:20,
                  marginVertical: 20,
                }}
              />
              <Text style={[styles.feedBack, styles.sunlight]}>
                Last Sunlight Level: {latestSunlight} %
              </Text>
            </View>
          </ScrollView>
        )
      ) : (
        <View style={styles.container}>
          <Text style={styles.feedBack}> </Text>
          <Text style={styles.feedBack}>Please Scan your Plant First</Text>
          <LargeButton
            title="Scan"
            handle={() => navigation.navigate("CameraScreen")}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // emptyContainer: {
  //   flex: 1,
  //   flexDirection: "colomn",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  title: {
    marginTop: 40,
    fontSize: 24,
    fontFamily: "Raleway-Bold",
  },
  feedBack: {
    fontSize: 18,
    fontFamily: "Raleway-Bold",
  },
  moisture: {
    color: "rgb(78, 172, 222)",
  },
  sunlight: {
    color: "rgb(227, 141, 62)",
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 600,
  },
});
