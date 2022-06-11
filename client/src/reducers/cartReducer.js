import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const { payload } = action;
      const getCartItems = current(state).cartItems.slice();
      const existItem = getCartItems.find(
        (item) => item.productId === payload.productId
      );

      if (existItem) {
        state.cartItems = getCartItems.map((item) =>
          item.productId === existItem.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        state.cartItems = [...getCartItems, { ...payload, quantity: 1 }];
      }
    },
    removeItemToCart: (state, action) => {
      const { payload } = action;
      const getCartItems = current(state).cartItems.slice();
      state.cartItems = getCartItems
        .map((item) =>
          item.productId === payload.productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
    },
    emptyCart: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: {},
});

export const { addItemToCart, removeItemToCart, emptyCart } =
  cartReducer.actions;
export default cartReducer.reducer;
