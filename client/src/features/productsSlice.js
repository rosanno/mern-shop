import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    requestPending: (state) => {
      state.isLoading = true;
    },
    requestSuccess: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    requestRejected: (state) => {
      state.isLoading = false;
    },
  },
});

export const { requestPending, requestSuccess, requestRejected } =
  productsSlice.actions;

export default productsSlice.reducer;
