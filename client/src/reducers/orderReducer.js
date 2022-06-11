import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postApi } from "../helpers/api";

const initialState = {
  orders: {},
  loading: false,
  error: "",
};

export const placeOrder = createAsyncThunk("placeorder", async (body) => {
  const result = await postApi("/order", body);
  return result;
});

const orderReducer = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders = action.payload;
    },
  },
  extraReducers: {
    [placeOrder.pending]: (state) => {
      state.loading = true;
    },
    [placeOrder.fulfilled]: (state, { payload: { error } }) => {
      state.loading = false;
      if (error) {
        state.error = error;
      } else {
        state.error = "";
      }
    },
  },
});

export const { addOrder } = orderReducer.actions;
export default orderReducer.reducer;
