import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { getApi } from "../helpers/api";

const initialState = {
  products: [],
  loading: false,
  error: "",
};

export const fetchProducts = createAsyncThunk("fetchproducts", async () => {
  const result = await getApi("/product");
  return result;
});

export const searchProducts = createAsyncThunk(
  "searchproducts",
  async (search) => {
    const result = await getApi(`/product/${search}`);
    return result;
  }
);

export const filterProducts = createAsyncThunk(
  "filterproducts",
  async (category) => {
    const result = await getApi(`/product/filter/${category}`);
    return result;
  }
);

const productReducer = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    sortProducts: (state, action) => {
      const { payload } = action;
      if (payload.order === "desc") {
        const { products } = current(state);
        const { key } = payload;
        state.products = products.slice().sort((a, b) => {
          return b[key] - a[key];
        });
      } else {
        const { products } = current(state);
        const { key } = payload;
        state.products = products.slice().sort((a, b) => {
          return a[key] - b[key];
        });
      }
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.loading = true;
    },
    [fetchProducts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload?.error) {
        state.error = payload?.error;
      } else {
        state.products = [...payload];
        state.error = "";
      }
    },
    [searchProducts.pending]: (state) => {
      state.loading = true;
    },
    [searchProducts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload?.error) {
        state.error = payload?.error;
      } else {
        state.products = [...payload];
        state.error = "";
      }
    },
    [filterProducts.pending]: (state) => {
      state.loading = true;
    },
    [filterProducts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload?.error) {
        state.error = payload?.error;
      } else {
        state.products = [...payload];
        state.error = "";
      }
    },
  },
});

export const { sortProducts } = productReducer.actions;
export default productReducer.reducer;
