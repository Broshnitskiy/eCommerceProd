import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com/products",
  }),
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => `/categories`,
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoriesApi;
