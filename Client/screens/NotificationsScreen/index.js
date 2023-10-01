import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import axios from "axios";
import {
  getNotificationInbox,
  getIndieNotificationInbox,
  deleteIndieNotificationInbox,
} from "native-notify";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthState } from "../../Redux/Store/authSlice";
import { ScrollView } from "react-native-gesture-handler";

export const NotificationsScreen = () => {
  const [data, setData] = useState([]);
  const auth = useSelector(selectAuthState);
  const _id = auth._id;

  useEffect(() => {
    const getData = async () => {
      try {
        let notifications = await getIndieNotificationInbox(
          _id,
          12747,
          "BDt99Jcmi6Wq2atbqo1sGR"
        );
        console.log("notifications: ", notifications);
        setData(notifications);
        console.log(notifications);
      } catch (error) {
        console.error("Error fetching :", error);
      }
    };
    getData();
  }, []);

  return (
    <ScrollView>
        {data.map((notification, index) => (
          <View
            key={index}
            style={{ marginBottom: 10, padding: 10, backgroundColor: "white" }}
          >
            <Text>Date: {notification.date}</Text>
            <Text>Message: {notification.message}</Text>
            <Text>Notification: {notification.notification}</Text>
            <Text>Title: {notification.title}</Text>
          </View>
        ))}
    </ScrollView>
  );
};
