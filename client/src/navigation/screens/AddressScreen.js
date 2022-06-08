import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

const AddressScreen = ({ navigation }) => {
  return (
    <View>
      <Text>AddressScreen</Text>

      <Button
        title="next"
        onPress={() => {
          navigation.navigate("Payment");
        }}
      />
    </View>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
