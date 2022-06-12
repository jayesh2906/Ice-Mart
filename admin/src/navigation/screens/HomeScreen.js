import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  filterProducts,
  searchProducts,
  sortProducts,
} from "../../reducers/productReducer";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../components/Product";
import SearchBox from "../../components/SearchBox";
import FilterBox from "../../components/FilterBox";

const HomeScreen = ({ navigation }) => {
  const [seletedCategory, setSeletedCategory] = useState("");
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleSearch = (searchValue) => {
    setSeletedCategory("");
    dispatch(searchProducts(searchValue));
  };

  const handleFilter = (category) => {
    if (category === "High Rating") {
      dispatch(sortProducts({ key: "rating", order: "asc" }));
    } else if (category === "Low to High Price") {
      dispatch(sortProducts({ key: "price", order: "desc" }));
    } else if (category === "High to Low Price") {
      dispatch(sortProducts({ key: "price", order: "asc" }));
    } else {
      dispatch(filterProducts(category));
    }
  };

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.error}>Something Went Wrogn</Text>
      ) : (
        <>
          <ActivityIndicator
            animating={loading}
            size="large"
            color="tomato"
            style={styles.activityIndicator}
          />
          <SearchBox handleSearch={handleSearch} />
          <FilterBox
            handleFilter={handleFilter}
            seletedCategory={seletedCategory}
            setSeletedCategory={setSeletedCategory}
          />
          {!products.length && !loading ? (
            <Text style={styles.notFound}>No Item found!</Text>
          ) : (
            <FlatList
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              data={products?.slice().reverse()}
              renderItem={({ item }) => (
                <Product product={item} navigation={navigation} />
              )}
            />
          )}
        </>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
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
  notFound: {
    textAlign: "center",
    fontSize: "1.2rem",
    marginVertical: "1rem",
  },
  error: { textAlign: "center", marginVertical: "18rem" },
});
