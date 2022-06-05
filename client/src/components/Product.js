import { StyleSheet, Text, View, Image, Button } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../reducers/productReducer";

const Product = ({ product, navigation }) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: product.image,
        }}
        style={styles.imageStyle}
        resizeMode="contain"
      />

      <View style={styles.cardBody}>
        <View style={styles.cardRow}>
          <Text style={styles.name}>{product.name}</Text>
          <View
            style={[
              styles.rating,
              {
                backgroundColor:
                  product.rating > 4
                    ? "#7CFC00"
                    : product.rating > 2
                    ? "#FFFF00"
                    : "#FF0000",
              },
            ]}
          >
            <Text style={styles.subText}>{product.rating}</Text>
            <Ionicons name="star" size="large" />
          </View>
        </View>

        <View style={styles.cardRow}>
          <Text style={styles.subText}>Category : {product.category}</Text>
          <Text style={styles.price}>&#8377; {product.price}</Text>
        </View>
      </View>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 5,
    height: 300,
    width: "100%",
  },
  cardBody: {
    borderTopWidth: 0.5,
    borderTopColor: "grey",
  },
  cardRow: {
    marginHorizontal: 15,
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: { fontSize: "1.2rem", fontWeight: "bold", flexBasis: "70%" },
  price: { fontSize: "1.2rem", fontWeight: "bold" },
  subText: {
    fontSize: "1rem",
    fontWeight: "500",
  },
  rating: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    borderRadius: 6,
    paddingHorizontal: ".5rem",
  },
  imageStyle: {
    height: "60%",
    width: "100%",
    shadowColor: "#575757",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 1.25,
    shadowRadius: 4.84,
    elevation: 5,
  },
});
