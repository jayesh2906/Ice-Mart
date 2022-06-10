import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: {},
};

const orderReducer = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders = action.payload;
    },
  },
  extraReducers: {},
});

export const { addOrder } = orderReducer.actions;
export default orderReducer.reducer;
