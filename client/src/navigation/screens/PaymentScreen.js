import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const PaymentScreen = ({ navigation }) => {
  const { orders } = useSelector((state) => state.order);
  console.log("orders", orders);
  return <Text>hy</Text>;
};

// <Button
//   title="next"
//   onPress={() => {
//     navigation.navigate("ThankYou");
//   }}
// />;
export default PaymentScreen;

const styles = StyleSheet.create({});
