import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addProduct: (state, { payload }) => {
      state.products.push({
        ...payload,
        quantity: 1,
      });
    },
    increment: (state, { payload }) => {
      const product = state.products.find((p) => p.id === payload);
      if (product) {
        product.quantity += 1;
      }
    },
    decrement: (state, { payload }) => {
      const product = state.products.find((p) => p.id === payload);
      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
        }
      }
    },
    removeProduct: (state, { payload }) => {
      state.products = state.products.filter((p) => p.id !== payload);
    },
    clearOrder: (state) => {
      state.products = [];
    },
  },
});

export const { increment, decrement, addProduct, removeProduct, clearOrder } =
  orderSlice.actions;

export default orderSlice.reducer;
