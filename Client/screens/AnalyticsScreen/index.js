import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  ScrollView,
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
import { UseSelector } from "react-redux/es/hooks/useSelector";

export default function AnalyticsScreen() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const plant = useSelector(selectPlantDetails);
  const maxL = plant.maxLight;
  const minL = plant.minLight;
  const maxM = plant.maxMoisture;
  const minM = plant.minMoisture;
  const [latestMoisture, setLatestMoisture] = useState("");
  const [latestSunlight, setLatestSunlight] = useState("");
  const authState = useSelector(selectAuthState);
  const [fontsLoaded] = useFonts({
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

  useEffect(() => {
    console.log("Hello from Analytics");
    axios
      .get("http://192.168.1.5:3000/arduino/getData")
      .then((response) => {
        setData(response.data);
        setLoading(false);
        const lastItem = response.data[response.data.length - 1];
        setLatestMoisture(lastItem.moisture);
        setLatestSunlight(lastItem.sunlight);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
    const interval = setInterval(() => {
      console.log("Second TIme")
      axios
        .get("http://192.168.1.5:3000/arduino/getData")
        .then((response) => {
          setData(response.data);
          setLoading(false);
          const lastItem = response.data[response.data.length - 1];
          setLatestMoisture(lastItem.moisture);
          setLatestSunlight(lastItem.sunlight);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }, 1 * 60 * 1000); 

    return () => clearInterval(interval);
  }, []);

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
      {loading ? (
        <ActivityIndicator size="large" color="#38D13E" />
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
              width={400}
              height={500}
              yAxisSuffix="%"
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#000000",
                backgroundGradientTo: "#000000",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(78, 172, 222, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                barPercentage: 0.5,
                categoryPercentage: 2,
              }}
              style={{
                marginVertical: 20,
                borderRadius: 16,
              }}
            />
            <Text style={[styles.feedBack,styles.moisture]}>Last Moisture level: {latestMoisture} %</Text>

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
              width={400}
              height={500}
              yAxisSuffix="%"
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#000000",
                backgroundGradientTo: "#000000",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(227, 141, 62, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                barPercentage: 0.5,
                categoryPercentage: 2,
              }}
              style={{
                marginVertical: 20,
                borderRadius: 16,
              }}
            />
            <Text style={[styles.feedBack, styles.sunlight]}>Last Sunlight Level: {latestSunlight} %</Text>
          </View>
        </ScrollView>
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
  title: {
    marginTop: 40,
    fontSize: 24,
    fontFamily: "Raleway-Bold",
  },
  feedBack:{
    fontSize: 18,
    fontFamily: "Raleway-Bold"
  },
  moisture:{
    color:"rgb(78, 172, 222)"
  },
  sunlight:{
    color:"rgb(227, 141, 62)"
  }
});
