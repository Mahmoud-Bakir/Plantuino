import React, { useState, useEffect } from "react-native";
import {
  getIndieNotificationInbox,
  deleteIndieNotificationInbox,
} from "native-notify";

export const NotificationsScreen = () => {
  const [data, setData] = useState([]);
  useEffect(async () => {
    let notifications = await getIndieNotificationInbox(
      "put your Indie Push Sub ID here as a string",
      12377,
      "YCjAsF4USBdjSLbUwETH8H"
    );
    console.log("notifications: ", notifications);
    setData(notifications);
  }
  , []);
  return <View style={{ backgroundColor: "plum", flex: 1 }}></View>;
};
