import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";

const filterList = [
  "Cone",
  "Family Pack",
  "Ice Candy",
  "Kulfi",
  "IceCream Cake",
  "High Rating",
  "Low to High Price",
  "High to Low Price",
];

const FilterBox = ({ handleFilter, seletedCategory, setSeletedCategory }) => {
  return (
    <View>
      <FlatList
        horizontal
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        data={filterList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              {
                backgroundColor: item === seletedCategory && "tomato",
              },
            ]}
            onPress={() => {
              setSeletedCategory(item);
              handleFilter(item);
            }}
          >
            <Text
              style={{
                fontSize: "1.2rem",
                color: item === seletedCategory && "white",
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default FilterBox;

const styles = StyleSheet.create({
  card: {
    marginTop: 15,
    marginBottom: 10,
    marginHorizontal: 5,
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    padding: 5,
    paddingHorizontal: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 5,
  },
});
