import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./order/orderSlice";
import { productApi } from "./product/productSlice";
import { categoriesApi } from "./categories/categoriesSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    order: orderReducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      categoriesApi.middleware
    ),
});

setupListeners(store.dispatch);
