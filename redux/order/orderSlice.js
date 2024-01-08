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
      const product = state.products.find((p) => p.id === payload.id);
      if (product) {
        product.quantity += 1;
      }
    },
    decrement: (state, { payload }) => {
      const product = state.products.find((p) => p.id === payload.id);
      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
        }
      }
    },
    incrementByAmount: (state, { payload }) => {
      const product = state.products.find((p) => p.id === payload.id);
      if (product) {
        product.quantity += payload.amount;
      }
    },
  },
});

export const { increment, decrement, incrementByAmount, addProduct } =
  orderSlice.actions;

export default orderSlice.reducer;
