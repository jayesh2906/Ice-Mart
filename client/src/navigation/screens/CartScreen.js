import {
  FlatList,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart, removeItemToCart } from "../../reducers/cartReducer";

const CartScreen = ({ navigation }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const Counter = ({ item }) => {
    return (
      <View style={styles.addToCart}>
        <View style={styles.counter}>
          <TouchableOpacity
            onPress={() => {
              if (item.quantity > 0) {
                dispatch(removeItemToCart(item));
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
          <Text style={styles.counterNumber}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => {
              if (item.quantity < item.countInStock) {
                dispatch(addItemToCart(item));
              }
            }}
          >
            <Text style={styles.counterButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const Item = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.leftView}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.subText}>Category : {item.category}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: 10,
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <View
              style={[
                styles.rating,
                {
                  backgroundColor:
                    item.rating > 4
                      ? "#7CFC00"
                      : item.rating > 2
                      ? "#FFFF00"
                      : "#FF0000",
                },
              ]}
            >
              <Text style={styles.subText}>{item.rating}</Text>
              <Ionicons name="star" size="large" />
            </View>
            <Text style={styles.price}>
              &#8377; {item.price * item.quantity}
            </Text>
          </View>

          <Counter item={item} />
        </View>
        <View style={styles.rightView}>
          <Image
            source={{
              uri: item.image,
            }}
            style={styles.imageStyle}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  };

  const getTotalPrice = (items) => {
    return items.reduce((acc, curr) => {
      acc = acc + curr.price * curr.quantity;
      return acc;
    }, 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {cartItems?.length
          ? `In Cart (${cartItems.length})`
          : `Your Cart is Empty, Buy Now!`}
      </Text>

      <FlatList
        keyExtractor={(item) => item.productId}
        showsVerticalScrollIndicator={false}
        data={cartItems}
        renderItem={({ item }) => <Item item={item} />}
      />

      {cartItems.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Address");
          }}
          style={styles.nextButton}
        >
          <View>
            <Text style={[styles.subText, { color: "white" }]}>
              {cartItems.length} ITEMS
            </Text>
            <Text style={[styles.subText, { color: "white" }]}>
              &#8377; {getTotalPrice(cartItems)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Address");
            }}
          >
            <Text
              style={[styles.subText, { color: "white", fontSize: "1.2rem" }]}
            >
              Next <Ionicons name="caret-forward" size="large" />
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  heading: {
    marginVertical: 10,
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  imageStyle: {
    height: "100%",
    width: "100%",
  },
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
    elevation: 2,
    height: 165,
    overflow: "auto",
    width: "100%",
    flexDirection: "row",
  },
  name: { fontSize: "1rem", fontWeight: "bold" },
  price: { fontSize: "1rem", fontWeight: "700" },
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
    width: 45,
    paddingVertical: 3,
  },
  leftView: {
    flexBasis: "50%",
    padding: 10,
    gap: 3,
  },
  rightView: {
    flexBasis: "50%",
  },
  addToCart: {
    flexDirection: "row",
    gap: 8,
    marginTop: "auto",
    alignItems: "center",
  },
  counter: {
    flexDirection: "row",
    backgroundColor: "#0275d8",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingBottom: 5,
    gap: 8,
    borderRadius: 8,
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
  nextButton: {
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    backgroundColor: "#0275d8",
    paddingVertical: 5,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 5,
  },
});
