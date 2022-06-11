import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";

const ProfileScreen = () => {
  const { email, mobile } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <View style={styles.profile}>
          <Ionicons
            style={{ fontSize: "3.2rem" }}
            name="person-circle-outline"
            size="large"
            color="#0275d8"
          />
          <View>
            <Text style={styles.emailStyle}>{email}</Text>
            <Text>{mobile}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.removeItem("token");
            location.reload();
          }}
        >
          <Ionicons
            style={{ fontSize: "3rem", fontWidth: "bold" }}
            name="log-out-outline"
            size="large"
            color="#0275d8"
          />
        </TouchableOpacity>
      </View>

      <View>
        <Text>Order List</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 25, paddingTop: 20 },
  profileInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
    borderBottomWidth: 1,
    borderColor: "grey",
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    flexBasis: "80%",
    gap: 5,
  },
  emailStyle: {
    fontSize: "1.4rem",
    fontWeight: "bold",
  },
});
