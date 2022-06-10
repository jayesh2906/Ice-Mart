import Order from "../models/Order.js";

export const addOrder = async (req, res) => {
  const newOrder = new Order({
    ...req.body,
  });
  try {
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const Orders = await Order.find();
    res.status(200).json(Orders);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
