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
import NotificationsActive from "../../assets/pictures/notifications_active.svg";
import ProfileActive from "../../assets/pictures/profile_active.svg";
import RecognitionScreen from "../../screens/RecognitionScreen";
import HomeScreen from "../../screens/HomeScreen";
export default function BottomTabNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "black",
          height: 90,
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let icon;

          if (route.name === "Home") {
            icon = focused ? <HomeActive /> : <Home />;
          } else if (route.name === "Camera") {
            icon = focused ? <CameraActive /> : <Camera />;
          } else if (route.name === "Analytics") {
            icon = focused ? <AnalyticsActive /> : <Analytics />;
          } else if (route.name === "Notifications") {
            icon = focused ? <NotificationsActive /> : <Notifications />;
          } else if (route.name === "Profile") {
            icon = focused ? <ProfileActive /> : <Profile />;
          }

          return icon;
        },
      })}
    >
      <Tab.Screen
        name="Camera"
        component={RecognitionScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
