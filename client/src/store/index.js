import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import cartReducer from "../reducers/cartReducer";
import productReducer from "../reducers/productReducer";

export const store = configureStore({
  reducer: {
    user: authReducer,
    product: productReducer,
    cart: cartReducer,
  },
});
