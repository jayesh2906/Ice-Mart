import { StyleSheet, Text, View, Image, Button, TextInput } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { addProduct, updateProduct } from "../../reducers/productReducer";
import { useDispatch } from "react-redux";
import ModalComp from "../../components/ModalComp";
import Select from "react-select";

const ratingList = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
];

const categoryList = [
  { value: "ice candy", label: "Ice Candy" },
  { value: "cone", label: "Cone" },
  { value: "icecream cake", label: "IceCream Cake" },
  { value: "family pack", label: "Family Pack" },
  { value: "kulfi", label: "Kulfi" },
];

const AddProductScreen = ({ route, navigation }) => {
  const selectedProduct = route?.params?.product;
  const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMssg, setErrorMssg] = useState("");
  const inputRef = useRef();
  const [product, setProduct] = useState({
    name: "",
    image: "",
    price: "",
    countInStock: "",
    rating: "",
    category: "",
  });

  useEffect(() => {
    if (selectedProduct) {
      setProduct({
        name: selectedProduct.name,
        image: selectedProduct.image,
        price: selectedProduct.price,
        countInStock: selectedProduct.countInStock,
        rating: {
          value: selectedProduct.rating,
          label: selectedProduct.rating,
        },
        category: {
          value: selectedProduct.category,
          label: selectedProduct.category,
        },
      });
      setFile(selectedProduct.image);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (Object.values(product).every((val) => val)) {
      setErrorMssg("");
    }
  }, [product]);

  const handleSubmit = () => {
    product.rating = product.rating?.value;
    product.category = product.category?.value;

    if (!Object.values(product).every((val) => val)) {
      setErrorMssg("All fields are required");
      return;
    }

    if (selectedProduct) {
      dispatch(updateProduct({ ...product, id: selectedProduct._id }));
      location.reload();
    } else {
      dispatch(addProduct(product));
      setModalVisible(true);
    }
    setProduct({
      name: "",
      image: "",
      price: "",
      rating: "",
      category: "",
      countInStock: "",
    });
    setFile("");
  };

  const imageHandler = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFile(reader.result);
        setProduct({ ...product, image: reader.result });
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  return (
    <View style={styles.container}>
      <ModalComp
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
      />
      <Text style={styles.heading}>
        {selectedProduct ? "Update Product" : "Add New Product"}
      </Text>

      {Object.keys(product).map((key) => {
        if (!["rating", "category", "image"].includes(key)) {
          return (
            <React.Fragment key={key}>
              <TextInput
                placeholder={`Product ${key}...`}
                value={product[key]}
                onChangeText={(value) =>
                  setProduct({ ...product, [key]: value })
                }
                style={styles.textInput}
              />
            </React.Fragment>
          );
        }
      })}

      <Text style={styles.title}>Rating</Text>
      <Select
        styles={{
          control: (base) => ({
            ...base,
            "&:hover": { borderColor: "tomato" },
            border: "2px solid lightgray",
            boxShadow: "none",
          }),
        }}
        value={product.rating}
        options={ratingList}
        onChange={(values) => {
          setProduct((prev) => ({ ...prev, rating: values }));
        }}
      />

      <Text style={styles.title}>Category</Text>
      <Select
        styles={{
          control: (base) => ({
            ...base,
            "&:hover": { borderColor: "tomato" },
            border: "2px solid lightgray",
            boxShadow: "none",
          }),
        }}
        value={product.category}
        options={categoryList}
        onChange={(values) =>
          setProduct((prev) => ({ ...prev, category: values }))
        }
      />

      <View style={styles.fileUpload}>
        <Image
          source={{
            uri: file,
          }}
          style={{
            height: 100,
            width: 100,
          }}
          resizeMode="contain"
        />
        <Button
          title="select an image"
          onPress={() => {
            inputRef.current.click();
          }}
          color="#696969"
        />
        <input
          type="file"
          ref={inputRef}
          accept="image/*"
          onChange={imageHandler}
          style={{ display: "none" }}
        />
      </View>

      <Text style={styles.errorStyle}>{errorMssg}</Text>
      <Button
        title={selectedProduct ? "Update product" : "submit product"}
        onPress={() => {
          handleSubmit();
        }}
        color="tomato"
      />
    </View>
  );
};

export default AddProductScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 25 },
  heading: { fontSize: "1.5rem", marginBottom: 20 },
  title: { fontSize: "1rem", marginTop: 20, marginBottom: 3 },
  textInput: {
    outlineColor: "tomato",
    borderBottomWidth: 1,
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
    borderBottomColor: "grey",
    padding: 4,
    marginVertical: 8,
    fontSize: "1rem",
    textAlign: "center",
  },
  fileUpload: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    gap: 4,
    alignItems: "center",
    marginBottom: 30,
  },
  errorStyle: {
    textAlign: "center",
    fontSize: "1rem",
    color: "red",
    fontWeight: "bold",
    marginBottom: ".3rem",
  },
});
