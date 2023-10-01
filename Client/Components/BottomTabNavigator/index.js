import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Analytics from "../../assets/pictures/chart.svg";
import Camera from "../../assets/pictures/camera.svg";
import Home from "../../assets/pictures/home.svg";
import Notifications from "../../assets/pictures/notifications.svg";
import Profile from "../../assets/pictures/profile.svg";
import AnalyticsActive from "../../assets/pictures/chart_active.svg";
import CameraActive from "../../assets/pictures/camera_active.svg";
import HomeActive from "../../assets/pictures/home_active.svg";
import Chart from "../../assets/pictures/chart.svg";
import ChartActive from "../../assets/pictures/chart_active.svg";
import NotificationsActive from "../../assets/pictures/notifications_active.svg";
import ProfileActive from "../../assets/pictures/profile_active.svg";
import RecognitionScreen from "../../screens/RecognitionScreen";
import HomeScreen from "../../screens/HomeScreen";
import ChatScreen from "../../screens/ChatBotScreen";
import AnalyticsScreen from "../../screens/AnalyticsScreen";
import { selectAuthState } from "../../Redux/Store/authSlice";
import { useSelector } from "react-redux";
import ProfileScreen from "../../screens/ProfileScreen";

export default function BottomTabNavigator() {
  const Tab = createBottomTabNavigator();
  const authState = useSelector(selectAuthState);
  const userType = authState.userType;

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "black",
          height: 85,
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let icon;

          if (route.name === "HomeScreen") {
            icon = focused ? <HomeActive /> : <Home />;
          } else if (route.name === "CameraScreen") {
            icon = focused ? <CameraActive /> : <Camera />;
          } else if (route.name === "ChatBotScreen") {
            icon = focused ? <NotificationsActive /> : <Notifications />;
          } else if (route.name === "ProfileScreen") {
            icon = focused ? <ProfileActive /> : <Profile />;
          } else if (route.name === "AnalyticsScreen") {
            icon = focused ? <ChartActive /> : <Chart />;
          }else if (route.name === "ProfileScreen") {
            icon = focused ? <Profile /> : <ProfileActive />;
          }

          return icon;
        },
      })}
    >
      {userType === 0 && (
        <Tab.Screen
          name="AnalyticsScreen"
          component={AnalyticsScreen}
          options={{ headerShown: false }}
        />
      )}
      {userType === 0 && (
        <Tab.Screen
          name="CameraScreen"
          component={RecognitionScreen}
          options={{ headerShown: false }}
        />
      )}
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="ChatBotScreen"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
