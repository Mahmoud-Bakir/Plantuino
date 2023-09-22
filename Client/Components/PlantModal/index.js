import React from "react";
import { View, StyleSheet, TouchableOpacity, Modal, Text, SafeAreaView } from "react-native";
import PlantCard from "../PlantCard";
import { AntDesign } from "@expo/vector-icons";

const PlantModal = ({ name, destination, price, imageUrl, closeModal, visible }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <SafeAreaView style={styles.modalContent}>
          <TouchableOpacity style={styles.exit} onPress={closeModal}>
            <AntDesign name="close" size={25} color="Black" />
          </TouchableOpacity>
          <PlantCard
            result={true}
            name={name}
            price={price}
            imageUrl={imageUrl}
            destination={destination}
          />
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    height: "70%",
  },
  exit: {
    alignSelf: "flex-end",
    marginHorizontal: 20,
    marginVertical: 20,
  },
});

export default PlantModal;
