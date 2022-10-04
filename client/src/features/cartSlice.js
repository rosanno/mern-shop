import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
    },
    setQuantity: (state, action) => {
      state.items.product[action.payload.foundIndex].quantity =
        action.payload.quantity;
      state.items.product[action.payload.foundIndex].total =
        action.payload.total;
    },
    removeItems: (state, action) => {
      const foundIndex = state.items.product.findIndex(
        (item) => item.productId._id === action.payload
      );

      if (foundIndex !== -1) {
        state.items.product.splice(foundIndex, 1);
      }
    },
  },
});

export const { setCart, setQuantity, removeItems } = cartSlice.actions;

export default cartSlice.reducer;
