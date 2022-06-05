import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { signupUser, signinUser } from "../reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";

const Auth = ({ setSignedin }) => {
  const [email, setEmails] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState("signin");

  const dispatch = useDispatch();
  const { token, loading, error } = useSelector((state) => state.user);
  if (token) {
    setSignedin && setSignedin(true);
  }

  const handleLogin = () => {
    if (auth === "signin") {
      dispatch(signinUser({ email, password }));
    } else {
      dispatch(signupUser({ email, password }));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Ionicons
          style={{ fontSize: "4rem", fontWidth: "bold" }}
          name="ice-cream"
          size="large"
          color="white"
        />

        <Text style={styles.title}>ICE MART</Text>
      </View>
      <Text style={styles.heading}>User App</Text>
      <ActivityIndicator animating={loading} size="large" color="white" />
      <Text style={styles.error}>{error}</Text>

      <TextInput
        placeholder="Enter Email..."
        style={styles.input}
        onChangeText={(value) => setEmails(value)}
      />

      <TextInput
        placeholder="Enter Password..."
        style={[styles.input, { marginBottom: 16 }]}
        secureTextEntry={true}
        onChangeText={(value) => setPassword(value)}
      />

      {auth === "signin" ? (
        <TouchableOpacity onPress={() => setAuth("signup")}>
          <Text
            style={[
              styles.error,
              { marginBottom: 10, textDecoration: "underline" },
            ]}
          >
            Don't have an account ?
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setAuth("signin")}>
          <Text
            style={[
              styles.error,
              { marginBottom: 10, textDecoration: "underline" },
            ]}
          >
            Already have an account ?
          </Text>
        </TouchableOpacity>
      )}

      <Button
        style={{ fontSize: "2rem" }}
        title={auth === "signin" ? "Log in" : "Sign up"}
        color="#191970"
        onPress={handleLogin}
      />
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flex: 1,
    backgroundColor: "#0275d8",
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { color: "white", fontSize: "2.5rem", fontWidth: "bold" },
  heading: {
    color: "white",
    fontSize: "2rem",
    fontWidth: "bold",
    textAlign: "center",
    marginVertical: 45,
  },
  error: {
    color: "white",
    textAlign: "center",
    fontSize: "1rem",
    marginBottom: 7,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 20,
    marginVertical: 7,
    padding: 8,
    fontSize: "1rem",
    outlineColor: "#0275d8",
  },
});
