import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { postApi } from "../helpers/api";

const initialState = {
  token: "",
  loading: false,
  error: "",
  email: "",
};

export const signinUser = createAsyncThunk("signinuser", async (body) => {
  const result = await postApi("/user/signin", body);
  return result;
});

const authReducer = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [signinUser.pending]: (state, action) => {
      state.loading = true;
    },
    [signinUser.fulfilled]: (state, { payload: { error, token, email } }) => {
      state.loading = false;
      if (error) {
        state.error = error;
      } else {
        state.email = email;
        state.token = token;
        AsyncStorage.setItem("token", token);
        state.error = "";
      }
    },
  },
});

export default authReducer.reducer;
