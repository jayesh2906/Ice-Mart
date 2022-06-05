import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { getApi, postApi, putApi, deleteApi } from "../helpers/api";

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

export const addProduct = createAsyncThunk("addproduct", async (body) => {
  const result = await postApi("/product", body);
  return result;
});

export const updateProduct = createAsyncThunk("updateproduct", async (body) => {
  const result = await putApi(`/product/${body.id}`, body);
  return result;
});

export const deleteProduct = createAsyncThunk("deleteproduct", async (id) => {
  const result = await deleteApi(`/product/${id}`);
  return result;
});

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
    [addProduct.pending]: (state) => {
      state.loading = true;
    },
    [addProduct.fulfilled]: (state, { payload: { error } }) => {
      state.loading = false;
      if (error) {
        state.error = error;
      } else {
        state.error = "";
      }
    },
    [updateProduct.pending]: (state) => {
      state.loading = true;
    },
    [updateProduct.fulfilled]: (state, { payload: { error } }) => {
      state.loading = false;
      if (error) {
        state.error = error;
      } else {
        state.error = "";
      }
    },
    [deleteProduct.pending]: (state) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled]: (state, { payload: { error } }) => {
      state.loading = false;
      if (error) {
        state.error = error;
      } else {
        state.error = "";
      }
    },
  },
});

export const { sortProducts } = productReducer.actions;
export default productReducer.reducer;
