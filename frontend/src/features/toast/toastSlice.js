import { createSlice } from "@reduxjs/toolkit";

let id = 0;

const toastSlice = createSlice({
  name: "toast",
  initialState: [],
  reducers: {
    addToast: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (toast) => ({
        payload: {
          id: id++,
          type: toast.type || "info",
          message: toast.message,
        },
      }),
    },
    removeToast: (state, action) => {
      return state.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;