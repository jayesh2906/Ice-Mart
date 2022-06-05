import Product from "../models/product.js";
import mongoose from "mongoose";

export const addProduct = async (req, res) => {
  const newProduct = new Product({
    ...req.body,
  });
  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const searchProducts = async (req, res) => {
  const search = new RegExp(req.params.name, "i");
  try {
    const products = await Product.find({ name: search });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const filterProducts = async (req, res) => {
  const category = new RegExp(req.params.category, "i");
  try {
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No product with id: ${id}`);

  const updatedProduct = { ...req.body };
  try {
    await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No product with id: ${id}`);
  try {
    await Product.findByIdAndRemove(id);
    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
