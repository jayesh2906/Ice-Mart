import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

const PaymentScreen = ({ navigation }) => {
  return (
    <View>
      <Text>PaymentScreen</Text>
      <Button
        title="next"
        onPress={() => {
          navigation.navigate("ThankYou");
        }}
      />
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
