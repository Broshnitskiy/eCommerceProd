"use client";

import {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetProductByCategoryQuery,
} from "@/redux/product/productSlice";

import { useGetAllCategoriesQuery } from "@/redux/categories/categoriesSlice";

export default function Home() {
  const {
    data: allCategoriesData,
    error: allCategoriesError,
    isLoading: allCategoriesLoading,
  } = useGetAllCategoriesQuery();

  const {
    data: allProductsData,
    error: allProductsError,
    isLoading: allProductsLoading,
  } = useGetAllProductsQuery();

  // const {
  //   data: productByIdData,
  //   error: productByIdError,
  //   isLoading: productByIdLoading,
  // } = useGetProductByIdQuery("1");

  // const {
  //   data: productByCategoryData,
  //   error: productByCategoryError,
  //   isLoading: productByCategoryLoading,
  // } = useGetProductByCategoryQuery("");

  console.log(allProductsData);
  console.log(allCategoriesData);

  const renderProducts = productByCategoryData
    ? productByCategoryData
    : allProductsData;

  const filteredRenderData = renderProducts.filter((product) =>
    product.title.includes("Product")
  );

  return <main>Main</main>;
}
