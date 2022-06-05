import React from "react";
import { Modal, StyleSheet, Text, Button, View } from "react-native";

const ModalComp = ({ modalVisible, setModalVisible }) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Product added succesfully!</Text>
            <View style={styles.buttonGroup}>
              <Button
                color="tomato"
                title="add new product"
                onPress={() => {
                  setModalVisible(false);
                }}
              />
              <Button
                color="tomato"
                title="Go to home"
                onPress={() => {
                  setModalVisible(false);
                  location.reload();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalComp;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  buttonGroup: { display: "flex", flexDirection: "row", gap: 2 },
});
