import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { addItemToCart, removeItemToCart } from "../reducers/cartReducer";
import { useDispatch } from "react-redux";

const Counter = ({ product }) => {
  const [counter, setCounter] = useState(0);
  const dispatch = useDispatch();

  return (
    <View style={styles.addToCart}>
      <View style={styles.counter}>
        <TouchableOpacity
          onPress={() => {
            setCounter((prev) => (prev > 0 ? prev - 1 : 0));
            if (counter > 0) {
              const {
                name,
                image,
                price,
                _id: productId,
                rating,
                countInStock,
                category,
              } = product;
              dispatch(
                removeItemToCart({
                  name,
                  image,
                  price,
                  productId,
                  countInStock,
                  rating,
                  category,
                })
              );
            }
          }}
        >
          <Text
            style={[
              styles.counterButton,
              {
                marginRight: 2,
              },
            ]}
          >
            -
          </Text>
        </TouchableOpacity>
        <Text style={styles.counterNumber}>{counter}</Text>
        <TouchableOpacity
          onPress={() => {
            setCounter((prev) =>
              prev < product?.countInStock ? prev + 1 : prev
            );
            if (counter < product.countInStock) {
              const {
                name,
                image,
                price,
                _id: productId,
                countInStock,
                rating,
                category,
              } = product;
              dispatch(
                addItemToCart({
                  name,
                  image,
                  price,
                  productId,
                  countInStock,
                  rating,
                  category,
                })
              );
            }
          }}
        >
          <Text style={styles.counterButton}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  addToCart: {
    marginHorizontal: 15,
    marginVertical: 5,
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  counter: {
    flexDirection: "row",
    backgroundColor: "#0275d8",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingBottom: 5,
    gap: 8,
    borderRadius: 5,
  },
  counterButton: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 5,
  },
  counterNumber: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "white",
    marginTop: 4,
  },
});
