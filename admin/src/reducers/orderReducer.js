import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApi } from "../helpers/api";

const initialState = {
  orders: {},
  loading: false,
  error: "",
};

export const getOrderHistory = createAsyncThunk("getorderhistory", async () => {
  const result = await getApi(`/order`);
  return result;
});

const orderReducer = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: {
    [getOrderHistory.pending]: (state) => {
      state.loading = true;
    },
    [getOrderHistory.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload?.error) {
        state.error = payload?.error;
      } else {
        state.orders = [...payload];
        state.error = "";
      }
    },
  },
});

export default orderReducer.reducer;
