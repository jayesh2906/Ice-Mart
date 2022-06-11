import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { fetchOrders } from "../../reducers/orderReducer";
import Order from "../../components/Order";

const ProfileScreen = () => {
  const [userId, setUserId] = useState("");
  const getUserId = async () => {
    const id = await AsyncStorage.getItem("userId");
    setUserId(id);
  };
  getUserId();
  const dispatch = useDispatch();
  const { email, mobile } = useSelector((state) => state.user);
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (userId) {
      dispatch(fetchOrders(userId));
    }
  }, [userId]);

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.error}>Something Went Wrogn</Text>
      ) : (
        <React.Fragment>
          <ActivityIndicator
            animating={loading}
            size="large"
            color="#0275d8"
            style={styles.activityIndicator}
          />
          <View style={styles.profileInfo}>
            <View style={styles.profile}>
              <Ionicons
                style={{ fontSize: "3.2rem" }}
                name="person-circle-outline"
                size="large"
                color="#0275d8"
              />
              <View>
                <Text style={styles.emailStyle}>
                  {email || "jayesh@gmail.com"}
                </Text>
                <Text style={{ fontSize: "1.1rem" }}>
                  {mobile || 8329812727}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                AsyncStorage.removeItem("token");
                AsyncStorage.removeItem("userId");
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
          <Text style={styles.heading}>My Orders</Text>
          {orders.length && (
            <FlatList
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              data={orders?.slice()?.reverse()}
              renderItem={({ item }) => <Order order={item} />}
            />
          )}
        </React.Fragment>
      )}
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
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: "1",
    position: "absolute",
    right: "46%",
    top: "48%",
  },
  heading: {
    marginVertical: 10,
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
});
