import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, registerAPI, getMeAPI } from "./authAPI";

// 🔥 Get auth from localStorage
const storedAuth = JSON.parse(localStorage.getItem("auth"));

/* =========================
   ASYNC THUNKS
========================= */

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

/* =========================
   SLICE
========================= */

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedAuth?.user || null,
    token: storedAuth?.token || null,
    loading: false,
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;

      // 🔥 remove full auth object
      localStorage.removeItem("auth");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        const user = action.payload.data.user;
        const token = action.payload.data.token;

        state.user = user;
        state.token = token;

        // 🔥 store combined object
        localStorage.setItem(
          "auth",
          JSON.stringify({ user, token })
        );
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        const user = action.payload.data.user;
        const token = action.payload.data.token;

        state.user = user;
        state.token = token;

        localStorage.setItem(
          "auth",
          JSON.stringify({ user, token })
        );
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;