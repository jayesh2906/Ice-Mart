import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const SearchBox = ({ handleSearch }) => {
  const [value, setValue] = useState("");
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Ice Cream..."
        style={styles.searchInput}
        onChangeText={(value) => {
          setValue(value);
        }}
      />
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => {
          handleSearch(value);
        }}
      >
        <Ionicons name="search" size="large" color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  container: {
    marginTop: "1.6rem",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: "3%",
    borderWidth: 4,
    borderColor: "#0275d8",
  },
  searchInput: {
    padding: 4,
    fontSize: "1rem",
    flexBasis: "90%",
    outlineStyle: "none",
  },
  searchButton: {
    backgroundColor: "#0275d8",
    padding: 4,
  },
});
