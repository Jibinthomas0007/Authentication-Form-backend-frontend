import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, registerAPI, getMeAPI } from "./authAPI";

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await loginAPI(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Server error" }
      );
    }
  }
);

// REGISTER
export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const res = await registerAPI(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Server error" }
      );
    }
  }
);

// GET USER
export const getUser = createAsyncThunk("auth/me", async () => {
  const res = await getMeAPI();
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;

        localStorage.setItem("token", action.payload.data.token);
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;

        localStorage.setItem("token", action.payload.data.token);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;