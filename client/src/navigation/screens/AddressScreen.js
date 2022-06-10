import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import {
  GoogleMap,
  Marker,
  withScriptjs,
  withGoogleMap,
  InfoWindow,
} from "react-google-maps";
import ModalComp from "../../components/ModalComp";
import { useSelector } from "react-redux";

const AddressScreen = ({ navigation }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userId } = useSelector((state) => state.user);

  const [userAddress, setUserAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    pinCode: "",
    country: "",
  });
  const [errorMssg, setErrorMssg] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);

  const Map = () => {
    return (
      <GoogleMap
        defaultZoom={18}
        defaultCenter={{ lat: latitude, lng: longitude }}
      >
        <Marker position={{ lat: latitude, lng: longitude }}>
          <InfoWindow>
            <Text>Your order will be delivered here</Text>
          </InfoWindow>
        </Marker>
      </GoogleMap>
    );
  };

  const WrappedMap = withScriptjs(withGoogleMap(Map));

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    if (Object.values(userAddress).every((val) => val)) {
      setErrorMssg("");
    }
  }, [userAddress]);

  const getTotalPrice = (items) => {
    return items.reduce((acc, curr) => {
      acc = acc + curr.price * curr.quantity;
      return acc;
    }, 0);
  };

  const handleSubmit = () => {
    if (!Object.values(userAddress).every((val) => val)) {
      setErrorMssg("All fields are required");
      return;
    }
    const orderDetails = {
      orderItems: [...cartItems],
      orderAddress: {
        ...userAddress,
      },
      totalPrice: getTotalPrice(cartItems),
      userId,
    };

    console.log(orderDetails);
    navigation.navigate("Payment");
    setShowAddressForm(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ height: "92%" }}>
        <WrappedMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD5wQzn5jaYJwfC-5gDxcZP-PQlVlCrk84"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          setShowAddressForm(true);
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Enter Complete Address</Text>
      </TouchableOpacity>

      {showAddressForm && (
        <ModalComp>
          {Object.keys(userAddress).map((key) => {
            return (
              <React.Fragment key={key}>
                <Text style={styles.label}>{key}</Text>
                <TextInput
                  value={userAddress[key]}
                  onChangeText={(value) =>
                    setUserAddress({ ...userAddress, [key]: value })
                  }
                  style={styles.textInput}
                />
              </React.Fragment>
            );
          })}
          <Text style={styles.errorStyle}>{errorMssg}</Text>
          <TouchableOpacity
            onPress={() => {
              handleSubmit();
            }}
            style={[styles.button, { marginTop: 10 }]}
          >
            <Text style={styles.buttonText}>Submit Address</Text>
          </TouchableOpacity>
        </ModalComp>
      )}
    </View>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
  },
  label: {
    fontSize: "1rem",
    textAlign: "center",
    marginTop: 8,
    textTransform: "capitalize",
  },
  errorStyle: {
    textAlign: "center",
    fontSize: "1rem",
    color: "red",
    fontWeight: "bold",
    marginBottom: ".3rem",
  },
  textInput: {
    outlineColor: "#0275d8",
    borderBottomWidth: 1,
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
    borderBottomColor: "grey",
    padding: 4,
    marginBottom: 8,
    fontSize: "1rem",
    textAlign: "center",
  },
  button: {
    paddingHorizontal: 15,
    justifyContent: "center",
    backgroundColor: "#0275d8",
    paddingVertical: 5,
    marginHorizontal: 10,
    borderRadius: 6,
    alignItems: "center",
    paddingBottom: 10,
    marginVertical: 2,
  },
  buttonText: { color: "white", fontSize: "1.2rem" },
});
