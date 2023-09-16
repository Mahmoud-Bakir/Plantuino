import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import colors from "../../assets/colors/colors";
import { useFonts } from "expo-font";

export default function RecognitionScreen() {
  const [fontsLoaded] = useFonts({
    "Raleway-Bold": require("../../assets/fonts/Raleway-Bold.ttf"),
    "Raleway-Regular": require("../../assets/fonts/Raleway-Regular.ttf"),
  });
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <Button title="Share" onPress={sharePic} />
        {hasMediaLibraryPermission ? (
          <Button title="Save" onPress={savePhoto} />
        ) : undefined}
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.captureMessageContainer}>
        <Text style={styles.captureMessage}>
          kindly set your plant inside the frame
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <View style={styles.captureButton}>
            <TouchableOpacity onPress={takePic}>
              <View style={styles.inner} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.topLeftEdge} />
      <View style={styles.topRightEdge} />
      <View style={styles.bottomRightEdge} />
      <View style={styles.bottonLeftEdge} />
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 16,
    width: "100%",
    alignItems: "center",
  },
  captureButton: {
    justifyContent: "center",
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "white",
  },
  inner: {
    alignSelf: "center",

    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "black",
    backgroundColor: "white",
  },
  topLeftEdge: {
    position: "absolute",
    top: "20%",
    left: "15%",
    width: "25%",
    height: "15%",
    borderColor: "white",
    borderRadius: 15,
    borderWidth: 7,
    borderTopWidth: 5,
    borderBottomWidth: 0,
    borderLeftWidth: 5,
    borderRightWidth: 0,
  },
  topRightEdge: {
    position: "absolute",
    top: "20%",
    right: "15%",
    width: "25%",
    height: "15%",
    borderColor: "white",
    borderRadius: 15,
    borderWidth: 7,
    borderTopWidth: 5,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 5,
  },
  bottomRightEdge: {
    position: "absolute",
    bottom: "30%",
    right: "15%",
    width: "25%",
    height: "15%",
    borderColor: "white",
    borderRadius: 15,
    borderWidth: 7,
    borderTopWidth: 0,
    borderBottomWidth: 5,
    borderLeftWidth: 0,
    borderRightWidth: 5,
  },
  bottonLeftEdge: {
    position: "absolute",
    bottom: "30%",
    left: "15%",
    width: "25%",
    height: "15%",
    borderColor: "white",
    borderRadius: 15,
    borderWidth: 7,
    borderTopWidth: 0,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderRightWidth: 0,
  },
  captureMessage: {
    fontFamily: "Raleway-Regular",
    fontSize: 14,
    color: "white",
    fontSize: 18,
  },
  captureMessageContainer: {
    position: "absolute",
    bottom: 100,
    borderRadius: 10,
    padding: 8,
    backgroundColor: colors.GreyTransparent,
  },
});
