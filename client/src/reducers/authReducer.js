import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { postApi } from "../helpers/api";

const initialState = {
  token: "",
  loading: false,
  error: "",
  email: "",
  userId: "",
  mobile: "",
};

export const signupUser = createAsyncThunk("signupuser", async (body) => {
  const result = await postApi("/user/signup", body);
  return result;
});

export const signinUser = createAsyncThunk("signinuser", async (body) => {
  const result = await postApi("/user/signin", body);
  return result;
});

const authReducer = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [signupUser.pending]: (state, action) => {
      state.loading = true;
    },
    [signupUser.fulfilled]: (state, { payload: { error, message } }) => {
      state.loading = false;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [signinUser.pending]: (state, action) => {
      state.loading = true;
    },
    [signinUser.fulfilled]: (
      state,
      { payload: { error, token, email, userId, mobile } }
    ) => {
      state.loading = false;
      if (error) {
        state.error = error;
      } else {
        state.email = email;
        state.token = token;
        state.userId = userId;
        state.mobile = mobile;
        AsyncStorage.setItem("token", token);
        AsyncStorage.setItem("userId", userId);
        state.error = "";
      }
    },
  },
});

export default authReducer.reducer;
