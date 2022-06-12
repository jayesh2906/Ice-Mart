import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const Order = ({ order }) => {
  const { orderItems } = order;

  const OrderItem = ({ item }) => {
    return (
      <View style={styles.row}>
        <Image
          source={{
            uri: item.image,
          }}
          style={styles.imageStyle}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.subText}>
            {item.price} &#215; {item.quantity} = {item.price * item.quantity}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View key={order._id} style={styles.card}>
      <View>
        <View style={{ marginBottom: 3, flexDirection: "row" }}>
          <Text style={[styles.subText, { fontWeight: "700" }]}>
            Order Id:{" "}
          </Text>
          <Text style={styles.subText}>{order._id}</Text>
        </View>
        <View style={{ marginBottom: 10, flexDirection: "row" }}>
          <Text style={[styles.subText, { fontWeight: "700" }]}>User Id: </Text>
          <Text style={styles.subText}>{order.userId}</Text>
        </View>
        <FlatList
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          data={orderItems}
          renderItem={({ item }) => <OrderItem item={item} />}
        />
      </View>
      <View style={{ justifyContent: "space-between", alignItems: "flex-end" }}>
        <Text style={styles.subText}>
          {new Date(order.createdAt)
            .toDateString()
            .split(" ")
            .slice(1)
            .join(" ")}
        </Text>
        <Text style={styles.text}>Total = {order.totalPrice}</Text>
      </View>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 2,
    width: "100%",
    padding: 7,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageStyle: {
    height: 50,
    width: 50,
  },
  row: {
    flexDirection: "row",
    gap: 5,
    marginVertical: 3,
  },
  subText: {
    fontSize: ".8rem",
    fontWeight: "500",
  },
  text: {
    fontSize: "1rem",
    fontWeight: "500",
  },
});
