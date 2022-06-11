import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import GooglePayButton from "@google-pay/button-react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { placeOrder } from "../../reducers/orderReducer";

const PaymentScreen = ({ navigation }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.order);
  const { orderItems } = orders;

  return (
    <View style={styles.container}>
      {paymentSuccess ? (
        <View style={styles.paymentSuccess}>
          <Text style={[styles.subText, { fontWeight: "500", color: "black" }]}>
            Payment Successful
          </Text>
          <Image
            style={{ width: 200, height: 200 }}
            source={require("../../../assets/success.gif")}
          />
          <View
            style={[styles.payButton, styles.card, { paddingHorizontal: 15 }]}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("My Profile");
              }}
            >
              <Text style={[styles.subText, { fontWeight: "500" }]}>
                View My Orders
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <React.Fragment>
          <View style={[styles.orderDetails, styles.card]}>
            <View>
              <Text
                style={[styles.subText, { color: "black", marginBottom: 5 }]}
              >
                Payment Information
              </Text>
              {orderItems.map(({ name, price, quantity }) => {
                return (
                  <View key={name} style={styles.row}>
                    <Text style={styles.name}>
                      {name}
                      <Text style={[styles.price, { marginLeft: 10 }]}>
                        {price} &#215; {quantity}
                      </Text>
                    </Text>

                    <Text style={styles.price}>{price * quantity}</Text>
                  </View>
                );
              })}
            </View>
            <View
              style={[
                styles.row,
                {
                  borderTopWidth: 1,
                  borderStyle: "dotted",
                  paddingTop: 5,
                },
              ]}
            >
              <Text style={styles.name}>Total Amount</Text>
              <Text style={styles.price}>{orders.totalPrice}</Text>
            </View>
          </View>
          <View style={[styles.payButton, styles.card]}>
            <Text style={styles.subText}>&#8377; {orders.totalPrice}</Text>
            <GooglePayButton
              environment="TEST"
              paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                  {
                    type: "CARD",
                    parameters: {
                      allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                      allowedCardNetworks: ["MASTERCARD", "VISA"],
                    },
                    tokenizationSpecification: {
                      type: "PAYMENT_GATEWAY",
                      parameters: {
                        gateway: "example",
                        gatewayMerchantId: "exampleGatewayMerchantId",
                      },
                    },
                  },
                ],
                merchantInfo: {
                  merchantId: "12345678901234567890",
                  merchantName: "Demo Merchant",
                },
                transactionInfo: {
                  totalPriceStatus: "FINAL",
                  totalPriceLabel: "Total",
                  totalPrice: "100.00",
                  currencyCode: "USD",
                  countryCode: "US",
                },
                shippingAddressRequired: false,
              }}
              onLoadPaymentData={(paymentRequest) => {
                console.log("load payment data", paymentRequest);
                dispatch(placeOrder(orders));
                setPaymentSuccess(true);
              }}
              existingPaymentMethodRequired="false"
              buttonColor="white"
              buttonType="pay"
            />
          </View>
        </React.Fragment>
      )}
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentSuccess: { alignItems: "center", gap: 15 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  payButton: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 10,
    width: "100%",
    backgroundColor: "#0275d8",
    borderRadius: 6,
  },
  subText: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "white",
  },
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 1,
  },
  orderDetails: {
    width: "100%",
    marginBottom: 10,
    borderRadius: 6,
    padding: 10,
  },
  name: { fontSize: "1rem", fontWeight: "600" },
  price: { fontSize: "1rem", fontWeight: "700" },
});
